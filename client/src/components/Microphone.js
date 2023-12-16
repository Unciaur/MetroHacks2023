
import React, { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";


export default function Microphone(){
    const [recording, setRecording] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(()=>{
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        navigator.mediaDevices.getUserMedia({audio: true}).then(stream=>{
            const newMediaRecorder = new MediaRecorder(stream);
            newMediaRecorder.ondataavailable = e => {
                console.log(e.data)
                if (e.data.size > 0){
                    newSocket.emit('audio', e.data);
                }
            }
        })

        return ()=> newSocket.close()
    }, []);

    var toggleRecording = () => {
        setRecording(!recording);
        if (socket){
            socket.emit('recording')
        }    
    }

    return <div id="microphone">
        <button onClick={toggleRecording}>
            {recording ? 'Recording' : 'Not Recording'}
        </button>
    </div>
}
