const jwt = require('jsonwebtoken');

const AuthConfig = require('../Config/auth.json');

module.exports = (req, res, next) => {

    const AuthHeader = req.headers.Authorization

    if(!AuthHeader)
        return res.status(401).send({ error: 'No Token Provided'});

}