const Mongoose = require ('mongoose');

Mongoose.connect('mongodb://localhost/noderest', {useMongoClient: true})

Mongoose.Promise = global.Promise;

module.exports = Mongoose;