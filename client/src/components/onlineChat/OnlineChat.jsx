import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './OnlineChat.css';

function OnlineChat({onlineUsers,currentId,setCurrentChat})
{
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const handleClick = async (user) =>
    {
        try
        {
            const result = await axios.get(`http://localhost:5000/api/conversation/find/${currentId}/${user._id}`);
            setCurrentChat(result.data);
        } catch (e)
        {
            console.log(e);
        }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(() =>
    {
        const getFriends = async () =>
        {
            const result = await axios.get('http://localhost:5000/api/users/friends/' + currentId);
            setFriends(result.data);
        }
        getFriends();
    }, [currentId]);
    
    useEffect(() =>
    {
        setOnlineFriends(friends.filter(fr => onlineUsers.includes(fr._id)));
    }, [onlineUsers, friends]);

    return (
        <div className="online">
            {onlineFriends.map(friend =>
            (
                <div className="onlineFriend" onClick={ () => handleClick(friend)}>
                    <div className="onlineImgContainer">
                        <img className="onlinePersonImage" src={friend.profilePicture ? PF+ friend.profilePicture : PF + '1623071398210aaron-burden-CKlHKtCJZKk-unsplash.jpg'} alt=""/>
                        <div className="onlineBadge"/>
                    </div>
                    <span className="onlinePersonName"> {friend.username} </span>
                </div>

            )
            )}
            
        </div>
    )
}

export default OnlineChat
