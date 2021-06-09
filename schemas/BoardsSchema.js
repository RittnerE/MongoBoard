const mongoose = require('mongoose');
const { PostSchema} = require('./PostSchema');

const BoardSchema = new mongoose.Schema({
    owner: String,
    editors: String,
    posts: [PostSchema]
})


const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
