import React, { useEffect, useRef, useState } from "react";
import "./VideoPage.css";
import moment from "moment";
import Likewatchlatersavebtns from "./LikeWatchLaterSaveBtns";
import { useParams, Link, useNavigate } from "react-router-dom";
import Comment from "../../Component/Comment/Comment";
import { viewvideo, addPoints } from "../../action/video";
import { addtohistory } from "../../action/history";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar"
// import ReactPlayer from 'react-player';
import { FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { AiFillBackward, AiFillForward, AiOutlineFullscreen, AiOutlinePause, AiOutlinePlayCircle } from "react-icons/ai";
import { MdPictureInPicture, MdSpeed } from "react-icons/md";
import { RiLoopLeftLine } from "react-icons/ri";
import { addtosubscribe, deletesubscribe } from "../../action/subscribe";

// import GetLocation from 'react-native-get-location'
// import Morevideos from './Morevideos/Morevideos';
const VideoPage = () => {
	const { vid } = useParams();
	const dispatch = useDispatch();
	const vids = useSelector((state) => state.videoreducer);
	const vv = vids?.data?.find((q) => q._id === vid);
	const cv = useSelector((state) => state.subscribereducer) || { data: [] };

	const currentuser = useSelector((state) => state?.currentuserreducer);

	const videoRef = useRef(null);
	const commentsRef = useRef(null);
	const holdTimeoutRef = useRef(null);
	const controlTimeout = useRef(null);
	const intervalRef = useRef(null);
	const leftTapTimeoutRef = useRef(null);
	const rightTapTimeoutRef = useRef(null);
	const middleTapTimeoutRef = useRef(null);

	const [leftTapCount, setLeftTapCount] = useState(0);
	const [rightTapCount, setRightTapCount] = useState(0);
	const [middleTapCount, setMiddleTapCount] = useState(0);
	const [locationAndTemp, setLocationAndTemp] = useState(null);
	const [subscribebtn, setSubscribebtn] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [showControls, setShowControls] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [isPiP, setIsPiP] = useState(false);
	const [playbackSpeed, setPlaybackSpped] = useState(1);
	const [isFull, setIsFull] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [progress, setProgress] = useState(0)
	

	const navigate = useNavigate();

	document.title = `${vv?.videotitle} | ${vv?.uploader}`;
	useEffect(() => {
		if (vv) {
			// console.log("Video Data:", vv);
		} else {
			console.log("No video data found for vid:", vid);
			console.log(vv?.filepath);
		}
	}, [vv]);

	const handleviews = () => {
		dispatch(viewvideo({ id: vid }));
	};  

	const handleTimeUpdate = () =>
	{
		setCurrentTime(videoRef.current.currentTime);

		const video = videoRef.current
		if (video) {
			setProgress((video.currentTime / video.duration) * 100);
		};
	};

	
	const handleLoadedMetadata = () =>
		{
		setDuration(videoRef.current.duration)
	}

	const formatTime = (time) =>
		{
			const minutes = Math.floor(time / 60);
			const seconds = Math.floor(time % 60);
			return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
	};
	
	const handleProgressClick = (e) =>
	{
		const video = videoRef.current;
		const progressBar = e.target;
		const clickX = e.nativeEvent.offsetX;
		const newTime = (clickX / progressBar.clientWidth) * video.duration
		video.currentTime = newTime;
	};

	const handlehistory = () => {
		dispatch(
			addtohistory({
				videoid: vid,
				viewer: currentuser?.result?._id,
			})
		);
	};
	//videoplay/pause
	useEffect(() => {
		const videoElement = videoRef.current;

		if (videoElement && videoElement.readyState >= 3) {
			videoElement.muted = true;
			videoElement
				.play()
				.then(() => {
					setIsPlaying(true);
				})
				.catch((error) => {
					console.error("Error starting video : ", error);
					setIsPlaying(false);
				});
		}
	}, []);

	const togglePlayPause = () => {
		const videoElement = videoRef.current;

		if (!videoElement) {
			console.log("video element is not available.");
			return;
		}

		if (videoElement.paused) {
			videoElement
				.play()
				.then(() => {
					setIsPlaying(true);
				})
				.catch((error) => {
					console.error("error resuming video : ", error);
				});
		} else {
			videoElement.pause();
			setIsPlaying(false);
		}
	};

	const handleClick = () => {
		togglePlayPause();
	};

	useEffect(() => {
		const videoElement = videoRef.current;

		if (!videoElement) return;

		const handleVideoEnd = () => {
			setIsPlaying(false);
			videoElement.currentTime = 0;
		};

		videoElement.addEventListener("ended", handleVideoEnd);

		return () => {
			if (videoElement) {
				videoElement.removeEventListener("ended", handleVideoEnd);
			}
		};
	}, []);

	const toggleMute = () => {
		if (videoRef.current) {
			if (isMuted) {
				videoRef.current.muted = false;
				videoRef.current.volume = volume;
			} else {
				videoRef.current.muted = true;
			}
			setIsMuted(!isMuted);
		}
	};

	const handleVolumeChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		videoRef.current.volume = newVolume;
	};

	const increaseVolume = () => {
		if (videoRef.current.volume < 1) {
			videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
			setVolume(videoRef.current.volume);
		}
	};
	const decreaseVolume = () => {
		if (videoRef.current.volume > 0) {
			videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
			setVolume(videoRef.current.volume);
		}
	};

	const togglePiP = async () => {
		if (document.pictureInPictureElement) {
			// If the video is already in PiP, exit PiP
			document.exitPictureInPicture();
			setIsPiP(false);
		} else {
			try {
				// Otherwise, enter PiP mode
				if (videoRef.current) {
					await videoRef.current.requestPictureInPicture();
					setIsPiP(true);
				}
			} catch (error) {
				console.error("Error entering PiP mode: ", error);
			}
		}
	};

	const toggleLoop = () => {
		const video = document.getElementsByClassName("video_ShowVideo_videoPage")[0]; // Replace with your video element's ID

		video.loop = !video.loop; // Toggle the loop property
	};

	const togglePlaybackSpeed = () => {
		const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]; // Add more speeds if needed
		const video = videoRef.current;

		// Define an array of playback speeds
		const currentSpeedIndex = speeds.indexOf(video.playbackRate); // Get the current speed index

		// Calculate the next speed (loop back to 0 if at the end)
		const nextSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
		video.playbackRate = speeds[nextSpeedIndex];
		setPlaybackSpped(speeds[nextSpeedIndex]);
		// console.log(`Playback speed set to ${video.playbackRate}x`);
	};

	useEffect(() => {
		if (Array.isArray(cv?.data)) {  // Ensure cv.data is an array
			const isSubscribed = cv.data.some(
				(q) => q.channelid === vv?.videochanel && q.viewer === currentuser?.result?._id
			);
			setSubscribebtn(isSubscribed);
		} else {
			setSubscribebtn(false); // Default to false if data is not an array
		}
	}, [cv, vv, currentuser]);
	
	  

	const togglesubscribebtn = () =>
	{
		if (!currentuser) {
			alert("Please login to subscribe to the channel");
			return;
		}
	  
		if (subscribebtn) {
			setSubscribebtn(false);
			dispatch(deletesubscribe({ channelid: vv?.videochanel, viewer: currentuser?.result?._id }));
		} else {
			setSubscribebtn(true);
			dispatch(addtosubscribe({ channelid: vv?.videochanel, viewer: currentuser?.result?._id }));
		}
	};


	const handlePoints = () => {
		dispatch(
			addPoints({
				id: vid,
				Viewer: currentuser?.result?._id,
			})
		);
		// console.log("Points Added");
	};

	useEffect(() => {
		if (currentuser) {
			dispatch(
				addPoints({
					videoid: vid,
					viewer: currentuser?.result?._id,
				})
			);
		}
		dispatch(viewvideo({ id: vid }));

		const videoElement = videoRef.current;
		if (videoElement) {
		  videoElement.addEventListener('ended', handlePoints);
		}

		return () => {
		  if (videoElement) {
		    videoElement.removeEventListener('ended', handlePoints);
		  }
		};
	}, [vid, currentuser, dispatch]);

	const handleDoubleClick = (e) => {
		e.preventDefault();
		const videoElement = videoRef.current;
		if (videoElement) {
			const boundingRect = videoElement.getBoundingClientRect();
			const clickPositionX = e.clientX - boundingRect.left;

			if (clickPositionX > boundingRect.width / 2) {
				videoElement.currentTime += 10;
			} else {
				videoElement.currentTime -= 10;
			}
		}
	};

	const requestFullscreen = (videoElement) => {
		if (videoElement.requestFullscreen) {
			videoElement.requestFullscreen();
			
		} else if (videoElement.mozRequestFullScreen) {
			videoElement.mozRequestFullScreen();
			
		} else if (videoElement.webkitRequestFullscreen) {
			videoElement.webkitRequestFullscreen();
			
		} else if (videoElement.msRequestFullscreen) {
			videoElement.msRequestFullscreen();
			
		}
	};

	const exitFullscreen = () =>
	{
		if (document.exitFullscreen) {
			document.exitFullscreen();
			
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
			
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
			
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
			
		}
	};

	const toggleFullscreen = () => {
		const videoElement = document.getElementsByClassName("video_display_screen_videoPage")[0];
		if (videoElement) {
			if (!document.fullscreenElement) {
				requestFullscreen(videoElement)
				setIsFull(true)
				// console.log("full screen")
			}
			else {
				exitFullscreen()
				setIsFull(false)
				// console.log("normal screen")
			}
		}
	};

	const handleKeyDown = (e) => {
		switch (e.key.toLowerCase()) {
			case "f":
				toggleFullscreen();
				break;
			case " ":
			case "spacebar":
				e.preventDefault();
				togglePlayPause();
				break;
			case "n":
				e.preventDefault();
				PlayNextVideo();
				break;
			case "p":
				e.preventDefault();
				playPrevious();
				break;
			case "arrowup":
				if (e.ctrlKey) {
					increaseVolume();
				}
				break;
			case "arrowdown":
				if (e.ctrlKey) {
					decreaseVolume();
				}
				break;
			case "i":
				togglePiP();
				break;
			case "m":
				toggleMute();
				break;
			case "l":
			case "L":
				toggleLoop();
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const handleKeyPress = (e) => {
		if (e.key === " " || e.key === "m" || e.key === "n") {
			setShowControls(true);

			if (controlTimeout.current) {
				clearTimeout(controlTimeout.current);
			}

			controlTimeout.current = setTimeout(() => {
				setShowControls(false);
			}, 3000); //3sec
		}
	};

	const handleMouseHover = () => {
		setShowControls(true);
	};

	
	useEffect(() => {
		const videoElement = videoRef.current;

		window.addEventListener("keydown", handleKeyPress);

		if (videoElement) {
			document.querySelector(".video_ShowVideo_videoPage").addEventListener("mouseover", handleMouseHover);
			document.querySelector(".video_ShowVideo_videoPage").addEventListener("mouseleave", handleMouseLeave);
		}

		return () =>
		{
			if (!videoElement) {
				window.removeEventListener("keydown", handleKeyPress);
				document.querySelector(".video_ShowVideo_videoPage").removeEventListener("mouseover", handleMouseHover);
				document.querySelector(".video_ShowVideo_videoPage").removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);

	const handleMouseDown = (e) => {
		const videoElement = videoRef.current;
		if (videoElement) {
			const boundingRect = videoElement.getBoundingClientRect();
			const clickPositionX = e.clientX - boundingRect.left;

			// Start the interval based on the click position
			if (clickPositionX <= boundingRect.width / 2) {
				// Left side hold - manually rewind the video
				intervalRef.current = setInterval(() => {
					if (videoElement.currentTime > 0) {
						videoElement.currentTime -= 0.5; // Rewind by 0.5 seconds
					}
				}, 500); // Rewind every 500ms
			} else {
				// Right side hold - manually fast-forward the video
				intervalRef.current = setInterval(() => {
					if (videoElement.currentTime < videoElement.duration) {
						videoElement.currentTime += 0.5; // Fast-forward by 0.5 seconds
					}
				}, 500); // Fast-forward every 500ms
			}
		}
	};

	const handleMouseUp = () => {
		const videoElement = videoRef.current;
		if (videoElement) {
			clearInterval(intervalRef.current); // Stop rewinding when the mouse is released
		}
	};

	const handleMouseLeave = () => {
		const videoElement = videoRef.current;
		setShowControls(false);
		if (videoElement) {
			clearInterval(intervalRef.current); // Stop rewinding when the mouse leaves the video area
		}
	};

	const getNextVideoId = () => {
		const currentIndex = vids?.data?.findIndex((video) => video._id === vid);
		if (currentIndex !== -1 && currentIndex + 1 < vids?.data?.length) {
			return vids.data[currentIndex + 1]._id;
		}
		return null;
	};

	const PlayNextVideo = () => {
		const nextVideoId = getNextVideoId();
		if (nextVideoId) {
			navigate(`/videopage/${nextVideoId}`);
		} else {
			
		}
	};

	const previousVideoId = () => {
		const currentIndex = vids?.data?.findIndex((video) => video._id === vid);
		// if (currentIndex < vids?.data?.length) {
		return vids.data[currentIndex - 1]._id;
	};

	const playPrevious = () => {
		const previousId = previousVideoId();
		if (previousId) {
			navigate(`/videopage/${previousId}`);
		} else {
			
		}
	};

	const handleTripleTap = (e) => {
		const videoElement = videoRef.current;
		if (videoElement) {
			const boundingRect = videoElement.getBoundingClientRect();
			const clickPositionX = e.clientX - boundingRect.left;

			if (clickPositionX <= boundingRect.width / 3) {
				setLeftTapCount(leftTapCount + 1);

				if (leftTapTimeoutRef.current) {
					clearTimeout(leftTapTimeoutRef.current);
				}

				leftTapTimeoutRef.current = setTimeout(() => {
					setLeftTapCount(0);
				}, 500);

				if (leftTapCount === 2) {
					commentsRef.current.scrollIntoView({ behavior: "smooth" });
					setLeftTapCount(0);
				}
			} else if (clickPositionX >= (2 * boundingRect.width) / 3) {
				setRightTapCount(rightTapCount + 1);

				if (rightTapTimeoutRef.current) {
					clearTimeout(rightTapTimeoutRef.current);
				}

				rightTapTimeoutRef.current = setTimeout(() => {
					setRightTapCount(0);
				}, 500);

				if (rightTapCount === 2) {
					window.close();
					setRightTapCount(0);
				}
			} else {
				setMiddleTapCount(middleTapCount + 1);

				if (middleTapTimeoutRef.current) {
					clearTimeout(middleTapTimeoutRef.current);
				}

				middleTapTimeoutRef.current = setTimeout(() => {
					setMiddleTapCount(0);
				}, 500);

				if (middleTapCount === 2) {
					const nextVideoId = getNextVideoId();
					if (nextVideoId) {
						navigate(`/videopage/${nextVideoId}`);
					}
					setMiddleTapCount(0);
				}
			}
		}
	};

	const getCurrentPosition = () => {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				resolve,
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						alert("Location access is required for this fearure.");
					} else {
						reject(error);
					}
				}, // Handle errors
				{ timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
			);
		});
	};

	const getWeather = async (lat, lon) => {
		try {
			const apiKey = "62c2d5ebfc7b4793bab173206242307";
			const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
			if (response.ok) {
				return response.json();
			}
			throw new Error("Failed to fetch weather data");
		} catch (error) {
			console.error("Error fetching weather:", error);
			return null;
		}
	};

	const handleSingleTapTopRight = async (e) => {
		// try {
		//   const position = await getCurrentPosition();
		//   if (position) {
		const { left, width, top, height } = e.target.getBoundingClientRect();
		const tapX = e.clientX;
		const tapY = e.clientY;

		if (tapX > left + (width * 3) / 4 && tapY < top + height / 4) {
			const weather = await getWeather(11.011, 76.9654);
			if (weather) {
				// console.log(weather.location.name)
				setLocationAndTemp(`Location: ${weather.location.name}, Temperature: ${weather.current.temp_c}°C`);
				setTimeout(() => {
					setLocationAndTemp(null);
				}, 3000);
			}
		}
		//   }
		// } catch (error) {
		//   console.error("Error getting location or weather:", error);
		// }
	};

	if (!vv) {
		return <div className='error-message'>Loading...</div>;
	}

	return (
		<>
			<div className='container_videoPage'>
				<div className='container2_videoPage'>
					<div
						className='video_display_screen_videoPage'
						onDoubleClick={handleDoubleClick}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
						onClick={(e) => {
							handleTripleTap(e);
							handleSingleTapTopRight(e);
						}}
					>
						<video
							ref={videoRef}
							src={`http://localhost:5500/${vv?.filepath}`}
							className={`video_ShowVideo_videoPage ${isFull ? "full" : ""}`}
							// height={500}
							// width={1000}
							autoPlay
							onTimeUpdate={handleTimeUpdate}
							onLoadedMetadata={handleLoadedMetadata}
							onClick={handleClick}
							onDoubleClick={handleDoubleClick}
						>
							your browser does not suppor the video tag
						</video>
						<div className={`videoplayer_controlers ${showControls ? "show" : ""}`}>
							<div className='videoplayer_timeline' onClick={handleProgressClick}>
								
								<div className="progress" style={{width: `${progress}%`}}></div>
							</div>
							<div className='videoplayer_btns'>
								<div className='left_btns'>
									<div onClick={togglePlayPause} className="btn">{isPlaying ? <AiOutlinePause size={22} /> : <FaPlay size={18} />}</div>
									<div className='btn' onClick={toggleMute}>
									{isMuted ? <FaVolumeMute size={22} title="muted"/> : <FaVolumeUp size={22} title="volume" />}
									</div>
									<div className="btn"> <AiFillBackward size={22} onClick={playPrevious} /> </div>
									<div className="btn"> <AiFillForward size={22} onClick={PlayNextVideo} />	</div>
									<div className="currentTime"> {formatTime(currentTime)} / {formatTime(duration)} </div>
								</div>

								

									<div className='right_btns'>
										<div className="btn"> <RiLoopLeftLine size={22} onClick={toggleLoop} /> </div>
									<div className="btn"> <MdSpeed size={22} onClick={togglePlaybackSpeed} />x {playbackSpeed} </div>
										<div className="btn">
											<MdPictureInPicture size={22} onClick={togglePiP} />
										</div>
										<div className="btn">
											<AiOutlineFullscreen size={22} onClick={toggleFullscreen} />
										</div>
									</div>
								
							</div>

						{locationAndTemp && <div className='location-temp-popup'>{locationAndTemp}</div>}
						</div>
					</div>

					<div className='video_details_videoPage'>
						<div className='video_btns_title_VideoPage_cont'>
							<p className='video_title_VideoPage'>{vv?.videotitle}</p>
							<div to={`/channel/${vv?.videochanel}`} className='chanel_details_videoPage'>
								<Link to={`/channel/${vv?.videochanel}`} className='chanel_logo_videoPage'>
									{vv?.channelProfile ? (
										<img src={`http://localhost:5500/${vv?.channelProfile}`} alt='channelProfile' />
									) : (
										<div className='profile_txt'>
											{vv?.uploader.charAt(0).toUpperCase()}
											{vv?.uploader.charAt(1).toUpperCase()}
										</div>
									)}
									{/* <img src={`http://localhost:5500/${vv?.channelProfile}`} alt='channelProfile' /> */}
								</Link>
								<Link to={`/channel/${vv?.videochanel}`} className='chanel_name_videoPage'>
									{vv?.uploader}
								</Link>

								{currentuser?.result?.name !== vv?.uploader && (
									<>
										<button type='submit' className='subscribe_btn' onClick={togglesubscribebtn}>
											{subscribebtn ? <>subscribed</> : <>subscribe</>}
										</button>
									</>
								)}
								<Likewatchlatersavebtns vv={vv} vid={vid} />
							</div>
							<hr className='line' />
						</div>
						<div className='video_desc'>
							<div className='views_date_btns_VideoPage'>
								<div className='views_videoPage'>
									{vv?.views} views  <sup>.</sup> {moment(vv?.createdAt).fromNow()}
								</div>
							</div>
							{vv?.description}
						</div>
						<div className='comments_VideoPage' ref={commentsRef}>
							<h2>
								<u>Comments</u>
							</h2>
							<Comment videoid={vv._id} />
						</div>
					</div>
					<div className='moreVideoBar'>
						More videos
						{/* <Morevideos cId={vv.videoChanel} currentVid={vid}/> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default VideoPage;
