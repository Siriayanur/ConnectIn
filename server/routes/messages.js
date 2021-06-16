const express = require('express');
const Message = require('../models/message.js');
const router = express.Router();


router.post('/', async (req, res) =>
{
    try
    {
        const newMessage = new Message({
            conversationId: req.body.conversationId,
            senderId: req.body.senderId,
            text:req.body.text
        })
        const savedMessage = await newMessage.save();
        res.status(200).send(savedMessage);
    } catch (e)
    {
        res.status(500).send(e);
    }
})

router.get('/:conversationId', async (req, res) =>
{
    try
    {
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        res.status(200).send(messages);
    } catch (e)
    {
        res.status(500).send(e);
    }
})
module.exports = router;