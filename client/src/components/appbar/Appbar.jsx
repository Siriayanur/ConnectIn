import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat'
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom'

import './Appbar.css'
import { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';

export default function Appbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <span className="logo">Messiaro</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon"/>
                    <input placeholder="search for posts,friends.." className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                        <div className="topbarIconItem">
                        <PersonIcon style={{fontSize : '30px'}}/>
                            <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                            <ChatIcon style={{fontSize : '30px'}} />
                            <span className="topbarIconBadge">3</span>
                    </div>
                    <div className="topbarIconItem">
                            <NotificationsIcon style={{fontSize : '30px'}}/>
                            <span className="topbarIconBadge">5</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? (PF + user.profilePicture) : (PF + '/noDp.png')} alt="" className="topbarImg"/>
                </Link>
            </div>
        </div>
    )
}

