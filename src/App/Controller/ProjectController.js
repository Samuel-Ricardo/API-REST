const Express = require('express');

const authMiddleware = require('../Middlewares/Auth');
const Project = require('../Models/Project')

const Router = Express.Router();


Router.use(authMiddleware)

Router.get('/', async (req, res) => {

    try {
        
        const projects =  await Project.find()
    

         res.status(200).send({ projects })

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on find projects: "+err})
    }
})

Router.post('/create', async (req, res) =>{
   
    try {
        
        const project = await Project.create({... req.body, user: req.userId})

          res.status(200).send({project})

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on create a project: "+err})
    }
})

module.exports = app => app.use('/project', Router)