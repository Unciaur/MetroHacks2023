import speech_recognition as sr
import asyncio
import base64, io, json, os
import secrets
import speech_recognition as sr
from pydub import AudioSegment

from pydub import AudioSegment

class STT:
    def __init__(self):
        self.r = sr.Recognizer()

    def regcognize_b64(self, b64data):
        data = b64data.split(",")[1]
        data = base64.b64decode(data)

        audio = AudioSegment.from_file(io.BytesIO(data), format="webm")
        audio.export("out.wav", format="wav")

        r=sr.Recognizer()
        with sr.AudioFile("out.wav") as source:
            audio = r.record(source)
        text = str(r.recognize_google(audio))
        words = [word for word in text.split(" ") if word != ""]

        output = {
            "words":words,
            "chars": [[char for char in word] for word in words],
            "sentence": text
        }
        return output