const express = require('express');
const router = express.Router();
const bcrpyt = require('bcrypt');
const User = require('../models/user');
const { findOne, findById } = require('../models/user');
/**
 * Update user profile
 * Delete user profile
 * Follow user
 * Unfollow user
 * Find a User
 * 
 * 
 */
//Update the user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrpyt.genSalt(10);
                req.body.password = await bcrpyt.hash(req.body.password,salt);
            } catch (e) {
                return res.status(500).send(e);
            }
            
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body
            })
            res.status(200).send('Your account is updated successfully')
        } catch (e) {
            return res.status(500).send(e);
        }

    } else {
        return res.status(403).send('Sorry! You cannot update others profile')
    }
})

//delete the user account
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send('Account deleted successfully')
        } catch (e) {
            return res.status(500).send(e)
        }
    } else {
        res.status(403).send('You can delete only your account')
    }
})


//Get user 
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId ) : await User.findOne({username : username});
        const { password, updatedAt, ...other } = user._doc; //_doc contains the entire properties of the object

        res.status(200).send(other);
    } catch (e) {
        res.status(500).send(e);
    }
})


//get my Friends
router.get('/friends/:id', async (req, res) =>
{
    try
    {
        const user = await User.findById(req.params.id)
        const friends = await Promise.all(
            user.following.map((friendId) =>
            {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map(friend =>
        {
            const { _id, username, profilePicture } = friend
            friendList.push({ _id, username, profilePicture });
        })
        res.status(200).send(friendList)
    } catch (e)
    {
        res.send(e);
    }
})

//follow  a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            //A user can only follow other user if he is not
            //already following him so we ensure that here
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({  $push: { followers: req.body.userId } });
                await currentUser.updateOne({  $push: { following: req.params.id } })
                res.status(200).send('user following updated')
            } else {
                res.status(403).send('You are already following the user')
            }
            
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        res.status(403).send('You cannot follow yourself')
    }
    
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            //A user can only unfollow other user if he is 
            //already following him so we ensure that here
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({  $pull: { followers: req.body.userId } });
                await currentUser.updateOne({  $pull: { following: req.params.id } })
                res.status(200).send('You are now unfollowing')
            } else {
                res.status(403).send('You have not followed the user')
            }
            
        } catch (e) {
            res.status(500).send(e)
        }
    } else {
        res.status(403).send('You cannot unfollow yourself')
    }
    
})

module.exports = router;