import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts, logoutUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { useAlert } from "react-alert";
import './Account.css';
import { Link } from 'react-router-dom';
import User from '../User/User';

const Account = () => {
    const [followerToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const alert = useAlert();

    const dispatch = useDispatch();
    const {user, loading : userloading} = useSelector(state => state.user);
    const {error, loading, myposts} = useSelector(state => state.myPostReducer);
    const {message, error : errors} = useSelector(state => state.likeReducer);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        alert.success("Logged out successfully!!")
    }

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
                        key={post._id} postImage={post.image.url}
                        postId={post._id}
                        caption={post.caption}
                        likes = {post.likes}
                        comments={post.comments}
                        ownerImage={post.owner.avatar.url}
                        ownerName={post.owner.name}
                        ownerId={post.owner._id}
                        isAccount={true}>
                    </Post>
            )) : <Typography variant='h6'>No Posts Yet</Typography>
            }
        </div>
        <div className="accountright">
            <Avatar src={user.avatar.url} sx={{height : "8vmax", width : "8vmax"}}></Avatar>
            <Typography variant='h5'>{user.name}</Typography>

            <div>
                <button onClick={() => setFollowersToggle(true)}>
                    <Typography>
                        Followers
                    </Typography>
                    <Typography>
                        {user.followers.length}
                    </Typography>
                </button>
            </div>

            <div>
                <button onClick={() => setFollowingToggle(true)}>
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

            <Button variant='contained' onClick={handleLogout}>Logout</Button>

            <Link to="/update/profile">Edit Profile</Link>
            <Link to="/update/password">Update Password</Link>

            <Button variant='text' style={{ background : "red" ,color : "white", margin : "2vmax"}}>Delete My Profile</Button>

            <Dialog open={followerToggle} onClose={() => setFollowersToggle(false)}>
            <div className="DialogBox">
                <Typography variant="h4">Followers</Typography>
                {
                    user && user.followers.length > 0 ? user.followers.map((elem) => (
                        <User
                        key={elem._id}
                        userId={elem._id}
                        name={elem.name}
                        avatar={"https://avatars.githubusercontent.com/u/25058652?v=4"}
                        ></User>
                    )) : "No followers yet"
                }
            </div>
        </Dialog>

        <Dialog open={followingToggle} onClose={() => setFollowingToggle(false)}>
            <div className="DialogBox">
                <Typography variant="h4">Followings</Typography>
                {
                    user && user.following.length > 0 ? user.following.map((elem) => (
                        <User
                        key={elem._id}
                        userId={elem._id}
                        name={elem.name}
                        avatar={"https://avatars.githubusercontent.com/u/25058652?v=4"}
                        ></User>
                    )) : "No following yet"
                }
            </div>
        </Dialog>
        </div>
    </div>
  )
}

export default Account;