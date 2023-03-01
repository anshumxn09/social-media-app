import { Button, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/User';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const {error, message, loading} = useSelector(state => state.likeReducer);
    const alert = useAlert();
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
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
    <div className="forgotPassword">
        <form className="forgotPasswordForm" onSubmit={loginHandler}>
            <Typography variant='h3' style={{padding : "1vmax"}}>Forgot Password?</Typography>
            <input type="email" className='forgotPasswordInputs' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' required/>

            <Button disabled={loading} type='submit'>Send Request</Button>
        </form>
    </div>
  )
}

export default ForgotPassword;