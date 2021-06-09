const express = require('express');
const router = express.Router();
const Board = require('../schemas/BoardsSchema');

//get all boards
router.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        await res.json(boards);
    } catch (err) {
        await res.json({message: err});
    }
});
//add a board
router.post('/addBoard', async (req, res) => {
    const board = new Board({
        owner: req.body.owner
    });
    try {
        const saveBoard = await board.save();
        await res.json(saveBoard);
    } catch (err) {
        await res.json({message: err});
    }
});
//add a post
router.post('/post/:boardID', async (req, res) => {
    try {
        const updatePosted = await Board.updateOne(
            {_id: req.params.boardID},
            {
                $addToSet: {
                    posts: {
                        author: req.body.author,
                        text: req.body.text,
                        position: {
                            x: 0.5,
                            y: 0.5
                        }
                    }
                }
            })
        ;
        await res.json(updatePosted);
    } catch (err) {
        await res.json({message: err});
    }
});
//delete board
router.delete('/deleteBoard/:boardID', async (req, res) => {
    try {
        const removedBoard = await Board.deleteOne({_id: req.params.boardID});
        await res.json(removedBoard);
    } catch (err) {
        await res.json({message: err});
    }
});
//add editor to board
router.put('/addEditor/:boardID', async (req, res) => {
    try {
        const updatedBoard = await Board.updateOne(
            {_id: req.params.boardID},
            {$addToSet: {editors: req.body.editors}});
        await res.json(updatedBoard);
    } catch (err) {
        await res.json({message: err});
    }
});
//remove editor from board
router.patch('/removeEditor/:boardID', async (req, res) => {
    try {
        const updatedBoard = await Board.updateOne(
            {_id: req.params.boardID},
            {$pull: {editors: req.body.editors}});
        await res.json(updatedBoard);
    } catch (err) {
        await res.json({message: err});
    }
});
//delete post from board
router.patch('/deletePost/:boardID/:postID', async (req, res) => {
    try {
        const deletePost = await Board.updateOne(
            {_id: req.params.boardID},
            {$pull: {posts: {_id: req.params.postID}}}
        );
        await res.json({deletePost});
    } catch (err) {
        await res.json({message: err})
    }
});
//update post from board
router.put('/updatePost/:boardID/:postID', async (req, res) => {
    try {
        if (req.body.text) {

            const updatedPost = await Board.findOneAndUpdate(
                {_id: req.params.boardID, "posts._id": req.params.postID},
                {$set: {"posts.$.text": req.body.text}});
        } else if (req.body.position) {
            const updatedPost = await Board.findOneAndUpdate(
                {_id: req.params.boardID, "posts._id": req.params.postID},
                {$set: {"posts.$.position": req.body.position}});
        }
        await res.json(updatedPost);
    } catch(err) {
        await res.json({message: err});
    }
});

module.exports = router;
