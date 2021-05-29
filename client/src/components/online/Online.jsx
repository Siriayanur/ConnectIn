import React from 'react'
import './Online.css';

function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriendListItem">
                        <div className="rightbarProfileImageContainer">
                            <img src={PF+user.profilePicture} alt="profilePhoto" className="rightbarProfileImage" />
                            <span className="rightbarOnline"></span>
                        </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Online
