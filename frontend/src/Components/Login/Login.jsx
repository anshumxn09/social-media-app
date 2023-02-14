import React, { useState } from 'react'
import './Login.css';
import { Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../Actions/User';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }
  return (
    <div className="login">
        <form className="loginForm" onSubmit={loginHandler}>
        <img src="https://freepngimg.com/save/149483-honey-vector-bumblebee-bee-free-download-png-hq/512x512" alt="" height={70} width={70} />
            <Typography variant='h3' style={{padding : "1vmax"}}>BeeSocial</Typography>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' required/>

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' required/>
            <Link to={"/forgot/password"}>
                <Typography>Forgot Password</Typography>
            </Link>
            <Button type='submit'>Login</Button>
            <Link to={"/register"}>
                <Typography>New User?</Typography>
            </Link>
        </form>
    </div>
  )
}

export default Login