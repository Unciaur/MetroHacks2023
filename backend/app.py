from Speech import STT
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/interpreter")
def interpreter():
    return render_template("interpreter.html")


if __name__ == "__main__":

    app.run(debug=True, host="0.0.0.0", port=5000)
