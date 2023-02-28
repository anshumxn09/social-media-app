import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newPost } from '../../Actions/Post';
import { getMyPosts, loadUser } from '../../Actions/User';
import './NewPost.css';

const NewPost = () => {
    const  [image, setImage] = useState(null);
    const  [caption, setCaption] = useState("");
    const {loading, error, message} = useSelector(state => state.likeReducer);
    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.onload = () => {
            if(Reader.readyState === 2){
                setImage(Reader.result);
            }
        }
        Reader.readAsDataURL(file);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(newPost(caption, image));
        dispatch(loadUser());
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type : "clearError"});
        }

        if(message){
            alert.success(message);
            dispatch({type : "clearMessage"});
        }
    }, [error, message, dispatch]);

  return (
    <div className="newPost">
        <form className="newPostForm" onSubmit={submitHandler}>
            <Typography variant="h3">New Post</Typography>

            {image && <img src={image} alt="Post" /> }

            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Caption...'/>
            <Button type='submit' disabled={loading}>Post</Button>
        </form>
    </div>
  )
}

export default NewPost;