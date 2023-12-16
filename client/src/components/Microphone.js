
import React from "react";
import { useState } from "react";

export default function Microphone(){
    var [recording, setRecording] = useState(false);
    var toggleRecording = () => {
        setRecording(!recording);
        
    }
    return <div id="microphone">
        <button onClick={toggleRecording}>
            {recording ? 'Recording' : 'Not Recording'}
        </button>
    </div>
}
