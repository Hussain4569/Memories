const mongoose = require("mongoose");
const Post = require("../models/postModel");


// get all posts
const getPosts = async (req, res) => {
    
    try {
        const posts = await Post.find();
        console.log("get requested");

        res.status(200).json(posts);
        res.end();

    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

//create a post
const createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new Post(post);

    try {
        await newPost.save();

        console.log("post requested");
        res.status(201).json(newPost)
        return;
        
    } catch (error) {
        res.status(409).json({error: error.message});
    }
}

//update post
const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    //if (mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID");

    const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true});
    console.log("patch requested");
    res.json(updatedPost);
}

//delete post
const deletePost = async (req, res) => {
    const {id} = req.params;

    await Post.findByIdAndRemove(id);

    console.log("delete requested");
    res.json("post deleted successfully");

}

//like post
const likePost = async (req, res) => {
    const {id} = req.params;

    if (!req.userId) {
        return res.json({message: "Unauthenticated."});
    }

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id == String(req.userId));

    if (index == -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true});

    console.log("like count update");
    res.json(updatedPost);
}

module.exports = {getPosts, createPosts, updatePost, deletePost, likePost};