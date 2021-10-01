from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.firestore import SERVER_TIMESTAMP
import time

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

assignments = db.collection('assignments')


@app.route('/')
def hello_world():
    return jsonify([doc.to_dict() for doc in assignments.stream()])


@app.route('/api/v1/time')
def get_current_time():
    return {'time': time.time()}
