var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bank');

exports.Schema = mongoose.Schema;
exports.mongoose = mongoose;