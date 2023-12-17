import Signer from "./Signer";
import { useState } from "react";


function text_parse(text){
    var out = {}
    var words = text.split(" ")
    out.chars = []
    words.forEach(element => {
        out.chars.push(element.split(""))
    });
    out.words = words
    out.sentence = text
    return out
}

console.log(text_parse("hello world"))

export default function TextInterpreter(props){
    const [text, setText] = useState("");
    const setSigner = props.setSigner
    
    const handleClick = () => {
        setSigner(<Signer data={text_parse(text)} setSigner={setSigner}/>)
    }

    return <div id="text-interpreter">
        <div id="text-input">
            <input onChange={(e)=>{setText(e.target.value)}} placeholder="Enter text here"></input>
            <button onClick={handleClick}>Translate</button>
        </div>
        </div>
}