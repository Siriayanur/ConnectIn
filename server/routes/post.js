const express = require('express')
const router = express.Router();
const Post = require('../models/post.js');
const User = require('../models/user.js');
/*
    GET POST
    create post
    get post
    delete post
    get timeline posts (fetch posts from following array)
    like a post

Here the :id is the POST id
*/

router.post('/', async(req, res) => {
    const post = new Post(req.body);
    try {
        const newPost = await post.save();
        res.status(200).send(newPost);
    } catch (e) {
        res.status(500).send(e);
        
    }
})

//update post
router.put('/:id', async (req,res) => {
    const post = await Post.findById(req.params.id);

    try {

        //If the associated userId of the post(post.userId) is != userId provided,
        //then restrict the operation
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).send('Post updated successfully')
            
        }
        //Else user has the permission to update the post 
        else {
            return res.status(404).send('Dont have permission to modify the post')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})


//delete post
router.delete('/:id', async (req,res) => {
    const post = await Post.findById(req.params.id);

    try {

        //If the associated userId of the post(post.userId) is != userId provided,
        //then restrict the operation
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).send('Post deleted successfully')
            
        }
        //Else user has the permission to update the post 
        else {
            return res.status(404).send('You have permission to only modify your post')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

// like and dislike post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).send('Post liked successfully')
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).send('Post disliked successfully')
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//get post
router.get('/:id', async (req, res) => {
    console.log('Succes')
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).send(post)
    }
    catch (e) {
        res.send(e);
    }
})

//get timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        //Fetch the current user
        const currentUser = await User.findById(req.params.userId);

        //Fetch the current user's posts
        const currentUserPosts = await Post.find({ userId: currentUser._id });

        //Fetch all thePosts of the users that the current User is following
        const followingPosts = await Promise.all(
            currentUser.following.map((followingId) => {
                return Post.find({userId : followingId})
            })
        )
        res.status(200).send(currentUserPosts.concat(...followingPosts))
        /**
         * Since each of the Post.find({userId : followingId}) is going to take time --> await 
         * so we use Promise to await for multiple results
         * 
         */
    } catch (e) {
        res.status(500).send(e);
    }
    
})

//Get only my posts
router.get('/profile/:username', async (req, res) => {
    try {
        //Only works with findOne and not find()
        const user = await User.findOne({ username: req.params.username })
        console.log(user);
        const posts = await Post.find({ userId: user._id });
        
        res.status(200).send(posts);
    } catch (e) {
        res.send(e);
    }
})

module.exports = router;