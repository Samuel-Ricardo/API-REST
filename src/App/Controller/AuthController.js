const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const User = require ('../models/User');
const AuthConfig = require('../../Config/auth.json');
const Mailer = require('../../Modules/Mailer')

const { Router } = require('express');
const router = express.Router();

function generateToken(params = {}){

    token = jwt.sign({id: params.id}, AuthConfig.secret,{
        expiresIn: 86400
    })

    return token;
}

router.post('/register', async(req, res) => {

    const { email } = req.body;

    try {

        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'User Already Exists'})
        }

        const user = await User.create(req.body);
    

        user.password = undefined;

        return res.send({
             user,
             token: generateToken({id: user.id})
            })

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

    
    
    res.send({
         user,
         token: generateToken({id: user.id})
        })
    
})

router.post('/forgot-password', async (req, res) => {

    const { email } = req.body;

    try{

        const user = await User.findOne({ email });
        
        if(! user)
            return res.status(400).send({ error: 'User Not Found'});

            const token = crypto.randomBytes(20).toString('hex')

            const now = new Date();
            now.setHours(now.getHours() + 1);


            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now 
                }
            })

            Mailer.sendMail({

                to: email,
                from: 'samueldebarro@gmail.com',
                template: 'Auth/forgot_password',
                context: { token }

            },(error) =>{

                if(error)
                    return res.status(400).send({ Error: "Cannot Send Forgot Password Email: "+error})

                   return res.send()
            })

            console.log(token, now);

    }catch(err){
        return res.status(400).send({ error: 'Error: ' +err+" Try Agwin"})
    }

})

module.exports = app => app.use('/auth', router);