const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    text: String,
    position: {
        x: Number,
        y: Number
    }
})


const Post = mongoose.model('Post', PostSchema);

module.exports = {Post, PostSchema};
