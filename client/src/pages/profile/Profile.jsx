import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router'
import Appbar from '../../components/appbar/Appbar';
import Feed from '../../components/feeds/Feed';
import RightBar from '../../components/rightbar/RightBar';
import Sidebar from '../../components/sidebar/Sidebar'
import './Profile.css';
import axios from 'axios';
function Profile() {
    const [user,setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    //Will clog all the params that are defined for the particular route
    // {key_param : value_of_param_passed}

    useEffect(() => {
            const fetchUser = async () => {
                try {
                    //We just take the userId from post and call a get request to fetch that user details
                    const response = await axios.get(`http://localhost:5000/api/users?username=${username}`)
                    setUser(response.data);
                } catch (e) {
                    console.log(e)
                }
            }
            fetchUser();
    }, [username])
    

    return (
        <>
            <Appbar />
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">

                            <img
                                src={user.coverPicture ? 
                                     PF + user.coverPicture :
                                     PF + 'cp2.jpg'   }
                                alt="" className="profileCoverImage"
                            />
                            <img
                                src={
                                    user.profilePicture ?
                                    PF + user.profilePicture :
                                    PF + 'noDp.png'}
                                alt="" className="profileUserImage"
                            />
                    
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoUsername">{user.username}</h4>
                            <span className="profileInfoDesc">
                                {user.desc}
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar user={user}/>
                    </div>
                    
                </div>
    
            </div>
        </>
    )
}

export default Profile

/**
 * Change the cover and profile pictures to plain images incase the user's profile pictures
 * are not uploaded by them
 * 
 * 
 */