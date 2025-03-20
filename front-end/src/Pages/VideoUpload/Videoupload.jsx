import React, { useState } from 'react'
import './VideoUpload.css'

import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import { useSelector, useDispatch } from 'react-redux'
import { uploadvideo } from '../../action/video'
import { HiXMark } from 'react-icons/hi2'
// import { MdDescription } from 'react-icons/md'
// import LinearProgress from '@mui/joy/LinearProgress';
// import Typography from '@mui/joy/Typography';
// import { useCountUp } from 'use-count-up';
const Videoupload = ({ setvideouploadpage }) => {
    const [title, settitle] = useState("")
    const [description, setDescrtipion] = useState("")
    const [videofile, setvideofile] = useState("")
    const [progress, setprogress] = useState(0)
    const [fileName, setFileName] = useState("Choose a video file....")

    const dispatch = useDispatch()
    const handlesetvideofile = (e) => {
        setvideofile(e.target.files[0])
    }
    const currentuser = useSelector(state => state.currentuserreducer);
    const fileoption = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setprogress(percentage)
            if (percentage === 100) {
                setTimeout(function () { }, 3000);
                setvideouploadpage(false)
            }
        },
    };
    // const { value } = useCountUp({
    //     isCounting: true,
    //     duration: 5,
    //     easing: 'linear',
    //     start: 0,
    //     end: 75,
    //     onComplete: () => ({
    //       shouldRepeat: true,
    //       delay: 2,
    //     }),
    //   });
    const uploadvideofile = () => {
        if (!title && !description) {
            alert("please enter a title and description of the video")
        }else if (!videofile) {
            alert("please attach a video file");
        } else if (videofile.size > 1073741824) {
            alert("Please attach video file less than 1GB")
        } else {
            const filedata = new FormData()
            filedata.append("file", videofile)
            filedata.append("title", title)
            filedata.append("description", description)
            filedata.append("chanel", currentuser?.result._id)
            filedata.append("uploader", currentuser?.result.name)
            filedata.append("channelProfile", currentuser?.result.channelProfile)
            // console.log(videofile)
            dispatch(uploadvideo({ filedata: filedata, fileoption: fileoption }))
        }
    }
    const handleFileChange = (e) =>
        {
            const file = e.target.files[0];
            if (file) {
                setFileName(file.name);
            }
            
        }
    // console.log(currentuser?.result.channelProfile)    
    return (
        <div className="container_VidUpload">
            <p
                onClick={() => setvideouploadpage(false)}
                className="ibtn_x" ><HiXMark/> </p>
            <div className="container2_VidUpload">
                <div className="ibox_div_vidupload">
                {/* <label htmlFor="title"
                        className='ibox_cidupload btn_vidUpload'> */}
                    <input type="text"
                        
                        placeholder='   title'
                        className="ibox"
                        onChange={(e) =>
                        {
                        settitle(e.target.value);
                            }} />
                    {/* </label> */}
                    {/* <label htmlFor="description"
                        className='ibox_cidupload btn_vidUpload'> */}
                    <textarea
                        placeholder=' description'
                        className='ibox'
                        onChange={(e) =>
                        { 
                            setDescrtipion(e.target.value)
                        }} >

                    </textarea>
                    {/* </label> */}
                   
                    <label htmlFor="file"
                         className='file_label'>  {fileName}
                        <input type="file"
                            name='file'
                            style={{ fontSize: "1rem" }}
                            accept='video/*'
                            onChange={(e) =>
                            {
                                handlesetvideofile(e)
                                handleFileChange(e)
                            }}
                            className="ibox_file" />
                     </label> 
                    <button type="submit"
                        onClick={() => uploadvideofile()}
                        value={"Upload"}
                        className='ibtn'
                    > Upload </button>
                </div>
                <div className="ibox_div_vidupload">
                    <div className="loader ibox_div_vidupload">
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                textSize: "30px",
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255,255,255,${progress / 100})`,
                                textColor: "#white",
                                trailColor: "white",
                                backgroundColor: "#3e98c7",
                                // textalign: "center",
                            })}

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videoupload