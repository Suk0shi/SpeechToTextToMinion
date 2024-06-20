"use client";

import { useState } from 'react'

function Translator() {
    const [text, setText] = useState<string>();
    const [output, setOutput] = useState<string>();
  
    function handleOnRecord() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.onresult = async function(event) {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            const response = await fetch(`https://api.funtranslations.com/translate/minion.json?text=${transcript}`
            ).then(r => r.json());
            console.log(response)
            setOutput(response.contents.translated);
        }
        
        recognition.start();
    }

    return (
      <>
        <button onClick={ handleOnRecord }>
            Record
        </button>
        <p>Input: {text}</p>
        <p>Output: {output}</p>
      </>
    )
  }
  
  export default Translator