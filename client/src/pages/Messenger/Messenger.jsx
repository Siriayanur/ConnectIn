import React, { useContext, useEffect,useRef,useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Conversation from '../../components/conversation/Conversation';
import './Messenger.css';
import Message from '../../components/message/Message';
import OnlineChat from '../../components/onlineChat/OnlineChat';
import { AuthContext } from '../../components/context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';

function Messenger()
{
    const { user } = useContext(AuthContext);
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([])
    const [arrivingMessages, setArrivingMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([]);
    //To make sure we always reach end of the message window
    const scrollRef = useRef();
    const socket = useRef();
    useEffect(() =>
    {
        socket.current = io('ws://localhost:8900');
        //Get message for the current user
        socket.current.on('getMessage', (data) =>
        {
            setArrivingMessages({
                senderId: data.senderId,
                text: data.text,
                createdAt : Date.now()
                
            })
        })
    }, [])
    
    useEffect(() =>
    {
        arrivingMessages && currentChat?.members.includes(arrivingMessages.senderId) && setMessages(previous => [...previous, arrivingMessages]);
    },[arrivingMessages,currentChat])
    useEffect(() =>
    {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', users =>
        {
            setOnlineUsers(
                user.following.filter(f => users.some((u) => u.userId === f))
            );
        })
    }, [user]);
        
    


    //Fetch the conversation which involves me(sender or receiver)
    useEffect(() =>
    {
        const fetchConversationsOfUser = async () =>
        {
            try
            {
                const result = await axios.get('http://localhost:5000/api/conversation/' + user._id);
                setConversation(result.data);
            } catch (e)
            {
                console.log(e);
            }
        }
        fetchConversationsOfUser();
    }, [user._id]);

    //Fetch messages for the selected conversation
    useEffect(() =>
    {
        const getMessages = async () =>
        {
            try
            {
                const response = await axios.get('http://localhost:5000/api/messages/' + currentChat?._id)
                setMessages(response.data);
            } catch (e)
            {
                console.log(e)        
            }
        }
        getMessages();
    },[currentChat])
    // console.log(messages)

    //Whenever a new message comes in any conversation we need this effect for every conversation room
    
   
    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        console.log('called')
        const message = {
            senderId: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        //send new message through socket
        const receiverId = currentChat.members.find(member => member !== user._id); // If it is not my id it is my friends id
        console.log('This is receiever Id' + receiverId);
        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text :newMessage
        })
        try
        {
            const response = await axios.post('http://localhost:5000/api/messages/', message);
            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (e)
        {
            console.log(e)
        }
    }
    useEffect(() =>
        {
            scrollRef.current?.scrollIntoView({behavior : 'smooth'})
        },[messages])

        


    return (
        <>
            <Appbar/>
            <div className="message">
                <div className="chatMenu">
                    <div className="chatMenuContainer">
                        <input placeholder="Search for friends.." className="chatMenuInput" />
                        {conversation.map(c =>
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={ user}/>
                            </div>
                        )}
                        
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxContainer">
                        {currentChat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(m => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={ user._id === m.senderId}/>
                                        </div>
                                    ))}
                                </div> 
                                <div className="chatBoxBottom">
                                    <textarea className="chatMessageInput" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="message here..."></textarea>
                                    <button className="chatMessageButton" onClick={handleSubmit}>Send</button>
                                </div>
                            </> :
                            <span className="noConversation">Create your first conversation</span>
                    }
                    </div>
                </div>
                <div className="chatOnlineList">
                    <div className="chatOnlineListContainer">
                        <OnlineChat onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={ setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger

//'Jetbrains Mono
//Inconsolata
//Fira Code
//Monospace
//Ubuntu Mono