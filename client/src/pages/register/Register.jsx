import axios from 'axios';
import React, { useRef } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Register.css';
function Register() {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
    // console.log(history);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match")
        } else {
            const user = {
                username : username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('http://localhost:5000/api/auth/register',user);
                history.push("/login")
            } catch (e) {
                console.log(e);
            }
        }
    }
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
                <form onSubmit={handleSubmit} className="loginRight">
                    <div className="registerBox">
                        <input placeholder="Email.." required ref={email} className="loginInput" type="email"/>
                        <input placeholder="Username.." ref={username} required className="loginInput"/>
                        <input placeholder="Password.." type="password" required ref={password} className="loginInput" />
                        <input placeholder="Confirm password.." type="password" required ref={passwordAgain}  className="loginInput" type="password"/>
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegister">
                            <Link to={`/login`} style={{textDecoration: 'none',color:'inherit'}}>
                                 Log In To Account
                            </Link>
                        </button>
                    </div>
                </form>
            </div>
            </div>
    )
}

export default Register;

