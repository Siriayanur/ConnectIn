const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    
    console.log('started here')
    try {
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        //create user with details and the new password
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            
        })
        console.log(user)
        const newUser = await user.save();

        res.status(200).send(newUser);
    } catch (e) {
        res.send(e);
    }
})

router.post('/login', async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            //404 --  not found
            res.status(404).send('Username or password invalid');

        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
            //400 --wrong password
        if (!validPassword) {
            res.status(400).send('Username or password invalid');
        }
        res.status(200).send(user)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router;