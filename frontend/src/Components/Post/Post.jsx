import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, deletePost, likePost, updateCaption} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, getUserPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  userId,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const {message} = useSelector(state => state.likeReducer);

    const [liked, setLiked] = useState(false);
    const [userBox, setUserBox] = useState(false);

    const [commentBox, setCommentBox] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const [captionBox, setcaptionBox] = useState(false);
    const [captionValue, setcaptionValue] = useState(caption);

    const handleLike = async () => {
        await dispatch(likePost(postId));
        if(!isAccount){
            await dispatch(getFollowingPosts());
            dispatch(getUserPosts(userId));
        }else dispatch(getMyPosts());
        setLiked(!liked);
    } 

    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(commentPost(postId, commentValue));
        if(!isAccount){
            await dispatch(getFollowingPosts());
            dispatch(getUserPosts(userId));
        }else dispatch(getMyPosts());

        setLiked(!liked);
    }   

    const updateCaptionHandler = () => {
        dispatch(updateCaption(postId, captionValue));
        dispatch(getUserPosts(userId));
        dispatch(getMyPosts());
    }

    const deletePostHandler = async () => {
        if(window.confirm("Are you sure to delete this post")){
            await dispatch(deletePost(postId));
            dispatch(getMyPosts());
            dispatch(loadUser());
        }
    }

    useEffect(() => {
        likes.map((item) => {
            if(item._id === user._id){
                setLiked(true);
            }
        })
    }, [liked, message])

  return (
    <div className="post">
        <div className="postHeader">
            {isAccount && <Button onClick={() => setcaptionBox(true)}>
                <MoreVert/>
            </Button>}
        </div>
        <img src={postImage} alt="Post" />
        <div className="postDetails">
            <Avatar src={ownerImage} alt="User" sx={{
                height : "3vmax",
                weight : "3vmax"
            }} />

            <Link to={`/user/${ownerId}`}>
                <Typography fontWeight={700}>{ownerName}</Typography>
            </Link>
        </div>
        <Typography 
                fontWeight={100}
                color="rgba(0, 0, 0, 0.582)"
                style={{alignSelf : "center", margin : "0 1vmax 0 2vmax"}}
            >{caption}</Typography>
        <button style={{
            border : "none",
            backgroundColor : "white",
            cursor : "pointer",
            margin : "10px 1vmax 0 2vmax"
        }}
        onClick={() => setUserBox(!userBox)}
        disabled={likes.length ==0 ? true : false}
        >
        <Typography>{likes.length} Likes</Typography>
        </button>

        <div className="postFooter">
            <Button onClick={handleLike}>
                {liked ? <Favorite style={{color : "red"}}/> : <FavoriteBorder/>}
            </Button>
            <Button onClick={() => setCommentBox(!commentBox)}><ChatBubbleOutline/></Button>
            {
                isAccount && (<Button onClick={deletePostHandler}><DeleteOutline/></Button>)
            }
        </div>
        <Dialog open={userBox} onClose={() => setUserBox(!userBox)}>
            <div className="DialogBox">
                <Typography variant="h4">Liked By</Typography>
                {
                    likes.map((elem) => (
                        <User 
                        key={elem._id}
                        userId={elem._id}
                        name={elem.name}
                        avatar={"https://avatars.githubusercontent.com/u/25058652?v=4"}
                        ></User>
                    ))
                }
            </div>
        </Dialog>
        <Dialog open={commentBox} onClose={() => setCommentBox(!commentBox)}>
            <div className="DialogBox">
                <Typography variant="h4">Comments</Typography>

                <form className="commentForm" onSubmit={addCommentHandler}>
                    <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Comment here..."/>
                    <Button type="submit" variant="contained" >ADD</Button>
                </form>
                {
                        comments.length > 0 ? comments.map((elem) => (
                            <CommentCard 
                                key={elem._id}
                                acc={userId}
                                userId={elem.user._id} 
                                name={elem.user.name}
                                avatar={elem.user.avatar.url}
                                comment={elem.comment}
                                commentId={elem._id}
                                postId={postId}
                                isAccount = {elem.user._id === user._id ? true : false}
                            />
                        )) : <Typography variant="h5">"No comments yet"</Typography>
                    }
            </div>
        </Dialog>
        <Dialog open={captionBox} onClose={() => setcaptionBox(!captionBox)}>
            <div className="DialogBox">
                <Typography variant="h4">Edit caption</Typography>
                <form className="commentForm" onSubmit={updateCaptionHandler}>
                    <input type="text" value={captionValue} onChange={(e) => setcaptionValue(e.target.value)} placeholder="Edit your caption here..."/>
                    <Button type="submit" variant="contained" >Edit</Button>
                </form>
            </div>
        </Dialog>
    </div>
  );
};

export default Post;
