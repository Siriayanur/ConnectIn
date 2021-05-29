import React from 'react'
import './Post.css';
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import{ MoreVert} from '@material-ui/icons'
import {format} from 'timeago.js' 
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Post({ post }) {
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false)
    const [user,setUser] = useState({})
    
    //To track the posts that I have liked
    const [liked, setLiked] = useState(false);

    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    

    //To track the posts that are liked or unliked by me
    useEffect(() => {
        setLiked(post.likes.includes(currentUser._id));
    },[currentUser._id,post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                //We just take the userId from post and call a get request to fetch that user details
                const response = await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`)
                console.log(response.data);
                setUser(response.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser();
    }, [post.userId])
    const handleClick = () => {
        try {
            axios.put('http://localhost:5000/api/posts/'+post._id+'/like',{userId : currentUser._id})
        } catch (e) {
            
        }
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postLeft">
                        {/* <Link to={`profile/${user.username}`}> */}
                        <Link to={`profile/${user.username}`}>
                            <img src={ user.profilePicture ? PF + user.profilePicture : PF+'/noDp.png'}  alt="userPicture" className="postProfileImage"/>
                        </Link>
                        <span className="postUsername"> { user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.desc}
                    </span>
                    <img className="postImage" src={PF+post.img}></img>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="postLikeIcon" src={`${PF}/heart.png`} alt="heartLike" onClick={handleClick} />
                        <img className="postLikeIcon" src={`${PF}/like.png`}alt="likePicture" onClick={handleClick}/>
                        <span className="postLikeCounter">{likes} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                
                </div>
           </div>
        </div>
    )
}

export default Post
