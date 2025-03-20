import React, { useState, useEffect } from 'react';
import './Searchbar.css';
import { FaSearch } from 'react-icons/fa';
import Searchlist from './Searchlist';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2'

const Searchbar = () => {
  const [Searchquery, setSearchquery] = useState(''); // Search query for manual typing
  const [searchlist, setSearchlist] = useState(false); // Controls the visibility of the search list
  const [isMicActive, setIsMicActive] = useState(false); // Mic state

  const Titlearray = useSelector((s) => s?.videoreducer)?.data
    ?.filter((q) => q?.videotitle.toUpperCase().includes(Searchquery?.toUpperCase()))
    .map((m) => m?.videotitle);

  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const clearSearch = () =>
  { 
    setSearchquery("");
  }

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition API is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log('Voice recognition started...');
      setIsListening(true);
      setIsMicActive(true); // Activate mic mode
      setSearchlist(false); // Disable search list while mic is active
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the spoken text
      console.log('Transcribed text:', transcript);
      setSearchquery(transcript); // Directly update the search bar text
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended.');
      setIsListening(false);
    };

    recognition.start();
    setRecognitionInstance(recognition);
  };

  const stopVoiceRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      console.log('Voice recognition manually stopped.');
      setIsListening(false);
      setIsMicActive(false); // Deactivate mic mode
    }
  };

  const handleVoiceRecognition = () => {
    if (isListening) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };

  useEffect(() => {
    // Cleanup when the component unmounts
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [recognitionInstance]);

  return (
    <>
      <div className="SearchBar_Container">
        <div className="SearchBar_Container2">
          <div className="search_div">
            <input
              type="text"
              className="iBox_SearchBar"
              placeholder="Search"
              onChange={(e) => {
                if (!isMicActive) { // Allow manual typing only when mic is inactive
                  setSearchquery(e.target.value);
                  setSearchlist(true); // Enable search suggestions
                }
              }}
              value={Searchquery} // Controlled by Searchquery state
              readOnly={isMicActive} // Disable manual input when mic is active
              onClick={() => {
                if (!isMicActive) setSearchlist(true); // Open search list only if mic is inactive
              }}
            />
            <div className="searchClear">
              <HiXMark onClick={clearSearch} title='Clear Search'/>
            </div>
            <Link to={`/search/${Searchquery}`}>
              <FaSearch 
                className="searchIcon_SearchBar"
                onClick={() => setSearchlist(false)}
              />
            </Link>
            <div
              className="Mic_SearchBar"
              title="Search with your voice"
              onClick={handleVoiceRecognition}
            >
              {isListening ? <BsMicMuteFill /> : <BsMicFill size={22} color='whitesmoke'/>}
            </div>
            {/* Show Searchlist only if mic is inactive and searchquery is set */}
            {Searchquery && searchlist && !isMicActive && (
              <Searchlist setsearchquery={setSearchquery} Titlearray={Titlearray} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
