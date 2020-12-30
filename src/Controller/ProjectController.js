const Express = require('express');

const Router = Express.Router();

Router.get('/', (req, res) => {

    res.send({ ok: true })
})

module.exports = app => app.use('/project', Router)