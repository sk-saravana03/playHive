import React from 'react'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import "./Home.css"
import "../../App.css";
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid'
// import vid from "../../Component/Video/vid.mp4"
import { useSelector } from 'react-redux'
const Home = () => {
  const vids = useSelector(state => state.videoreducer)?.data?.filter(q => q).reverse();
  
  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12 && hours >= 5) {

      return "Good Morning!";
    } else if (hours < 18) {
      return "Good Afternoon!";
    } else if (hours < 20) {
      return "Good Evening!";
      
    } else if (hours < 24) {
      return (
        <>
          Relax, <br />
          The day is done
        </>
      )
    } else { 
      return "It's already late Go to bed!!!"
    }
  };
  
  const navlist=[
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy"
  ];

  document.title = "Home | Play Hive"
  return (
    <div className="container_Pages_App">
      <Leftsidebar/>
      <div className="container2_Pages_App">
        <div className="greetings">{getGreeting()}</div>
        {/* <div className="navigation_Home">
          {navlist.map((m)=>{
            return(
              <p key={m} className='btn_nav_home'>{m}</p>
            );
          })}
        </div> */}
        <Showvideogrid vid={vids}/>
      </div>
    </div>
  )
}

export default Home