from Speech import STT
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "metrohackshdsjafhsdjkfhsdjkfhs"
socketio = SocketIO(app)

@socketio.on('audio')
def handle_audio(audio):
    print(audio)
    return "HELLO"

if __name__ == "__main__":
    socketio.run(app, debug=True, host="127.0.0.1", port=5000)
