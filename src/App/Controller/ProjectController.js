const Express = require('express');

const authMiddleware = require('../Middlewares/Auth');
const Project = require('../Models/Project')

const Router = Express.Router();


Router.use(authMiddleware)

Router.get('/', (req, res) => {

    res.send({ ok: true, user: req.userId })
})

Router.post('/create', (req, res) =>{
    const
})

module.exports = app => app.use('/project', Router)