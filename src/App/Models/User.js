const Mongoose = require ('../../DataBase/Connection');
const bcryptjs = require ('bcryptjs');


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

    passwordResetToken: {
        type: String,
        select: false
    },

    passwordResetExpires: {
        type: Date,
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function(next){
    
    const hash = await bcryptjs.hash(this.password, 10)

    this.password = hash

    next();
})

const User = Mongoose.model('User', UserSchema); 

module.exports = User;