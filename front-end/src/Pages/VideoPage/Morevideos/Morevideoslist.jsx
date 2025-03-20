import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import './morevideoslist.css'
const Morevideoslist = ({vid})=> {
  return (
      <div>
          <Link to={`/videopage/${vid._id}`}>
              <video src={`http://localhost:5500/${vid.filepath}`}
                  className='video_thumbnail'
              />
          </Link>
          <div className="video_details">
                  <Link to={`/videopage/${vid._id}`} className="title_vid_ShowVideo">{vid?.videotitle}</Link>
                  <Link to={`/channel/${vid?.videochanel}`}>
                    <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
                    </Link>
                  <pre className="vid_views_UploadTime">
                      {vid?.views} views <div className="dot"></div>
                      {moment(vid?.createdAt).fromNow()}
                  </pre>
              </div>
    </div>
  )
}

export default Morevideoslist