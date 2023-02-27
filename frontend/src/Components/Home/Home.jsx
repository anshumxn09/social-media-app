import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFollowingPosts } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import User from '../User/User';
import "./Home.css";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {message, error : errors} = useSelector(state => state.likeReducer);
  const {loading, posts, error} = useSelector(state => state.postOffFollowingReducer);
  const {users, loading : userLoading} = useSelector(state => state.allUserReducer);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch])

  useEffect(() => {
    if(errors){
        alert.success(errors);
        dispatch({type : "clearError"});
    }
    if(message){
        alert.success(message);
        dispatch({type : "clearMessage"});
    }
}, [dispatch, message, error, alert, errors])

  return (
    loading || userLoading ? <Loader/> : (
      <div className="home">
        <div className="homeleft">
          {
            posts && posts.length > 0 ? posts.map((post,) => (
              <Post key={post._id} postImage={"https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-72958514/72958514.jpg"}

            postId={post._id}
            caption={post.caption}
            likes = {post.likes}
            comments={post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
          />
            )) : <Typography variant='h6'>No Posts Yet</Typography>
          }
        </div>
        <div className="homeright">
        {
          users && users.length > 0 ?  (
            users.map((elem) => (
              <User 
              key={elem._id}
              userId={elem._id}
              name={elem.name}
              avatar={"https://avatars.githubusercontent.com/u/25058652?v=4"}
            ></User>
            ))
          ) : <Typography variant='h3'>No User Available</Typography>
        }
        </div>
    </div>
    )
  )
}

export default Home;