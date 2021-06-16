const express = require('express');
const Conversation = require('../models/conversation');
const router = express.Router();

router.post('/', async (req, res) =>
{
    try
    {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        
        });
        const savedConversation = await newConversation.save();
        res.status(200).send(savedConversation);
    
    } catch (e)
    {
        res.status(500).send(e);
    }
})

router.get('/:userId', async (req, res) =>
{
    try
    {
        const userConversations = await Conversation.find({
            members:  {$in : [req.params.userId]}
        });
        console.log(userConversations);
        res.status(200).send(userConversations);
    } catch (e)
    {
        res.status(500).send(e);
    }
})

//get conversation between 2 people
router.get('/find/:firstUserId/:secondUserId', async (req, res) =>
{
    try
    {
        const conversation = await Conversation.findOne({
           members : {$all : [req.params.firstUserId,req.params.secondUserId]},
        })
        res.status(200).send(conversation);
    } catch (e)
    {
        res.status(500).send(e);
    }
})

module.exports = router;