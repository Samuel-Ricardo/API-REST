const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require ('../models/User');

const router = express.Router();

router.post('/register', async(req, res) => {

    const { email } = req.body;

    try {

        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'User Already Exists'})
        }

        const user = await User.create(req.body);
    

        user.password = undefined;

        return res.send({ user })

    } catch(err){
        return res.status(400).send({error: 'Registration_failed '+err})
    }
})

router.post('/authenticate', async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(400).send({ error: 'User Not Found'});
    }

    if(! await bcryptjs.compare(password, user.password)){
        return res.status(400).send({error: 'Invalid Password'})
    }

    user.password = undefined


    
    res.send({ user })
    
})

module.exports = app => app.use('/auth', router);