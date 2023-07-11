import React from 'react'

import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import moment from "moment";

import usePostsContext from "../hooks/usePostsContext";
import {LIKE_POST, DELETE_POST} from "../constants/actionTypes";

const Post = ({post, setCurrentId}) => {

  const {dispatch} = usePostsContext();

  const deletePost = async (id) => {

    const res = await fetch(`/posts/${id}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}
    });

    const json = await res.json();

    if (res.ok) dispatch({type: DELETE_POST, payload: id});
    console.log(json);
    
  }

  const likePost = async (id) => {

    const res = await fetch(`/posts/${id}/likePost`, {
      method: "PATCH",
      header: {'Content-Type': 'application/json'}
    });

    const json = await res.json();

    if (res.ok) dispatch({type: LIKE_POST, payload: json});
  }

  return (
    <Card className='card' sx={{ borderRadius: "15px"}}>

      <CardMedia className='media' image={post.selectedFile} title={post.title}  />

      <div className='overlay'>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>

      <div className='overlay2'>
        <Button style={{color: "white"}} 
          size="small" 
          onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon />
        </Button>
      </div>

      <div className='details'>
        <Typography variant='body2' color='textSecondary'>{post.tags.map(tag => `#${tag} `)}</Typography>
      </div>
      <Typography className='title' variant='h5'>{post.title}</Typography>
      <CardContent>
        <Typography variant='body1' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>

      <CardActions className='card-actions'>
        <Button size='small' color='primary' onClick={() => {likePost(post._id)}}>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size='small' color='primary' onClick={() => {deletePost(post._id)}}>
          <DeleteIcon fontSize='small' />
          Delete
        </Button>
      </CardActions>

    </Card>
  )
}

export default Post