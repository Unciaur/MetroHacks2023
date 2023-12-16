from Speech import STT



if __name__ == "__main__":

    stt = STT()
    while True:
        print(stt.listen())