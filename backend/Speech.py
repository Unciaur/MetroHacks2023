import speech_recognition as sr
import asyncio

class STT:
    def __init__(self):
        self.r = sr.Recognizer()
        self.mic = sr.Microphone()

    def listen(self):
        with self.mic as source:
            self.r.adjust_for_ambient_noise(source)
            audio = self.r.listen(source)
            try:
                text = self.r.recognize_google(audio)
                return text
            except:
                return "Error"
                

