import { Button, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import './CommentCard.css';
import {Delete} from "@mui/icons-material";
import { useSelector } from 'react-redux';
const CommentCard = ({
    userId, name, avatar, comment, commentId, postId, isAccount
}) => {
    const {user} = useSelector(state => state.user);
  return (
    <div className="commentUser">
        <Link to={`/user/${userId}`}>
            <img src={"https://i.pinimg.com/736x/0f/21/7d/0f217d0189f841ae794500966ab1845a.jpg"} alt={name}/>
            <Typography style={{minWidth : "6vmax"}}>{name}</Typography>
        </Link>
        <Typography>{comment}</Typography>
            {
                isAccount ? 
                <Button>
                    <Delete/>
                </Button> : userId === user._id && <Button>
                    <Delete/>
                </Button> 
            }
    </div>
  )
}

export default CommentCard;