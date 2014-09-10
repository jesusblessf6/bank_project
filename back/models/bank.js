var db = require('./db');

var bankSchema = new db.Schema({
	name: String,
	code: String
});

var Bank = db.mongoose.model('Bank', bankSchema);

exports.model = Bank;
exports.schema = bankSchema;