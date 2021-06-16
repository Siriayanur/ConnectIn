import React from 'react'
import './Message.css';
import {format} from 'timeago.js'
function Message({own,message})
{
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ?  "messageWrapper own" :  "messageWrapper"}>
            <div className="messageTop">
                <img src={PF+'1622300515239cp1.png'} alt="senderProfilePicture" className="messageSenderImage"/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
              {format(message.createdAt)}
            </div>
        </div>
    )
}

export default Message
