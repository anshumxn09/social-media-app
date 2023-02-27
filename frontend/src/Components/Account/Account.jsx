import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { useAlert } from "react-alert";
import './Account.css';
import { Link } from 'react-router-dom';

const Account = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {user, loading : userloading} = useSelector(state => state.user);
    const {error, loading, myposts} = useSelector(state => state.myPostReducer);
    const {message, error : errors} = useSelector(state => state.likeReducer);
    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch])

    useEffect(() => {
        if(error){
            alert.success(error);
            dispatch({type : "clearError"});
        }

        if(errors){
            alert.success(errors);
            dispatch({type : "clearError"});
        }

        if(message){
            alert.success(message);
            dispatch({type : "clearMessage"});
        }
        dispatch(getMyPosts());
    }, [dispatch, message, error, alert, errors])

  return loading || userloading ? <Loader/> : (
    <div className="account">
        <div className="accountleft">
            {
                myposts && myposts.length > 0 ? myposts.map((post) => (
                    <Post 
                        key={post._id} postImage={"https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-72958514/72958514.jpg"}
                        postId={post._id}
                        caption={post.caption}
                        likes = {post.likes}
                        comments={post.comments}
                        ownerImage={post.owner.avatar.url}
                        ownerName={post.owner.name}
                        ownerId={post.owner._id}>
                    </Post>
            )) : <Typography variant='h6'>No Posts Yet</Typography>
            }
        </div>
        <div className="accountright">
            <Avatar src={user.avatar.url} sx={{height : "8vmax", width : "8vmax"}}></Avatar>
            <Typography variant='h5'>{user.name}</Typography>

            <div>
                <button>
                    <Typography>
                        followers
                    </Typography>
                    <Typography>
                        {user.followers.length}
                    </Typography>
                </button>
            </div>

            <div>
                <button>
                    <Typography>
                        Following
                    </Typography>
                    <Typography>
                        {user.following.length}
                    </Typography>
                </button>
            </div>

            <div>
                <button>
                    <Typography>
                        Post
                    </Typography>
                    <Typography>
                        {user.post.length}
                    </Typography>
                </button>
            </div>

            <Button variant='contained'>Logout</Button>

            <Link to="/update/profile">Edit Profile</Link>
            <Link to="/update/password">Update Password</Link>

            <Button variant='text' style={{ background : "red" ,color : "white", margin : "2vmax"}}>Delete My Profile</Button>
        </div>
    </div>
  )
}

export default Account;