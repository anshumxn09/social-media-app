import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts, getUserPosts } from '../../Actions/User';
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
    const {posts, loading : proLoading} = useSelector(state => state.userPostReducer);
    const alert = useAlert();
    const dispatch = useDispatch();

    const {user, loading : userloading, error : loginError} = useSelector(state => state.user);
    const {error, loading, myposts} = useSelector(state => state.myPostReducer);
    const {message, error : errors} = useSelector(state => state.likeReducer);

    const followHandler = () => {
        setUserFollowing(!userFollowing);
    }

    useEffect(() => {
        dispatch(getUserPosts(id));
        console.log(posts);
        if(user._id === id){
            setMyProfile(true)
        }
    }, [])

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch({type : "clearError"});
        }

        if(loginError){
            alert.error(loginError);
            dispatch({type : "clearError"});
        }

        if(errors){
            alert.error(errors);
            dispatch({type : "clearError"});
        }

        if(message){
            alert.success(message);
            dispatch({type : "clearMessage"});
        }
        
        dispatch(getMyPosts());
    }, [dispatch, message, error, alert, errors])

  return loading || proLoading || userloading? <Loader/> : (
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
                        isAccount={true}>
                    </Post>
            )) : <Typography variant='h6'>No Posts Yet</Typography>
            }
        </div>
        <div className="accountright">
            <Avatar src={""} sx={{height : "8vmax", width : "8vmax"}}></Avatar>
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
                !myProfile && <Button variant='contained' onClick={followHandler}>
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

export default UserProfile;