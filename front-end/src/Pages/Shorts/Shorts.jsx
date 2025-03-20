import React, { useState, useRef } from "react";
import { FaArrowDown, FaArrowUp, FaTimes, FaHeart, FaThumbsDown, FaShareAlt, FaVolumeUp, FaExpand, FaPlay, FaPause } from "react-icons/fa";
import "./shorts.css";

const Shorts = ({ onClose }) => {
  const [currentShort, setCurrentShort] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const shorts = [
    {
      id: 1,
      title: "Amazing Nature #Shorts",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      creator: "Nature Channel",
    },
    {
      id: 2,
      title: "Crazy Stunts Compilation",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      creator: "Stunt Crew",
    },
    {
      id: 3,
      title: "Funny Animals Compilation",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      creator: "Animal Lovers",
    },
  ];

  const handleScrollUp = () => {
    if (currentShort > 0) setCurrentShort(currentShort - 1);
  };

  const handleScrollDown = () => {
    if (currentShort < shorts.length - 1) setCurrentShort(currentShort + 1);
  };

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  document.title = `Shorts | ${shorts[currentShort].title}`

  return (
    <div className="shorts-page">
      <div className="short-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button className="exit-button" onClick={onClose}>
          <FaTimes />
        </button>

        <video
          ref={videoRef}
          className="short-video"
          src={shorts[currentShort].videoUrl}
          controls={false}
          loop
          autoPlay
        />
        
        <div className={`video-controls ${isHovered ? "show" : ""}`}>
          <button className="control-btn" onClick={togglePlayPause}>
            {videoRef.current && videoRef.current.paused ? <FaPlay/> : <FaPause/>}
          </button>
          <button className="control-btn" onClick={toggleMute}>
            <FaVolumeUp />
          </button>
          <button className="control-btn" onClick={toggleFullscreen}>
            <FaExpand />
          </button>
        </div>

        <div className="short-details">
          <h2 className="short-title">{shorts[currentShort].title}</h2>
          <p className="short-creator">By {shorts[currentShort].creator}</p>
        </div>

        <div className="short-actions">
          <button className="action-btn">
            <FaHeart className="icon" /> <p> Like</p> 
          </button>
          <button className="action-btn">
            <FaThumbsDown className="icon" /><p> Dislike </p>
          </button>
          <button className="action-btn">
            <FaShareAlt className="icon" /><p> Share </p>
          </button>
        </div>
      </div>

      <div className="scroll-buttons">
        <button
          className="scroll-button scroll-up"
          onClick={handleScrollUp}
          disabled={currentShort === 0}
        >
          <FaArrowUp />
        </button>
        <button
          className="scroll-button scroll-down"
          onClick={handleScrollDown}
          disabled={currentShort === shorts.length - 1}
        >
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Shorts;
