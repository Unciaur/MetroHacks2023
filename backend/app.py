from Speech import STT
from flask import Flask, render_template, request, jsonify, make_response, Response
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import speech_recognition as sr

app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = "metrohackshdsjafhsdjkfhsdjkfhs"
# socketio = SocketIO(app)

# @socketio.on('audio')
# def handle_audio(audio):
#     return jsonify({"message": "Hello World"})

@app.route("/")
def index():
    return jsonify({"message": "Hello World"})

@app.route("/interpret", methods=['POST', 'GET'])
def interpret():
    if request.method=="POST":
        aud= request.form["audio"]
        print(aud)
        recognizer = sr.Recognizer()
        with sr.AudioFile(request.form["audio"]) as source:
            audio = recognizer.listen(source)
            text = recognizer.recognize_google(audio)
        return jsonify({"message": "Hello World"})
    else:
        return jsonify({"message": "What's up lil bro"})

if __name__ == "__main__":
    socketio.run(app, debug=True, host="127.0.0.1", port=5000)
