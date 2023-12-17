
import { useState, useEffect } from "react";


var alphabet = "abcdefghijklmnopqrstuvwxyz";
var images = {}



for(var i = 0; i < 27; i++){
    images[alphabet[i]]=`https://api.letssign.xyz/static/asl/${alphabet[i]}`
}


function start_signing(chars, setCurrentImage, setCurrentText, setSigner, setSignStyle){
    console.log("LOOP STARTED")
    var queue = []
    var textQueue = []
    console.log(queue)
    for (var i = 0; i < chars.length; i++){
        for(var j = 0; j < chars[i].length; j++){
            textQueue.push(chars[i][j])
            queue.push(images[chars[i][j]])
        }
    }
    function changeImage(){
        if(queue.length > 0){
            setSignStyle("");
            var i = queue.shift()
            if (i == queue[0]){
                //then its a duplicate
                setSignStyle("duplicate")
            }
            console.log(i)
            setCurrentImage(i)
            setCurrentText(textQueue.shift())
            setTimeout(changeImage, 1000)
        } else {
            setSigner(null)
        }
    }
    changeImage()
}


export default function Signer(props){
    const [currentImage, setCurrentImage] = useState(null);
    const [currentText, setCurrentText] = useState("");
    const [signStyle, setSignStyle] = useState("");
    var sentence = props.data.sentence
    var words = props.data.words 
    var chars = props.data.chars
    // console.log(chars)
    useEffect(() => {
        start_signing(chars, setCurrentImage, setCurrentText, props.setSigner, setSignStyle)
    }, [chars])

    return <div>
        Spelling {sentence}
        {currentText}
        <img src={currentImage} alt="" className={signStyle}/>
    </div>

}