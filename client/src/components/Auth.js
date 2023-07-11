import React, {useState} from 'react'
import Input from "./FormInputs/Input";
import PasswordField from './FormInputs/PasswordField';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {GoogleLogin, googlelogout} from "@react-oauth/google";
import { useNavigate } from 'react-router-dom'; 

import createOrGetUser from '../utils/createOrGetUser';
import useUserContext from '../hooks/useUserContext';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};

const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const {dispatch} = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const name = formData.firstName + " " + formData.lastName;

    if (isSignUp) {
      //fetch data from backend ---- POST
      
      const res = await fetch("/user/signup", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
  
      const json = await res.json();
      console.log(json);

      dispatch({type: "SIGN_UP", payload: formData});

      navigate("/");
    } else {
      //fetch data from backend ---- GET

      const res = await fetch("/user/signin", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
  
      const json = await res.json();
      console.log(json);
      dispatch({type: "SIGN_IN", payload: name});
      navigate("/");
      
      
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const switchMode = () => {
    setIsSignUp(prev => !prev);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const user = await createOrGetUser(res);
    dispatch({type: "AUTH", payload: user});
    navigate("/");
  }
  const googleFailure = (error) => {
    console.log("Google sign in was unsuccessfull. Try again later.", error)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className='paper' elevation={3} 
      sx={{display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'}}>
        <Avatar className='avatar' sx={{margin: '10px', backgroundColor: '#EE6983'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : "Sign In"}</Typography>

        <form className='form' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <div className='name-input'>
                <Input name='firstName' label='First Name' onChange={handleChange} autoFocus half />
                <Input name='lastName' label='Last Name' onChange={handleChange} half />
              </div>
            )}
            <Input name="email" label='Email Address' onChange={handleChange} type="email" />
            <PasswordField name="password" label="Password" onChange={handleChange} />
            
            {isSignUp && <PasswordField name="confirmPassword" label="Confirm Password" onChange={handleChange} />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className='submit' sx={{margin: '10px'}}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            width="375px"
          />
          <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode} fullWidth variant='outlined'>
                  {isSignUp ? 'Already have and account? Sign In': "Don't have an account? Sign Up"}
                </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;



