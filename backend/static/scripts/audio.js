


const audioCtx = new AudioContext();

if (navigator.mediaDevices){
    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        const mic = audioCtx.createMediaStreamSource(stream);
        console.log(mic);
    }).catch(err => {
        console.log(err);
    });
}


function record(){
    const mediaRecorder = new MediaRecorder(stream);
    let chunks=[];
    mediaRecorder.start();
}