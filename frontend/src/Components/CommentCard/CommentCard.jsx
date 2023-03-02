import { Button, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import './CommentCard.css';
import {Delete} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../Actions/Post';
import { getFollowingPosts, getUserPosts } from '../../Actions/User';

const CommentCard = ({
    userId, name, avatar, comment, commentId, postId, isAccount, acc
}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const deleteCommentHandler = async () => {
        await dispatch(deleteComment(postId, commentId));
        if(isAccount){
            dispatch(getFollowingPosts());
            dispatch(getUserPosts(acc));
        }else console.log("Anshuman");
    }
  return (
    <div className="commentUser">
        <Link to={`/user/${userId}`}>
            <img src={avatar} alt={name}/>
            <Typography style={{minWidth : "6vmax"}}>{name}</Typography>
        </Link>
        <Typography>{comment}</Typography>
            {
                isAccount ? 
                <Button onClick={deleteCommentHandler}>
                    <Delete/>
                </Button> : userId === user._id && 
                <Button onClick={deleteCommentHandler}>
                    <Delete/>
                </Button> 
            }
    </div>
  )
}

export default CommentCard;