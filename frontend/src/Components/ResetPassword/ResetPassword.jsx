import React, { useState, useEffect } from 'react'
import './ResetPassword.css'
import { Typography, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import { resetPassword } from '../../Actions/User';
import { useNavigate, useParams } from 'react-router-dom';
const ResetPassword = () => {
    const navigator = useNavigate();
    const {error, message, loading} = useSelector(state => state.likeReducer);
    const {token} = useParams();
    const alert = useAlert();
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();

    const loginHandler = async (e) => {
        e.preventDefault();
        await dispatch(resetPassword(newPassword, token));
        navigator("/login");
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
    <div className="resetPassword">
        <form className="resetPasswordForm" onSubmit={loginHandler}>
            <img src="https://freepngimg.com/save/149483-honey-vector-bumblebee-bee-free-download-png-hq/512x512" alt="" height={70} width={70} />

            <Typography variant='h6' style={{padding : "1vmax"}}> Change Password</Typography>

            <input type="password" className='resetPasswordInputs' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' required/>
            <Button disabled={loading} type='submit'>Set Password</Button>
        </form>
    </div>
  )
}

export default ResetPassword;