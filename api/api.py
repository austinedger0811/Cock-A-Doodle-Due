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

    assignment.update({
        u'progress': progress,
        u'time_completed': time_completed,
        u'time_remaining': time_remaining,
        u'complete': complete,
    })

    return get_assignments_list()


@app.route('/api/v1/delete-assignment/<id>', methods=['DELETE'])
def delete_assignment(id):
    assignments.document(id).delete()
    return get_assignments_list()


def get_assignments_list():
    return jsonify([doc.to_dict() for doc in assignments.order_by(u'date').stream()])


def create_assignment(assignment):
    assignment_id = assignments.document().id
    assignment['id'] = assignment_id
    assignment['timestamp'] = datetime.now().isoformat()
    assignment['complete'] = False
    assignment['progress'] = 0
    assignment['time_completed'] = 0
    assignment['time_remaining'] = assignment['estimate']
    assignments.document(assignment_id).set(assignment)
