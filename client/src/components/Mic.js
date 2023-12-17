import { useState, useRef } from 'react';
import Signer from './Signer';

import TextInterpreter from './TextInterpreter';

export default function Mic() {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
    const [signer, setSigner] = useState(null);
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
    const formData = new FormData();
    const reader= new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function(){
        var base64data = reader.result;
        console.log(base64data)
        formData.append('audio', base64data);
        // Send base64data to backend
      var res = fetch('https://api.letssign.xyz/interpret', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setSigner(<Signer data={data} setSigner={setSigner}/>)
      })
    };}
  };

  const toggleRecording = () => {
    if (!recording) {
      startRecording();
      if(signer != null){
        setSigner(null)
      }
    } else {
        setTimeout(stopRecording, 500)
    }
    setRecording(!recording);
  };

  return (
    <div id="microphone">
        {signer}
        
        <div className="button-container">
        <TextInterpreter setSigner={setSigner}></TextInterpreter>
      <button onClick={toggleRecording}>
        🎙️ {recording ? 'Stop Recording' : 'Start Recording'} 🎤
      </button>
        </div>
    </div>
  );
}