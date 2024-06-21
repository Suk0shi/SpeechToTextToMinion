"use client";

import { useState, useRef } from 'react'

function Translator() {
    const recognitionRef = useRef<SpeechRecognition>();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [text, setText] = useState<string>();
    const [output, setOutput] = useState<string>();
    const [translation, setTranslation] = useState<string>('minion');
  
    function handleOnRecord() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        
        recognitionRef.current.onstart = function() {
            setIsActive(true)
        }

        recognitionRef.current.onend = function() {
            setIsActive(false)
        }

        recognitionRef.current.onresult = async function(event) {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            const response = await fetch(`https://api.funtranslations.com/translate/${translation}.json?text=${transcript}`
            ).then(r => r.json());
            console.log(response)
            setOutput(response.contents.translated);
        }
        
        recognitionRef.current.start();
    }

    return (
      <div className='translator'>
        <h1>SPEECH TO TEXT <br></br>TRANSLATOR</h1>
        <div></div>
        <div className='characterPortrait'>
            <img className='portraitImg' src={`/src/assets/${translation}.png`} alt={`Image representing ${translation} language`} />
            <select className='dropdown' name="Translations" id="translations" defaultValue={"minion"} onChange={(e)=> setTranslation(e.target.value)}>
                <option value="groot">Groot</option>
                <option value="minion">Minion</option>
                <option value="morse">Morse Code</option>
                <option value="yoda">Yoda</option>
            </select>
        </div>
        <div className='buttonContainer'>
            <button className='recordButton' onClick={ handleOnRecord }>
                <img className='recordingDevice' src="/src/assets/recordingDevice.jpg" alt="Recording Device" />
                { isActive ?  
                <>
                <img className='recordingDisc discSpin' src="/src/assets/recordingDisc.png" alt="Recording Device" />
                <div className='recordingLight'></div>
                <audio autoPlay src="/src/assets/tapePlayerSound.mp3"></audio>
                </>
                :
                <>
                <img className='recordingDisc' src="/src/assets/recordingDisc.png" alt="Recording Device" />
                </>
                }
            </button>
        </div>
        <div className='inputBox'>
            <p>Input:</p>
            <p>{text}</p>
        </div>
        <div className='outputBox'>
            <p>Output:</p>
            <p>{output}</p>
        </div>
      </div>
    )
  }
  
  export default Translator