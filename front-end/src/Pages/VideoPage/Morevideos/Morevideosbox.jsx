import React from 'react'
import { useSelector } from 'react-redux'
import Morevideoslist from './Morevideoslist'
const Morevideosbox= ({ videoid })=>
{
    const vids=useSelector(state=>state.videoreducer)
  return (
      <div className='morevideo_container'>
          {
            vids?.data.filter(q=>q._id===videoid).map(vi=>{
                return(
                    <div className="video_box_app" key={vi._id}>
                        <Morevideoslist vid={vi}/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Morevideosbox