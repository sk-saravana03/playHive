import React from 'react'
// import vid from "../../Component/Video/vid.mp4"
import WHL from '../../Component/WHL/WHL'
import { useSelector } from 'react-redux'
const Watchlater = () => {
  const watchlatervideolist=useSelector((s)=>s.watchlaterreducer)
  document.title = "Saved Video"
  
  return (
    <WHL page={"Watch Later"} videolist={watchlatervideolist}/>
  )
}

export default Watchlater