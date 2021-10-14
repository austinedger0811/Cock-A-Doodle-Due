from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
assignments = db.collection(u'assignments')
reminders = db.collection(u'reminders')


@app.route('/api/v1/assignments', methods=['GET'])
def get_assignments():
    return get_assignments_list()


@app.route('/api/v1/reminders', methods=['GET'])
def get_reminders():
    return get_reminders_list()


@app.route('/api/v1/assignment/<id>', methods=['GET'])
def get_assignment(id):
    return jsonify(assignments.document(id).get().to_dict())


@app.route('/api/v1/add-assignment', methods=['POST'])
def add_assignmnet():
    create_assignment(request.json)
    return get_assignments_list()


@app.route('/api/v1/add-reminder', methods=['POST'])
def add_reminder():
    create_reminder(request.json)
    return get_reminders_list()


@app.route('/api/v1/update-assignment/<id>', methods=['PUT'])
def update_assignment(id):

    assignment = assignments.document(id)
    assignment_dict = assignment.get().to_dict()

    estimate = assignment_dict['estimate']
    progress = request.json['progress']
    print(progress)
    time_completed = round((estimate * (progress / 100)), 1)
    time_remaining = round((estimate - time_completed), 1)
    complete = True if progress == 100 else False
    data = assignment_dict['data']
    due_date = datetime.fromisoformat(assignment_dict['timestamp'])
    current_date = datetime.now()
    days_object = current_date - due_date
    days = round(days_object.total_seconds() / 86400, 2)
    data.append({'days': days, 'progress': progress})
    assignment.update({
        u'progress': progress,
        u'time_completed': time_completed,
        u'time_remaining': time_remaining,
        u'complete': complete,
        u'data': data
    })

    return get_assignments_list()


@app.route('/api/v1/delete-assignment/<id>', methods=['DELETE'])
def delete_assignment(id):
    assignments.document(id).delete()
    return get_assignments_list()


@app.route('/api/v1/delete-assignments', methods=['DELETE'])
def delete_assignments():
    pass


@app.route('/api/v1/delete-reminder/<id>', methods=['DELETE'])
def delete_reminder(id):
    reminders.document(id).delete()
    return get_reminders_list()


def create_assignment(assignment):
    now = datetime.now()
    total_days = (datetime.fromisoformat(assignment['date'][0:-1]) - now).days
    assignment_id = assignments.document().id
    assignment['id'] = assignment_id
    assignment['timestamp'] = now.isoformat()
    assignment['complete'] = False
    assignment['progress'] = 0
    assignment['time_completed'] = 0
    assignment['time_remaining'] = assignment['estimate']
    assignment['total_days'] = total_days
    assignment['data'] = [{'days': 0, 'progress': 0}]
    assignments.document(assignment_id).set(assignment)


def create_reminder(reminder):
    reminder_id = reminders.document().id
    reminder['id'] = reminder_id
    reminder['timestamp'] = datetime.now().isoformat()
    reminders.document(reminder_id).set(reminder)


def get_assignments_list():
    return jsonify([doc.to_dict() for doc in assignments.order_by(u'date').stream()])


def get_reminders_list():
    return jsonify([doc.to_dict() for doc in reminders.order_by(u'timestamp').stream()])
