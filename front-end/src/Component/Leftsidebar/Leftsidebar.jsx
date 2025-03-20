import React from 'react';
import "./Leftsidebar.css";
import shorts from "./shorts.png";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";  // Correct icon imports
import { MdExplore, MdOutlineExplore, MdOutlinePerson, MdOutlineSubscriptions, MdPerson, MdSubscriptions } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Leftsidebar = () => {
  return (
    <div className="container_leftSidebar">
        <NavLink to="/" className="icon_sidebar_div"  title='Home'>
            {({ isActive }) => (
            
                isActive  ? <AiFillHome size={22} className='icon_sidebar' /> : <AiOutlineHome size={22} className='icon_sidebar' />      
            )}
            {/* <div className="text_sidebar_icon">Home</div> */}
        </NavLink>

        {/* <NavLink to="/explore" className="icon_sidebar_div" activeClassName="active" title='Explore'>
            {({ isActive }) => (
                isActive ? <MdExplore size={22} className='icon_sidebar' /> : <MdOutlineExplore size={22} className='icon_sidebar' />
            )}
            {/* <div className="text_sidebar_icon">Explore</div> */}
        {/* </NavLink> */} 

        <NavLink to={'/Shorts'} className="icon_sidebar_div" title='Shorts'>
              <img src={shorts} width={22} className='icon_sidebar' alt='shorts icon' />
            {/* <div className="text_sidebar_icon">Shorts</div> */}
        </NavLink>

        <NavLink to="/subscription" className="icon_sidebar_div"  title='Subscription'>
            {({ isActive }) => (
                isActive ? <MdSubscriptions size={22} className='icon_sidebar' /> : <MdOutlineSubscriptions size={22} className='icon_sidebar' />
            )}
            {/* <div className="text_sidebar_icon" style={{fontSize:"12px"}}>Subscription</div> */}
        </NavLink>

        <NavLink to="/library" className="icon_sidebar_div"  title='You'>
            {({ isActive }) => (
                isActive ? <MdPerson size={22} className='icon_sidebar' /> : <MdOutlinePerson size={22} className='icon_sidebar' />
            )}
            {/* <div className="text_sidebar_icon">Library</div> */}
        </NavLink>
    </div>
  );
}

export default Leftsidebar;
