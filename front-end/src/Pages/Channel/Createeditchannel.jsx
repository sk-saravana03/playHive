import React, { useState } from 'react';
import './Createeditchannel.css';
import { useSelector } from 'react-redux';
import { updatechaneldata } from "../../action/channeluser";
import { useDispatch } from 'react-redux';
import { login } from '../../action/auth';
import { HiXMark } from 'react-icons/hi2';

const Createeditchannel = ({ seteditcreatechanelbtn }) => {
    const dispatch = useDispatch();
    const currentuser = useSelector(state => state.currentuserreducer);
    const [name, setName] = useState(currentuser?.result.name);
    const [desc, setdesc] = useState(currentuser?.result?.desc);
    const [channelProfile, setChannelProfile] = useState(null);
    const [fileName, setFileName] = useState("Choose a profile for your channel....")

    const handlesubmit = async () => {
        if (!name) {
            alert("Please enter name!!");
        } else if (!desc) {
            alert("Please enter Description");
        } else if (!channelProfile) {
            alert("Please give a profile for your channel");
        } else {
            // Create a FormData object to send the data including the file
            const formData = new FormData();
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("channelProfile", channelProfile); // Append the file

            // Dispatch the action to update channel data
            await dispatch(updatechaneldata(currentuser?.result._id, formData));
            seteditcreatechanelbtn(false);
            setTimeout(() => {
                dispatch(login({ email: currentuser.result.email }));
            }, 5500);
        }
    };
    const handleFileChange = (e) =>
    {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
        
    }
    // console.log(channelProfile)

    return (
        <div className="container_CreateEditChanel">
            <p type="submit" name='text' className="ibtn_x" onClick={() => seteditcreatechanelbtn(false)}>
                <HiXMark />
            </p>
            <div className="container2_CreateEditChanel">
                
                <h1>{currentuser?.result?.name ? <>Edit</> : <>Create</>} Your Channel</h1>
                <label htmlFor="file"
                    className='file_label'>  {fileName}
                    
                <input
                        type="file"
                        
                    name="profile"
                    id="profilepic"
                    accept='image/*'
                        onChange={(e) =>
                        {
                            setChannelProfile(e.target.files[0])
                            handleFileChange(e)
                        }} // Update the file on change
                        
                    className='ibox_file'
                />
                         </label>
                <input
                    type="text"
                    placeholder='Channel Name'
                    name='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ibox"
                />
                <textarea
                    type="text"
                    rows={15}
                    placeholder='Channel Description'
                    className='ibox'
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                    />
                    
                <button
                    type="submit"
                    
                    onClick={handlesubmit}
                    className="ibtn"
                >Submit</button>
            </div>
        </div>
    );
};

export default Createeditchannel;
