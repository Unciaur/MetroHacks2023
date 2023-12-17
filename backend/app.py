from Speech import STT
from flask import Flask, render_template, request, jsonify, make_response, Response
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import speech_recognition as sr
import base64, io, json


app = Flask(__name__)
CORS(app, resources={r"/interpret": {"origins": "*"}})
app.config["SECRET_KEY"] = "metrohackshdsjafhsdjkfhsdjkfhs"
# socketio = SocketIO(app)

# @socketio.on('audio')
# def handle_audio(audio):
#     return jsonify({"message": "Hello World"})

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

@app.route("/")
def index():
    return jsonify({"message": "Hello World"})

@app.route("/interpret", methods=["POST", "OPTIONS"])
def interpret():
    if request.method=="OPTIONS":
        return _build_cors_preflight_response()
    elif request.method=="POST":
        base64_data = request.form["audio"]
        stt = STT()
        text = stt.regcognize_b64(base64_data)
        return jsonify({"message": text})

if __name__ == "__main__":
    socketio.run(app, debug=True, host="127.0.0.1", port=5000)
