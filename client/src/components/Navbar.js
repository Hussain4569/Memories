import React, {useState, useEffect} from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';

import memories from "../images/memories.png";

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    console.log("user in local storage", JSON.parse(localStorage.getItem("profile")))
    const {dispatch} = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    // const user = state;
    console.log("user in navbar", user);

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location])

    const logout = () => {
        dispatch({type: "LOGOUT"});
        navigate("/");
        setUser(null);
    }

  return (
    <AppBar position="static" color="inherit" 
    sx={{borderRadius: 5,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'}}
        > 

        <div className='brand-container'>
            <Typography component={Link} to="/" className="heading" variant="h2" align="center">Memories</Typography>
            <img className="image" src={memories} alt="memories" height="60" />
        </div>

        <Toolbar className='toolbar'>
            {user ? (
                <div className='profile'>
                    <Avatar 
                        alt={user.name}
                        src={user.picture}>
                        {user.name}</Avatar>
                    <Typography className='user-name' variant='h6'>{user.name}</Typography>
                    <Button variant='contained' color='secondary' className='logout' onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant='contained' color='primary'>Sign in</Button>
            )}
        </Toolbar>
      
    </AppBar>
  )
}

export default Navbar