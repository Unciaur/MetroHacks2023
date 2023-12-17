import { useState, useRef } from 'react';

export default function Mic() {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream, {mimeType:'audio/webm'});
        mediaRecorder.current.ondataavailable = e => {
          if (e.data.size > 0) {
            recordedChunks.current.push(e.data);
          }
        };
        mediaRecorder.current.start();
      });
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'audio/webm' });
      console.log(blob)
      recordedChunks.current = [];
    //   // Send blob to backend
    //   const formData = new FormData();
    //   formData.append('audio', blob);
    const reader= new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function(){
        var base64data = reader.result;
        console.log(base64data)
        // Send base64data to backend
      var res = fetch('https://api.letssign.xyz/interpret', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({audio:base64data}),
      })
      .then(response => {
        console.log(response)
        return response
      })
    };}
  };

  const toggleRecording = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
    setRecording(!recording);
  };

  return (
    <div>
      <button onClick={toggleRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}