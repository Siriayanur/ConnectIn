import React, { useContext, useEffect,useState } from 'react'
import Online from '../online/Online';
import './RightBar.css';
import { Users } from '../../demoData';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Remove } from '@material-ui/icons';
function RightBar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const { user: currentUser,dispatch } = useContext(AuthContext);
    const [followed,setFollowed] = useState(currentUser.following.includes(user?._id)) 
    
    useEffect(() =>
    {
        const getFriends = async () => {
        try {
            const friendList = await axios.get("http://localhost:5000/api/users/friends/" + user._id);
            setFriends(friendList.data);
            console.log(friendList.data);
            console.log(user);
        } catch (err) {
            console.log(err);
        }
        };
        getFriends();
    }, [user]);
    
    const handleClick = async () =>
    {
        try
        {
            if (followed)
            {
                await axios.put('http://localhost:5000/api/users/' + user._id + '/unfollow',{userId : currentUser._id});
                dispatch({type : 'UNFOLLOW',payload : user._id})
            } else
            {
                await axios.put('http://localhost:5000/api/users/' + user._id + '/follow',{userId : currentUser._id});
            
                dispatch({type : 'FOLLOW',payload : user._id})
            }
            
        } catch (e)
        {console.log(e)
            
        }
        setFollowed(!followed)
    }


    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImage" src="/asset/gift.jpg" alt=""/>
                    <span className="birthdayText"><b>Poornashree</b> and <b>3 others</b> have birthday today</span>
                </div>
                <img className="rightbarAd" src="/asset/posts/p5.jpg"></img>
                <h4 className="rightbarTitle">Online Peers</h4>
                <ul className="rightbarFriendList">
                    {Users.map(user => (
                        <Online key={user.id} user={user}/>
                    ))}
                </ul>    
            </>
        );
    }
    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "UNFOLLOW" : "FOLLOW"}
                        {followed ? <Remove/> : <PersonAddIcon/>}
                    </button>
                )}
                <h4 className="rightbarTitle">
                    My Details
                </h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoKey">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoKey">{ user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoKey">{user.relationship === 1 ? "Single" : (user.relationship === 2 ? "Married" : "Active") }</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">
                    My Friends
                </h4>
                {friends.length > 0 &&
                    <div className="rightbarFollowing">
                        {friends.map((friend, i) => (
                            <Link to={'/profile/' + friend.username} style={{ textDecoration: 'none', color: 'inherit' }} key={i}>
                                <div className="rightbarFollowingItem">
                                    <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'noDp.png'} alt="" className="rightbarFollowingImage" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        ))
                        }
                    </div>
                }
            </>
        );
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}

            </div>
        </div>
    )
}

export default RightBar
//1:17:08 I stopped here 