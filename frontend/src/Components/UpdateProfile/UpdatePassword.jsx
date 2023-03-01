import React, { useState, useEffect } from 'react'
import './UpdatePassword.css';
import { Typography, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { loadUser, updatePassword } from '../../Actions/User';
import { useAlert } from 'react-alert';

const UpdatePassword = () => {
    const {loading, message, error} = useSelector(state => state.likeReducer);
    const alert = useAlert();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword));
        dispatch(loadUser());
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

    }, [error, alert, dispatch, message]);
  return (
    <div className="updatePassword">
        <form className="updatePasswordForm" onSubmit={loginHandler}>
        <img src="https://freepngimg.com/save/149483-honey-vector-bumblebee-bee-free-download-png-hq/512x512" alt="" height={70} width={70} />
            <Typography variant='h3' style={{padding : "1vmax"}}>Update Password</Typography>
            <input className='updatePasswordInputs' type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Old password' required/>

            <input type="password" className='updatePasswordInputs' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' required/>
            <Button type='submit' disabled={loading}>Update Password</Button>
        </form>
    </div>
  )
}

export default UpdatePassword;