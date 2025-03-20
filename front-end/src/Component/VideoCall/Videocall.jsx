import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./Videocall.css"


const socket = io.connect('http://localhost:5500')
function Videocall() {
	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const [screenSharing, setScreenSharing] = useState(false)

	const myVideo = useRef()
	const userVideo = useRef()
    const connectionRef = useRef()
    
    document.title = "Video call"

	useEffect(() => {
        

	socket.on("me", (id) => {
			setMe(id)
		})

        socket.on("callUser", (data) =>
        {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        });

        return () =>
        {
            socket.off("me");
            socket.off("callUser");
        };
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
        peer.on("stream", (stream) =>
        {
            if (userVideo.current) {
                userVideo.current.srcObject = stream
            } else {
                console.log("User video reference is null.")
                setTimeout(() => {
                    if (userVideo.current) {
                        userVideo.current.srcObject = stream;
                    }
                }, 500); 
            }
			
        });
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

    const answerCall = () =>
    {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) =>
            {
                setStream(stream)
                if (myVideo.current) {
                    myVideo.current.srcObject = stream
                } else {
                    console.warn("myVideo ref i not set yet.")
                }
        })
        

		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
        peer.on("stream", (stream) =>
        {
            if (userVideo.current) {
                userVideo.current.srcObject = stream
            }
        });

		peer.signal(callerSignal)
        connectionRef.current = peer
        setCallAccepted(true);

	}

    const leaveCall = () =>
    {
        setCallEnded(true);
        if (connectionRef.current) {
            connectionRef.current.destroy()
            connectionRef.current = null
        }
    };
    
    let screenStream = null;

    const startScreenShare = async () => {
        try {
            if (!screenSharing) {
                screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                setScreenSharing(true);
    
                // Replace current video stream with screen stream
                const sender = connectionRef.current.peerConnection.getSenders().find(s => s.track.kind === 'video');
                sender.replaceTrack(screenStream.getVideoTracks()[0]);
    
                screenStream.getVideoTracks()[0].onended = () => {
                    stopScreenShare();
                };
            }
        } catch (err) {
            console.error("Error accessing screen share:", err);
        }
    };
    
    const stopScreenShare = () => {
        setScreenSharing(false);
        const sender = connectionRef.current.peerConnection.getSenders().find(s => s.track.kind === 'video');
        sender.replaceTrack(stream.getVideoTracks()[0]); // Restore camera stream
    };


	return (
		<div className='container_Pages_App'>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
			<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded && ( 
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> )}
				</div>
			</div>
			<div className="myId">
				<TextField
					id="filled-basic"
					label="Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
                    />
                    
                    
                    <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<Button variant="contained" value={me} color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						
                        
					</Button>
				</CopyToClipboard>

				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
                            <button onClick={startScreenShare}>
                                {screenSharing ? "Stop Sharing" : "Share Screen"}
                            </button>
                        {callAccepted && !callEnded ? (

						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</div>
	)
}

export default Videocall