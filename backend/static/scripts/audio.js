
var socket = io.connect("http://127.0.0.1:5000");
const audioCtx = new AudioContext();
var recording;
var mediaRecorder;
var stream;

if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((str) => {
        stream = str;
        const mic = audioCtx.createMediaStreamSource(stream);
        console.log(mic);
    }).catch(err => {
        console.log(err);
    });
}


function toggleRecord() {
    var mic = document.getElementById('microphone');
    var state = mic.getAttribute('data-state')
    var btn = mic.firstChild;
    console.log(state)
    if (recording) {
        mediaRecorder.stop();
    } else {
        mediaRecorder = new MediaRecorder(stream);
        let chunks = [];
        mediaRecorder.ondataavailable = e=>{
            socket.emit('audio', e.data)
        }
        mediaRecorder.start();
    }
    console.log("recoridng:"+recording)
    recording = !recording;
}

socket.on('audio', data=>{
    console.log(data);
})