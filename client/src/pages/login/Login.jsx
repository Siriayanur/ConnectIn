import React, { useContext } from 'react'
import {useRef} from 'react'
import './Login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../components/context/AuthContext';
import {CircularProgress} from '@material-ui/core'
import { Link } from 'react-router-dom';
function Login() {
    const username = useRef();
    const password = useRef();
    const { user,isFetching, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({username: username.current.value,password: password.current.value},dispatch)
    }
    // console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        Messiaro
                    </h3>
                    <span className="loginDesc">
                        Connect with peers ....
                    </span>
                </div>
                <form className="loginRight" onSubmit={handleSubmit}>
                    <div className="loginBox">
                        <input placeholder="Username.." className="loginInput" type="text" required ref={username}/>
                        <input placeholder="Password.." type="password"  required className="loginInput" ref={password} />
                        <button className="loginButton">{isFetching ? <CircularProgress size="20px" color="white" /> : "Log In"}</button>                   
                        <span className="loginForgot">
                            Forgot Password?
                        </span>
                        <button className="loginRegister">
                            <Link to={`/register`} style={{textDecoration: 'none',color:'inherit'}}>
                                {isFetching ? <CircularProgress size="20px" color="white" /> : "Create Account"}
                             </Link>
                        </button>
                    </div>
                </form>
            </div>
            </div>
    )
}

export default Login
