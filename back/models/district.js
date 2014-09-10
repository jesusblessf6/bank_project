var db = require('./db');

var districtSchema = new db.Schema({
	name: String
});

var District = db.mongoose.model('District', districtSchema);

exports.model = District;
exports.schema = districtSchema;