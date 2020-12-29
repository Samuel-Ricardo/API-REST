const Mongoose = require ('mongoose');

Mongoose.connect('mongodb://localhost/noderest', 
{
     useNewUrlParser: true,
     useUnifiedTopology: true
})

Mongoose.Promise = global.Promise;

module.exports = Mongoose;