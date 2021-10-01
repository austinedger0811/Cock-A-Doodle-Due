from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.firestore import SERVER_TIMESTAMP

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
    assignment = request.json
    assignment_id = assignments.document().id
    assignment['timestamp'] = SERVER_TIMESTAMP
    assignment['id'] = assignment_id
    assignments.document(assignment_id).set(assignment)
    return get_assignments_list()


@app.route('/api/v1/update-assignment-progress/<id>', methods=['PUT'])
def update_assignment(id):
    pass


@app.route('/api/v1/delete-assignment/<id>', methods=['DELETE'])
def delete_assignment(id):
    assignments.document(id).delete()
    return get_assignments_list()


def get_assignments_list():
    # TODO: add order_by() to assignments to order them properly
    return jsonify([doc.to_dict() for doc in assignments.stream()])
