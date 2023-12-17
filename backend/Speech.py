import speech_recognition as sr
import asyncio
import base64, io, json, os
import secrets
import speech_recognition as sr
from pydub import AudioSegment

ffmpeg_path="./tools/ffmpeg"
ffprobe_path="./tools/ffprobe"

AudioSegment.converter=ffmpeg_path
AudioSegment.ffmpeg=ffmpeg_path
AudioSegment.ffprobe=ffprobe_path

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
        text = r.recognize_google(audio)
        print(text)
        return text