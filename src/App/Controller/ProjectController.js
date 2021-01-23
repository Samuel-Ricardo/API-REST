const Express = require('express');

const authMiddleware = require('../Middlewares/Auth');
const Project = require('../Models/Project')

const Router = Express.Router();


Router.use(authMiddleware)

Router.get('/', (req, res) => {

    res.send({ ok: true, user: req.userId })
})

Router.post('/create', (req, res) =>{
   
    try {
        
        const project = Project.create(req.body)

          res.status(200).send({project})

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on create a project: "+err})
    }
})

module.exports = app => app.use('/project', Router)