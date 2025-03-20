import React, { useState, useEffect, useCallback } from 'react'

import "./Navbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {  RiVideoAddLine } from "react-icons/ri"
import { IoMdNotificationsOutline } from "react-icons/io"
import {   BiJoystick, BiUserCircle } from "react-icons/bi"
import Searchbar from './Searchbar/Searchbar'
import Auth from '../../Pages/Auth/Auth'
import axios from "axios"
import { login } from "../../action/auth"
import { useGoogleLogin,googleLogout } from '@react-oauth/google';
import { setcurrentuser } from '../../action/currentuser';
import { jwtDecode } from "jwt-decode"
import { MdMenu } from 'react-icons/md'
import game from '../Games/Images/game.png'
import sudoku from '../Games/Images/sudoku.png'
import tictactoe from '../Games/Images/tic-tac-toe.png'
import dots from '../Games/Images/dots.png'
import game2048 from '../Games/Images/game2048.svg'
import { FaXmark } from "react-icons/fa6";


const Navbar = ({ toggledrawer, seteditcreatechanelbtn, toggledrawersidebar }) =>
{
    const [authbtn, setauthbtn] = useState(false)
    const [user, setuser] = useState(null)
    const [profile, setprofile] = useState([])
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenuIcon = () =>
    {
        if (toggledrawersidebar.display === "none" ) {
            setIsOpen(false)
        }     
        else if(toggledrawersidebar.display === "block") {
            setIsOpen(true)
        }
    }
    
    // console.log("current Theme", theme)
    const currentuser = useSelector(state => state.currentuserreducer);
    // console.log(currentuser)
    const successlogin = useCallback(() =>
    {
        if (profile.email) {
            dispatch(login({ email: profile.email }))
        }
    }, [profile.email, dispatch])
    

    const google_login = useGoogleLogin({
        onSuccess: tokenResponse => setuser(tokenResponse),
        onError: (error) => console.log("Login Failed", error)
    });

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        setprofile(res.data)
                        successlogin()
                        // console.log(res.data)
                    })

            }
        },
        [user, successlogin]
    );
    const logout=useCallback(()=>{
        dispatch(setcurrentuser(null))
        googleLogout()
        localStorage.clear()
    }, [dispatch])
    useEffect(() =>
    {
        const token = currentuser?.token;
        if (token) {
            const decodetoken = jwtDecode(token)
            if (decodetoken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    }, [currentuser?.token, dispatch, logout]);

    return (
        <>
            <div className="Container_Navbar">
                <div className="Burger_Logo_Navbar">
                    <div className="burger" onClick={() => toggledrawer()}
                                style={{
                                    transition: "transform 0.5s ease",
                                    transform: `rotate(${isOpen ? 180 : 0}deg)`
                        }}
                    >
                        {isOpen ? (
                            <MdMenu size={26} style={{ color: "white" }} onClick={()=>toggleMenuIcon()} />
                        ) : (
                            <FaXmark size={26} style={{ color: "white" }} onClick={()=>toggleMenuIcon()} />  
                            )}
                    </div>  
                    <Link to={"/"} className='logo_div_Navbar'>
                        <div className="logo_title_navbar">
                                PlayHive
                        </div>
                        
                    </Link>
                </div>
                <Searchbar />

                <div className='games_btn'>
                    <BiJoystick size={26} />
                    <div className='games_list'>
                        <Link to={"/game2048"} className='games_item' title='2048'>
                            <img src={game2048}  className='icons'  alt="" />
                        </Link>
                        <Link to={"/sudoku"} className='games_item' title='sudoku'>
                            <img src={sudoku}  className='icons' alt="" />
                        </Link>
                        <Link to={"/tictactoe"} className='games_item' title='tictactoe'>
                            <img src={tictactoe} className='icons'  alt="" />
                        </Link>
                        <Link to={"/dotsandboxes"} className='games_item' title='dotsandboxes'>
                            <img src={dots} className='icons'  alt="" />
                        </Link>
                        <Link to={"/snakegame"} className='games_item' title='snakegame'>
                            <img src={game}  className='icons'  alt="" />
                        </Link>
                    </div>
                </div>
                
                <Link to={"/videocall"} id='videoCallBtn' className='Video_Btn'>
                    <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
                </Link>
                
                
                <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" title='notifications' />
                <div className="Auth_cont_Navbar" title='sign in'>
                    {currentuser ? (
                        <>
                            <div className="Chanel_logo_App" onClick={() => setauthbtn(true)} title='your profile'>
                                {/* <p className="fstChar_logo_App"> */}
                                    {currentuser?.result.name ? (
                                        <img src={`http://localhost:5500/${currentuser?.result?.channelProfile}`} alt='channelProfile'/>

                                    ) : (
                                        <div className="profile_txt">{currentuser?.result.email.charAt(0).toUpperCase()}
                                            {currentuser?.result.email.charAt(1).toUpperCase()}
                                        </div>
                                    )}
                                {/* </p> */}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className='Auth_Btn' onClick={() => google_login()}>
                                <BiUserCircle size={30} />
                                
                            </p>
                        </>
                    )}
                </div>
            </div>
            {
                authbtn &&
                <Auth seteditcreatechanelbtn={seteditcreatechanelbtn}
                    setauthbtn={setauthbtn}
                    user={currentuser} />
            }
        </>
    )
}


export default Navbar


