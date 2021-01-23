const Mongoose = require("../../DataBase/Connection")

const ProjectSchema = new Mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    
    description: {
        
        type: String,
        require: true
    },

    user: {

        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    tasks: [{

    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = Mongoose.model('Project', ProjectSchema)

module.exports = Project;