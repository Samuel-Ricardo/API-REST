const Express = require('express');

const authMiddleware = require('../../Middlewares/Auth');

const Router = Express.Router();

Router.use(authMiddleware)

Router.get('/', (req, res) => {

    res.send({ ok: true, user: req.userId })
})

module.exports = app => app.use('/project', Router)