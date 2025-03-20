import React,{useEffect, useState} from 'react'
import {AiFillDislike,AiFillLike,AiOutlineDislike,AiOutlineLike} from"react-icons/ai"
import {MdPlaylistAddCheck} from "react-icons/md"
import {RiPlayListAddFill} from "react-icons/ri"
import "./Likewatchlatersavebtn.css"
import { useSelector,useDispatch } from 'react-redux'
import { likevideo } from '../../action/video'
import {addtolikedvideo,deletelikedvideo} from "../../action/likedvideo"
import { addtowatchlater,deletewatchlater } from '../../action/watchlater'
import
  {
    WhatsappIcon,
    WhatsappShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    TelegramIcon,
    TelegramShareButton
 } from 'react-share';
const Likewatchlatersavebtns = ({vv,vid}) => {
  const dispatch=useDispatch()
  const [savevideo,setsavevideo]=useState(false)
  const [dislikebtn,setdislikebtn]=useState(false)
  const [likebtn, setlikebtn] = useState(false)
  
  const currentuser=useSelector(state => state.currentuserreducer) || { data: [] };;
  const likedvideolist=useSelector((state)=>state.likedvideoreducer) || { data: [] };
  const watchlaterlist = useSelector((state) => state.watchlaterreducer) || { data: [] };
  
  

  const shareUrl = window.location.href;

  useEffect(() => {
    setlikebtn(
      likedvideolist?.data instanceof Array ? likedvideolist.data.some((q) => q.videoid === vid && q.viewer === currentuser?.result?._id) : false
    );
  
    setsavevideo(
      watchlaterlist?.data instanceof Array ? watchlaterlist.data.some((q) => q.videoid === vid && q.viewer === currentuser?.result?._id) : false
    );
  }, [likedvideolist, watchlaterlist, vid, currentuser]);
  
const togglesavedvideo=()=>{
  if(currentuser){
      if(savevideo){
        setsavevideo(false);
        dispatch(deletewatchlater({videoid:vid,viewer:currentuser?.result?._id}))
      }else{
        setsavevideo(true);
        dispatch(addtowatchlater({videoid:vid,viewer:currentuser?.result?._id}))
      }
  }else{
    alert("please login to save video")
  }
}
// console.log(vid,vv.Like)
const togglelikevideo = (e, lk) => {
  if (!currentuser) {
    alert("Please login to like video");
    return;
  }

  if (likebtn) {
    setlikebtn(false);
    dispatch(deletelikedvideo(vid, currentuser?.result?._id));
    dispatch(likevideo({ id: vid, Like: Math.max(lk - 1, 0) })); // Prevent negative likes
  } else {
    setlikebtn(true);
    dispatch(addtolikedvideo({ videoid: vid, viewer: currentuser?.result?._id }));
    dispatch(likevideo({ id: vid, Like: lk + 1 }));
    setdislikebtn(false);
  }
};

  
  
const toggledislikevideo=(e,lk)=>{
  if(currentuser){
      if(dislikebtn){
        setdislikebtn(false);
      }else{
        setdislikebtn(true);
        if(likebtn){
          dispatch(likevideo({id:vid,Like:lk-1}))
          dispatch(deletelikedvideo({videoid:vid,viewer:currentuser?.result?._id}))
        }
        setlikebtn(false)
      }
  }else{
    alert("please login to dislike video")
  }
}
  return (
    <div className="btns_cont_videoPage">
      <div className="btn_VideoPage">
        <div className="like_videoPage" onClick={(e)=>togglelikevideo(e,vv.Like)}>
          {likebtn? (
            <>
            <AiFillLike size={22} className='like_btns_videoPage'/>
            </>
          ):(
            <>
            <AiOutlineLike size={22} className='like_btns_videoPage' />
            </>
          )}
          <b>{vv?.Like}</b> <div className="like_btns_videoPage">|</div>
        <div onClick={(e)=>toggledislikevideo(e,vv.Like)}>
          {dislikebtn?(<>
            <AiFillDislike size={22} className='like_btns_videoPage'/>
          </>):(
            <>
              <AiOutlineDislike size={22} className='like_btns_videoPage'/>
            </>
          )}
          
        </div>
        </div>
        <div className="play_videoPage" onClick={(e)=>togglesavedvideo(e)}>
          {savevideo?(<>
            <MdPlaylistAddCheck size={22} className='btns_videoPage'/>
            <b>Saved</b>
          </>):(
            <>
              <RiPlayListAddFill size={22} className='btns_videoPage'/>
              <b>Save</b>
            </>
          )}
        </div>
        
        <div className="share_videoPage">
          <>
          {/* <RiShareForwardLine size={22} className='btns_videoPage' />
            <b>Share</b> */}
            <WhatsappShareButton url={shareUrl} className='icon'>
              <WhatsappIcon size={24} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl} className='icon'>
              <FacebookIcon size={24} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} className='icon'>
              <TwitterIcon size={24} round={true}/>
            </TwitterShareButton>
            <TelegramShareButton url={shareUrl} className='icon'>
              <TelegramIcon size={24} round={true}/>
            </TelegramShareButton>
            <LinkedinShareButton url={shareUrl} className='icon'>
              <LinkedinIcon size={24} round={true}/>
            </LinkedinShareButton>
          </>
        </div>
      </div>
    </div>
  )
}

export default Likewatchlatersavebtns