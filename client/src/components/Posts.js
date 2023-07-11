import Post from "./Post";
import { CircularProgress, Grid } from "@mui/material";

import usePostsContext from '../hooks/usePostsContext';


const Posts = ({ setCurrentId }) => {

  const {posts} = usePostsContext();
  // console.log(posts);
  

  return (
          !posts.length ? <CircularProgress /> : (
            <Grid className="main-container" container alignItems="stretch" spacing={3}>
            {posts.map(post => 
              (<Grid key={post._id} item xs={12} sm={6}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>) )}
            </Grid>
          )
          
        )
}

export default Posts