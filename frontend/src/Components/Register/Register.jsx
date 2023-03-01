import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../Actions/User';
import './Register.css';

const Register = () => {
    const {loading, error} = useSelector(state => state.user);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        
        Reader.onload = () => {
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        }

        Reader.readAsDataURL(file);
    }

    const registerHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password, avatar));
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type : "clearError"})
        }
    }, [error, alert, dispatch]);

  return (
    <div className="register">
        <form className="registerForm" onSubmit={registerHandler}>
            <img src="https://freepngimg.com/save/149483-honey-vector-bumblebee-bee-free-download-png-hq/512x512" alt="" height={70} width={70} />

            <Typography variant='h3' style={{padding : "1vmax"}}>BeeSocial </Typography>
            
            <Avatar src={avatar} alt="user" style={{
                height : "6vmax",
                width : "6vmax"
            }}/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="registerInputs" placeholder='enter your name' required/>

            <input type="email" className="registerInputs"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' required/>

            <input type="password" className="registerInputs"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' required/>

            <input type="file" accept='image/*' onChange={handleImageChange}/>
            
            <Button type='submit' disabled={loading}>Register</Button>
            <Link to={"/login"}>
                <Typography>Already have an account?</Typography>
            </Link>
        </form>
    </div>
  )
}

export default Register;