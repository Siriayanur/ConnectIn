import React, { useContext,useState, useRef } from 'react'
import './Share.css'
import { PermMedia, Label, EmojiEmotions, Room, Cancel } from '@material-ui/icons';
import { AuthContext } from '../context/AuthContext';

import axios from 'axios';
function Share()
{
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef()
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) =>
    {   
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file)
        {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.img = fileName;
            try
            {
                await axios.post('http://localhost:5000/api/upload', data);
            } catch (e)
            {
                console.log(e);
            }
        }
        try
        {
            await axios.post('http://localhost:5000/api/posts',newPost);
            window.location.reload();
        } catch (e)
        {
            
        }
    }
    return (
        <div className="shareContainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "/noDp.png"} alt="" className="shareProfileImage"/>
                    <input className="shareInput" placeholder={"What's in your mind ," + user.username} ref={desc}>

                    </input>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImageContainer">
                        <img className="shareImage" src={URL.createObjectURL(file)}></img>
                        <Cancel className="shareImageCancel" onClick={() => setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOptionItem">
                            <PermMedia className="shareIcon" htmlColor="#435560"/>
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                            <input style={{display:'none'}} type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOptionItem">
                            <Label className="shareIcon"  htmlColor="#78c4d4"/>
                            <span className="shareOptionText">
                                Tag
                            </span>
                        </div>
                        <div className="shareOptionItem">
                            <Room className="shareIcon"  htmlColor="#fea82f"/>
                            <span className="shareOptionText">
                                Location
                            </span>
                        </div>
                        <div className="shareOptionItem">
                            <EmojiEmotions className="shareIcon"  htmlColor="#ce1f6a"/>
                            <span className="shareOptionText">
                                Feelings
                            </span>
                        </div>
                        
                    </div>
                    <button className="shareButton">SHARE</button>
                </form>
            </div>
        </div>
    )
}

export default Share
