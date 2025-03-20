import { useState } from "react";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";

const Mic = ({ setSearchquery }) =>
{
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [isListening, setIsListening] = useState(true)

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    setRecognitionInstance(recognition);
    

    recognition.lang = "en-US";
    recognition.onstart = () =>
    {
      console.log("Voice recognition started...");
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcribed text:", transcript);
      setSearchquery(transcript); // Update the search query state with the voice input
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
      setIsListening(false)
    };

    recognition.start();
  };

  const stopVoiceRecognition = () =>
  { 
    if (recognitionInstance) { 
      recognitionInstance.stop();
      console.log("Voice recognition manually stopped.")
      setIsListening(false)
    }
  }
  const handleVoiceRecognition = () => {
    if(isListening)
    { 
      stopVoiceRecognition();
    }else{
      startVoiceRecognition();
    }
  }

  return (
    <>
    <button className="btn" onClick={handleVoiceRecognition()}>
      
    </button>
    </>
  );
};

export default Mic;
