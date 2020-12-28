const Mongoose = require ('mongoose');


const UserSchema = new Mongoose.Schema({

    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const User = Mongoose.model('User', UserSchema); 

module.exports = User;