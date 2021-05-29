import React, { useContext } from 'react'
import {useRef} from 'react'
import './Login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../components/context/AuthContext';
import {CircularProgress} from '@material-ui/core'
function Login() {
    const email = useRef();
    const password = useRef();
    const { user,  isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value,password: password.current.value},dispatch)
    }
    console.log(user);
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
                        <input placeholder="Email.." className="loginInput" type="email" required ref={email}/>
                        <input placeholder="Password.." type="password" minLength="6" required className="loginInput" ref={password} />
                        <button className="loginButton">{isFetching ? <CircularProgress size="20px" color="white" /> : "Log In"}</button>                   
                        <span className="loginForgot">
                            Forgot Password?
                        </span>
                        <button className="loginRegister">
                            {isFetching ? <CircularProgress size="20px" color="white" /> : "Create Account"}
                        </button>
                    </div>
                </form>
            </div>
            </div>
    )
}

export default Login
