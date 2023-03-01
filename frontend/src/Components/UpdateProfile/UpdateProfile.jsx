import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser, updateProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';
import './UpdateProfile.css';

const UpdateProfile = () => {
    const {loading, error, user} = useSelector(state => state.user);
    const {
        loading : updateLoading,
        error : updateError,
        message
    } =  useSelector(state => state.likeReducer);

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        
        Reader.onload = () => {
            if(Reader.readyState === 2){
                setAvatarPrev(Reader.result)
                setAvatar(Reader.result);
            }
        }

        Reader.readAsDataURL(file);
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type : "clearError"})
        }

        if(updateError){
            alert.error(updateError);
            dispatch({type : "clearError"})
        }

        if(message){
            alert.success(message);
            dispatch({type : "clearMessage"})
        }

    }, [error, alert, dispatch, updateError, updateLoading, message]);

  return loading ? <Loader/> : (
    <div className="updateProfile">
        <form className="updateProfileForm" onSubmit={registerHandler}>
            <img src="https://freepngimg.com/save/149483-honey-vector-bumblebee-bee-free-download-png-hq/512x512" alt="" height={70} width={70} />
            
            <Avatar src={avatarPrev} alt="user" style={{
                height : "6vmax",
                width : "6vmax"
            }}/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="updateProfileInputs" placeholder='enter your name' required/>

            <input type="email" className="updateProfileInputs"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' required/>

            <input type="file" accept='image/*' onChange={handleImageChange}/>
            
            <Button type='submit' disabled={updateLoading}>Update Profile</Button>

        </form>
    </div>
  )
}

export default UpdateProfile;