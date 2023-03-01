import React, { useEffect, useState } from 'react'
import './Login.css';
import { Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser } from '../../Actions/User';
import { useAlert } from 'react-alert';

const Login = () => {
    const {error, message} = useSelector(state => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type : "clearError"})
        }

        if(message){
            alert.success(message);
            dispatch({type : "clearMessage"})
        }
        
    }, [dispatch, error, alert, message])
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