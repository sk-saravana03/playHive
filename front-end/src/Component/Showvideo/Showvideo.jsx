import React from 'react'
import './Showvideo.css'
import { Link } from 'react-router-dom'
import moment from "moment"


const Showvideo = ({vid, channel}) => {
  
  return (
    <div className='container_videobox'>
      <Link to={`/videopage/${vid._id}`}>
        <video src={`http://localhost:5500/${vid.filepath}`}
          className='video_ShowVideo' />
    </Link>
    <div className="video_description">
            <Link to={`/channel/${vid?.videochanel}`}>
        <div className="Chanel_logo_App">
            {vid?.channelProfile ? (
              
          <img src={`http://localhost:5500/${vid?.channelProfile}`} alt='channelProfile'/>
            ): (
              <div className="profile_txt">{vid?.uploader.charAt(0).toUpperCase()}
                                            {vid?.uploader.charAt(1).toUpperCase()}
                                        </div>
          )}
          
        </div>
          </Link>
    
    <div className="video_details">
        <Link to={`/videopage/${vid._id}`} className="title_vid_ShowVideo">{vid?.videotitle}</Link>
        <Link to={`/channel/${vid?.videochanel}`} className='channel_name'>
          <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
          </Link>
        <pre className="vid_views_UploadTime">
            {vid?.views} views <sup>.</sup> {moment(vid?.createdAt).fromNow()}
        </pre>
    </div>
    </div>
    </div>
  )
}

export default Showvideo