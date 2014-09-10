var db = require('./db');

var baSchema = new db.Schema({
	name: String
});

var BusinessArea = db.mogoose.model('BusinessArea', baSchema);

exports.model = BusinessArea;
exports.schema = baSchema;