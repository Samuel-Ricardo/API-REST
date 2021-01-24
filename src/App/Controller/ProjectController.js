const Express = require('express');

const authMiddleware = require('../Middlewares/Auth');
const Project = require('../Models/Project')
const Task = require('../Models/Task')

const Router = Express.Router();


Router.use(authMiddleware)

Router.get('/', async (req, res) => {

    try {
        
        const projects =  await Project.find().populate(['tasks', 'user'])
    

         res.status(200).send({ projects })

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on find projects: "+err})
    }
})

Router.get('/:projectId', async (req, res) => {

    try {
        
        const projects =  await Project.findById(req.params.projectId).populate(['user', 'tasks'])
    

         res.status(200).send({ projects })

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on find project: "+err})
    }
})

Router.delete('/:projectId', async (req, res) => {

    try {
        
         await Project.findByIdAndDelete(req.params.projectId)
    

         res.status(200).send({ deleted: true })

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on delete projects: "+err})
    }
})

Router.post('/create', async (req, res) =>{
   
    try {

        const { title, description, tasks } = req.body
        
        const project = await Project.create(
            {
                title,
                description,
                user: req.userId
            })

            await Promise.all(tasks.map(async task => {

                const projectTask = new Task({... task, project: project._id})

                await projectTask.save();

                project.tasks.push(projectTask)
            }))

            await project.save()

          res.status(200).send({project})

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on create project: "+err})
    }
})


Router.put('/:projectId', async (req, res) =>{
   
    try {

        const { title, description, tasks } = req.body
        
        const project = await Project.findByIdAndUpdate(req.params.projectId,
            {
                title,
                description,
            }, {new: true})

            project.tasks = []
            await Task.remove({project: project._id})

            await Promise.all(tasks.map(async task => {

                const projectTask = new Task({... task, project: project._id})

                await projectTask.save();

                project.tasks.push(projectTask)
            }))

            await project.save()

          res.status(200).send({project})

    } catch (err) {

        console.log(err)
        
        res.status(400).send({error: "Error on Update project: "+err})
    }
})

module.exports = app => app.use('/project', Router)