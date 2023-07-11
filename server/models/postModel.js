const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
}, {timestamps: true});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;