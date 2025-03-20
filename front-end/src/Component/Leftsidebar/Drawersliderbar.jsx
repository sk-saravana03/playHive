import React from 'react'
import "./Drawerslidebar.css"
import { AiFillPlaySquare, AiOutlineHome, AiFillLike } from 'react-icons/ai'
import {  MdSubscriptions, MdOutlineWatchLater } from "react-icons/md"
import {  FaHistory } from 'react-icons/fa'
import shorts from "./shorts.png"
import { NavLink } from 'react-router-dom'

const Drawersliderbar = ({ toggledraw, toggledrawersidebar }) => {
  return (
    <div className="container_DrawerLeftSidebar" style={toggledrawersidebar}>
      <div className="container2_DrawerLeftSidebar">
        
        <div className="Drawer_leftsidebar">
          <NavLink to={'/'} className="icon_drawersidebar_div">
              <p>
              <AiOutlineHome size={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_drawersidebar_icon">Home</div>
            </p>
          </NavLink>
          
          <NavLink to={'/Shorts'} className="icon_drawersidebar_div">
            <p>
              <img src={shorts} width={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} alt='shorts icon' />
              <div className="text_drawersidebar_icon">Shorts</div>
            </p>
          </NavLink>

          <NavLink to={'/subscription'} className="icon_drawersidebar_div">
            <p>
              <MdSubscriptions size={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_drawersidebar_icon">Subscriptions</div>
            </p>
          </NavLink>
        </div>
        <hr />
        <div className="libraryBtn_Drawerleftsidebar">
          <NavLink to={'/Library'} className="icon_drawersidebar_div">
            <p>
              {/* <MdOutlineVideoLibrary size={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} /> */}
              <div className="text">You {">"}</div>
            </p>
          </NavLink>
          <NavLink to={'/Watchhistory'} className="icon_drawersidebar_div">
            <p>
              <FaHistory size={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_drawersidebar_icon">History</div>
            </p>
          </NavLink>
          <NavLink to={'/Yourvideo'} className="icon_drawersidebar_div">
            <p>
              <AiFillPlaySquare size={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_drawersidebar_icon">Your Videos</div>
            </p>
          </NavLink>
          <NavLink to={'/Watchlater'} className="icon_drawersidebar_div">
            <p>
              <MdOutlineWatchLater
                size={22}
                className={"icon_drawersidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_drawersidebar_icon">Watch Later</div>
            </p>
          </NavLink>
          <NavLink to={'/Likedvideo'} className="icon_drawersidebar_div">
            <p>
              <AiFillLike size={22} className='icon_drawersidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_drawersidebar_icon">Liked Videos</div>
            </p>
          </NavLink>
        </div>
        <hr/>
        <div className="subScriptions_lsdbar">
          <h3>Subscription</h3>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
        
          </div>
        </div>
        <hr />
        <div className="Drawer_leftsidebar">
        <div className="explore_lsdb">
        <h3>Explore</h3>
          </div>
        </div>
      </div>
      <div className="container3_DrawaerLeftSidebar" onClick={() => toggledraw()}></div>
    </div>
  )
}

export default Drawersliderbar