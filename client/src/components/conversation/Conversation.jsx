import axios from 'axios';
import React, { useState,useEffect } from 'react'
import './Conversation.css';

function Conversation({conversation,currentUser})
{
    const [user, setUser] = useState(null);
    useEffect(() =>
    {
        const friendId = conversation.members.find(f => f !== currentUser._id);
        const getFriendDetails = async () =>
        {
            try
            {
                const result = await axios.get('http://localhost:5000/api/users?userId=' + friendId);
                setUser(result.data);
            } catch (e)
            {
                console.log(e);
            }
        }
        getFriendDetails();
    }, [currentUser, conversation]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="conversation">
            <img src={user?.profilePicture ? PF + user.profilePicture :  PF + '1622300515239cp1.png'} className="conversationImage" alt="" />
            <span className="conversationChatFrom">{ user?.username}</span>
        </div>
    )
}

export default Conversation
