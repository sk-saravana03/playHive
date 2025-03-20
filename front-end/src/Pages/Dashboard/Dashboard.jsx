import React from 'react'
import "./Dashboard.css"
import { useParams } from 'react-router-dom'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
function Dashboard()
{
    const userId = useParams();
    return (
        <div className='container1'>
            <Leftsidebar />
            <div className="container2">
                <div className='sub_head'> Total Video Liked</div> 
                <div className='content'>5</div>
            </div>
        </div>
  )
}

export default Dashboard