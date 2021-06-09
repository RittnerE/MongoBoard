const express = require('express');
const router = express.Router();
const User = require('../schemas/UsersSchema');

//get all users
router.get('/', async  (req, res) => {
    try {
        const users = await User.find();
        await res.json(users);
    }
     catch(err) {
        await res.json({message: err});
    }
});

//add user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name
    });

    try {
        const savedUser = await user.save();
        await res.json(savedUser);
    } catch(err) {
        await res.json({message: err});
    }
});

//get user by ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        await res.json(user);
    } catch(err) {
        await res.json({message: err});
    }
});

//delete user
router.delete('/deleteUser/:userId', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({_id: req.params.userId});
        await res.json(removedUser);
    } catch(err) {
        await res.json({message: err});
    }
});

//update user
router.put('/updateUser/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {name: req.body.name}});
        await res.json(updatedUser);
    } catch(err) {
        await res.json({message: err});
    }
});

module.exports = router;
