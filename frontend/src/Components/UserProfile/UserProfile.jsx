import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollow, getUserDetails, getUserPosts, loadUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import User from '../User/User';

const UserProfile = () => {
    const {id} = useParams();

    const [followerToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [userFollowing, setUserFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const {posts, loading : postLoading} = useSelector(state => state.userPostReducer);
    const {users : user, loading : userLoading, error : userDetailsError} = useSelector(state => state.userDetailsReducer);
    const {user : actualUser} =  useSelector(state => state.user);
    const {message, error : errors, loading } = useSelector(state => state.likeReducer);

    const alert = useAlert();
    const dispatch = useDispatch();

    const followHandler = async () => {
        setUserFollowing(!userFollowing);
        await dispatch(followUnfollow(id));
        await dispatch(getUserDetails(id))
        dispatch(loadUser());
    }

    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPosts(id));
        if(actualUser._id === id){
            setMyProfile(true)
        }
    }, [dispatch, id, actualUser._id])

    useEffect(() => {
        if(user){
            user.followers.forEach(element => {
                if(element._id === actualUser._id){
                    setUserFollowing(true)
                }else setUserFollowing(false)
            });
        }
    }, [user, actualUser._id])
    useEffect(() => {
        if(errors){
            alert.error(errors);
            dispatch({type : "clearError"});
        }
        if(userDetailsError){
            alert.error(userDetailsError);
            dispatch({type : "clearError"});
        }
        if(message){
            alert.success(message);
            dispatch({type : "clearMessage"});
        }
        
    }, [dispatch, message, alert, errors, userDetailsError])

  return postLoading || userLoading || !user ? <Loader/> : (
    <div className="account">
        <div className="accountleft">
            {
                posts && posts.length > 0 ? posts.map((post) => (
                    <Post 
                        key={post._id} postImage={post.image.url}
                        postId={post._id}
                        caption={post.caption}
                        likes = {post.likes}
                        comments={post.comments}
                        ownerImage={post.owner.avatar.url}
                        ownerName={post.owner.name}
                        ownerId={post.owner._id}
                        userId={user._id}
                        >
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

            {
                !myProfile && <Button variant='contained' disabled={loading} onClick={followHandler}>
                    {userFollowing ? "Unfollow" : "Follow"}
                </Button>
            }

            <Dialog open={followerToggle} onClose={() => setFollowersToggle(false)}>
            <div className="DialogBox">
                <Typography variant="h4">Followers</Typography>
                {
                    user && user.followers.length > 0 ? user.followers.map((elem) => (
                        <User
                        key={elem._id}
                        userId={elem._id}
                        name={elem.name}
                        avatar={elem.avatar.url}
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
                        avatar={elem.avatar.url}
                        ></User>
                    )) : "No following yet"
                }
            </div>
        </Dialog>
        </div>
    </div>
  )
}

export default UserProfile;