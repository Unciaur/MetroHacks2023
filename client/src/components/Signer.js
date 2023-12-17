
import { useState, useEffect } from "react";


var alphabet = "abcdefghijklmnopqrstuvwxyz";
var letter_images = {}
var number_images = [];


for(var i = 0; i < 27; i++){
    letter_images[alphabet[i]]=`https://api.letssign.xyz/static/asl/${alphabet[i]}`
}

for(var i=1;i<=10; i++){
    number_images.push(`https://api.letssign.xyz/static/asl/${i}`)
}


function start_signing(chars, setCurrentImage, setCurrentText, setSigner, setSignStyle){
    console.log("LOOP STARTED")
    var queue = []
    var textQueue = []
    console.log(queue)
    for (var i = 0; i < chars.length; i++){
        for(var j = 0; j < chars[i].length; j++){
            var current = chars[i][j]
            textQueue.push(current)

            if(alphabet.includes(current)){
                queue.push(letter_images[chars[i][j]])
            }else{
                current = parseInt(current)
                console.log(current)
                queue.push(number_images[current-1])
            }
        }
    }
    function changeImage(){
        if(queue.length > 0){
            setSignStyle("");
            var i = queue.shift()
            if (i == queue[0]){
                setSignStyle("duplicate")
            }
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

    return <div className='signer'>
        <img src={currentImage} alt="" className={signStyle}/>
        <div className='signer-info'>
        <div className="spelling">Spelling: "{sentence}"</div>
        <div className="letter">{currentText}</div>
        </div>
    </div>

}