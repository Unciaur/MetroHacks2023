import {Microphone} from 'microphone-js'
import {useState} from 'react';

export default function Mic(){
    const mic = Microphone();
    const [recording, setRecording] = useState(false);
    const toggleRecording = () => {
        if (!recording){
            mic.start();
        } else {
            mic.stop();
            const blob = mic.getBlob();
            console.log(blob)
            mic.download();
        }
        setRecording(!recording);
    }

    return <div>
            <button onClick={toggleRecording}>
                {mic.recording ? 'Recording' : 'Not Recording'}
            </button>
    </div>
    
}