import React, { useState, useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import Form from "../components/Form";
import Posts from "../components/Posts";

import usePostsContext from "../hooks/usePostsContext";
import {SET_POSTS} from "../constants/actionTypes";

const Home = () => {

    const {dispatch} = usePostsContext();
    const [currentId, setCurrentId] = useState(null);
    const matches = useMediaQuery('(min-width: 750px')
    

    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch("/posts");
        const json = await response.json();

        if (response.ok) {
            dispatch({type: SET_POSTS, payload: json})
            console.log("requested", json);
        }
        }

        fetchPosts()

    }, [dispatch]);

    return (
        <Grow in>
            <Container>
            <Grid container 
                justify="space-between" 
                alignItems="stretch" 
                spacing={3}
                wrap='nowrap'
                sx={matches ? {} : {display: "flex", flexDirection: "column-reverse"}}
            >
                <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
            </Container>
        </Grow>
    )
}

export default Home