const jwt = require('jsonwebtoken');

const AuthConfig = require('../Config/auth.json');

module.exports = (req, res, next) => {

    const authHeader = req.headers.Authorization

    if(!authHeader)
        return res.status(401).send({ error: 'No Token Provided'});


    const parts = authHeader.split(" ")

    if(! parts.length === 2)
        return res.status(401).send({ error: 'Token Error'});

    const [ scheme, token] = parts

    if(! /^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token Mal Formatado'});

    jwt.verify(token, AuthConfig.secret, (err, decoded) => {

        if(err) return res.status(401).send({ error: 'Token Invalid: '+err});

        req.userId = decoded.id;

        return next();
    })
}