import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                //
                const response = username
                    ? await axios.get(`http://localhost:5000/api/posts/profile/${username}`)
                    : await axios.get('http://localhost:5000/api/posts/timeline/'+user._id)
                console.log(response);
                //To sort the posts based on order of creation
                setPosts(response.data.sort((p1, p2) =>
                {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                }));
            } catch (e) {
                console.log(e)
            }
        }
        fetchPosts();
    }, [username,user._id])
    //Call the useEffect hook only once i.e when the page renders
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || user.username === username) && <Share />}
                {posts.map((post) => (
                    <Post key={post._id} post={post}/>
                ))}                
                
            </div>
        </div>
    )
}

export default Feed
