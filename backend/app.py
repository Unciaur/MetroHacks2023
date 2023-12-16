from Speech import STT
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "metrohackshdsjafhsdjkfhsdjkfhs"
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/interpreter")
def interpreter():
    return render_template("interpreter.html")

@socketio.on('audio')
def handle_audio(audio):
    return "HELLO"


if __name__ == "__main__":

    socketio.run(app, debug=True, host="127.0.0.1", port=5000)
