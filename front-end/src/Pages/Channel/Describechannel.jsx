import React, { useContext } from 'react'
import './Describechannel.css'
import { FaEdit,FaUpload } from "react-icons/fa"
import { useSelector } from 'react-redux'


const Describechannel = ({ setvideouploadpage , cid , seteditcreatechanelbtn }) => {
  // const user = useSelector(state=>state.currentuserreducer)
const channel=useSelector(state=>state.chanelreducer)
  
const currentchannel = channel.find((channel) => channel._id === cid);
const currentuser=useSelector(state => state.currentuserreducer);
  
  if (currentuser?.result._id === currentchannel?._id) {
    document.title = "Your Channel"
  } else { 
    document.title = `${currentchannel?.name} | Play Hive`
  }
  
  return (
    <div className="container3_chanel">
      <div  className="chanel_logo_chanel">
        <img src={`http://localhost:5500/${currentchannel?.channelProfile}`} alt='channelProfile'/>
      </div>
      <div className="description_chanel">
        <b>{currentchannel?.name}</b>
        <p>{currentchannel?.desc}</p>
      </div>
      {currentuser?.result._id === currentchannel?._id && (
        <>
        <p className="editbtn_chanel" onClick={()=>seteditcreatechanelbtn(true)}>
          <FaEdit className='icon'/>
          <b>Edit Channel</b>
        </p>
        <p className="uploadbtn_chanel" onClick={()=>setvideouploadpage(true)}>
          <FaUpload className='icon'/>
          <b>Upload Video</b>
        </p>
        </>
      )}
      <hr />
    </div>
  )
}

export default Describechannel