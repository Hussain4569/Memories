import { createContext, useReducer } from "react";
import {SET_POSTS, ADD_POST, UPDATE_POST, LIKE_POST, DELETE_POST} from "../constants/actionTypes";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {posts: action.payload};
        case ADD_POST:
            return {posts: [action.payload, ...state.posts]}
        case UPDATE_POST:
        case LIKE_POST:
            return {posts: state.posts.map(p => p._id === action.payload._id ? action.payload : p)}
        case DELETE_POST: 
            return {posts: state.posts.filter((p) => p._id !== action.payload)}
        default:
            return state;
    }
}

export const Provider = ({children}) => {

    const [state, dispatch] = useReducer(postsReducer, {posts : []});
    // const [postsData, setPostsData] = useState([]);

    //Action creators
    // const setPosts = (posts) => dispatch({type: "SET_POSTS", payload: posts});
    // const addPost = (post) => dispatch({type: "ADD_POST", payload: post});
    // const updatePost = (post) => dispatch({type: "UPDATE_POST", payload: post});
    // const deletePost = (post) => dispatch({type: "DELETE_POST", payload: post});

    return (
        <PostsContext.Provider value={{...state, dispatch}}>
            {children}
        </PostsContext.Provider>
    )
}

// setPosts, addPost, updatePost

// [{
//     "tags": [],
//     "likeCount": 0,
//     "_id": "62e0e949e734761c719779bf",
//     "title": "dummy title",
//     "message": "dummy message for testing",
//     "creator": "hussain"
// }]