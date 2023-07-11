import React, { useEffect, useState } from 'react'
import usePostsContext from "../hooks/usePostsContext"
import { Button, Paper, TextField, Typography } from "@mui/material";

import FileBase from "react-file-base64";

import {ADD_POST, UPDATE_POST} from "../constants/actionTypes"

const Form = ({ currentId, setCurrentId }) => {

  const [postData, setPostData] = useState({ 
    creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const {posts, dispatch} = usePostsContext();
  const postToUpdate = currentId ? posts.find(p => p._id === currentId) : null;

  useEffect(() => {
    if (postToUpdate) setPostData(postToUpdate);
  }, [postToUpdate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentId) {

      const res = await fetch(`/posts/${postToUpdate._id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin" : "*", 
                  "Access-Control-Allow-Credentials" : "true" },
        body: JSON.stringify(postData)
      })

      const json = await res.json();
      console.log(json);

      dispatch({type: UPDATE_POST, payload: json});
       
    } else {

      const res = await fetch("/posts", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
      })
  
      const json = await res.json();
      console.log(json);
  
      dispatch({type: ADD_POST, payload: json});
    }
    clear();

  }

  const clear = () => {
    setCurrentId(null);

    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  }

  return (
    <Paper className='paper'>
      <form autoComplete='off' noValidate className='root form' onSubmit={handleSubmit}>
        <Typography variant='h6' sx={{fontSize: "1.5em", fontWeight: "bold", paddingTop: "5px"}}>
          {currentId ? "Editing" : "Creating"} a memory</Typography>
        <TextField 
          name='creator' 
          variant='outlined' 
          label='Creator' 
          fullWidth
          size='small'
          value={postData.creator}
          onChange={(e) => setPostData({...postData, creator: e.target.value})}
          sx={{margin: "7px"}}
           />

          <TextField 
          name='title' 
          variant='outlined' 
          label='Title' 
          fullWidth
          size='small'
          value={postData.title}
          onChange={(e) => setPostData({...postData, title: e.target.value})}
          sx={{margin: "7px"}}
           />

          <TextField 
          name='message' 
          variant='outlined' 
          label='Message' 
          fullWidth
          multiline
          maxRows={4}
          value={postData.message}
          onChange={(e) => setPostData({...postData, message: e.target.value})}
          sx={{margin: "7px"}}
           />

           
          <TextField 
          name='tags' 
          variant='outlined' 
          label='Tags' 
          fullWidth
          size='small'
          value={postData.tags}
          onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
          sx={{margin: "7px"}}
           />

          <div className='file-input'>
            <FileBase 
              type="file" 
              multiple={false} 
              onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
          </div>

          <Button 
            className='button-submit' variant='contained' color='primary' sx={{margin: "7px"}}
            size='medium' type='submit' fullWidth>Submit</Button>

          <Button 
            variant='contained' color='secondary' sx={{margin: "7px"}}
            size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form