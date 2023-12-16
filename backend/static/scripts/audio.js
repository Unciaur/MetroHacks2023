
var socket = io.connect("http://127.0.0.1:5000");
const audioCtx = new AudioContext();
var recording=false;
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
    recording = !recording;
    var mic = document.getElementById('microphone');
    var btn = mic.firstChild;
    if (recording) {
        mediaRecorder.stop();
    } else {
        mediaRecorder = new MediaRecorder(stream);
        let chunks = [];
        mediaRecorder.start();
    }
    console.log("recoridng:"+recording)
}

mediaRecorder.ondataavailable = e=>{
    socket.emit('audio', e.data)
}

socket.on('audio', data=>{
    console.log(data);
})