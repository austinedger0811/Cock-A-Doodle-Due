from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.firestore import SERVER_TIMESTAMP
from datetime import datetime

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
assignments = db.collection(u'assignments')


@app.route('/api/v1/assignments', methods=['GET'])
def get_assignments():
    return get_assignments_list()


@app.route('/api/v1/assignment/<id>', methods=['GET'])
def get_assignment(id):
    return jsonify(assignments.document(id).get().to_dict())


@app.route('/api/v1/add-assignment', methods=['POST'])
def add_assignmnets():
    create_assignment(request.json)
    return get_assignments_list()


@app.route('/api/v1/update-assignment/<id>', methods=['PUT'])
def update_assignment(id):
    assignment = assignments.document(id)
    assignment_dict = assignment.get().to_dict()
    estimate = assignment_dict['estimate']
    progress = request.json['progress']
    time_completed = round((estimate * (progress / 100)), 1)
    time_remaining = round((estimate - time_completed), 1)
    complete = True if progress == 100 else False
    priority = calculate_piority(
        progress, assignment_dict['timestamp'], assignment_dict['date'])
    assignment.update({
        u'progress': progress,
        u'time_completed': time_completed,
        u'time_remaining': time_remaining,
        u'complete': complete,
        u'priority': priority
    })
    return get_assignments_list()


@app.route('/api/v1/delete-assignment/<id>', methods=['DELETE'])
def delete_assignment(id):
    assignments.document(id).delete()
    return get_assignments_list()


def get_assignments_list():
    # TODO: add order_by() to assignments to order them properly
    return jsonify([doc.to_dict() for doc in assignments.stream()])


def create_assignment(assignment):
    assignment_id = assignments.document().id
    assignment['id'] = assignment_id
    assignment['timestamp'] = datetime.now().isoformat()
    assignment['complete'] = False
    assignment['progress'] = 0
    assignment['time_completed'] = 0
    assignment['time_remaining'] = assignment['estimate']
    assignment['priority'] = calculate_piority(
        0, assignment['timestamp'], assignment['date'])
    assignments.document(assignment_id).set(assignment)


'''
Calculates if the user is behind on their assignment.
'''


def calculate_piority(actual_progress, start_date_str, end_date_str):

    current_date = datetime.now()
    start_date = datetime.fromisoformat(start_date_str)
    due_date = datetime.fromisoformat(end_date_str[0:23])

    total_seconds = (due_date - start_date).total_seconds()
    total_hours = divmod(total_seconds, 3600)[0]

    passed_seconds = (current_date - start_date).total_seconds()
    passed_hours = divmod(passed_seconds, 3600)[0]

    expected_progress = (passed_hours / total_hours) * 100

    return actual_progress - expected_progress
