const Mongoose = require("../../DataBase/Connection")

const TaskSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    project: {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: 'Project',
        required: true,
    },

    assignedTo: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = Mongoose.model('Task', TaskSchema)

module.exports = Task