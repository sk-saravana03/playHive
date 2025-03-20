import React  from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import "./Auth.css"
import {useDispatch, useSelector} from "react-redux"
import { setcurrentuser } from '../../action/currentuser';

const Auth = ({ user, setauthbtn, seteditcreatechanelbtn }) =>
{
    const currentuser=useSelector(state => state.currentuserreducer);
    const dispatch=useDispatch()
    const logout=()=>{
        dispatch(setcurrentuser(null))
        localStorage.clear()
        googleLogout()
    }
    return (
        <div className="Auth_container" onClick={() => setauthbtn(false)}>
            <div className="Auth_container2">
                <p className="User_Details">
                    
                    <div className="email_auth">
                        {user?.result.name ? (
                            <>
                                <div className="Chanel_logo_App">
                                    

                                    <img src={`http://localhost:5500/${currentuser?.result?.channelProfile}`} alt='channelProfile'/>
                                    
                                </div>
                                {user?.result?.name}
                                
                            </>
                        ) : (
                                <>
                                    {user?.result.email}
                                </>
                        )}</div>
                </p>
                <div className="btns_Auth">
                    <Link to={`/dashboard/${user?.result._id}`} className='btn_Auth'>Dashboard</Link>
                    {user?.result.name ?(
                        <>
                        {
                            <Link to={`/channel/${user?.result?._id}`} className='btn_Auth'>Your Channel</Link>
                        }
                        </>
                    ):(
                        <>
                            <input type="submit" className='btn_Auth' value="Create Your Own Channel" onClick={()=>seteditcreatechanelbtn(true)}/>
                        </>
                    )}
                    <div>
                        <div className="points">Your Points : {user?.result.__v}</div>
                        <div className="btn_Auth" onClick={()=>logout()}>
                            <BiLogOut className='icon'/>
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth