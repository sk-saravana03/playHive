import React from 'react'
// import vid from "../../Component/Video/vid.mp4"
import WHL from '../../Component/WHL/WHL'
import { useSelector } from 'react-redux'
const Watchhistory = () => {
  const watchhistoryvideolist=useSelector(s=>s.historyreducer)
    document.title = "History"
  return (
    <WHL page={"History"} videolist={watchhistoryvideolist} />
    
  )
}

export default Watchhistory