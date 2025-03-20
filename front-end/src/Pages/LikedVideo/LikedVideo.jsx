import React from 'react'
// import vid from "../../Component/Video/vid.mp4"
import WHL from '../../Component/WHL/WHL'
import { useSelector } from 'react-redux'
const Likedvideo = () => {
  const likedvideolist=useSelector((state)=>state.likedvideoreducer)
  
  document.title = "Liked Video"
    
  return (
    <WHL page={"Liked Video"} videolist={likedvideolist}/>
  )
}

export default Likedvideo