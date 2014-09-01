var db = require('./db');

var activitySchema = new db.Schema({
	start: Date,
	end: Date,
	description: String,
	shopName: String,
	address: String,
	activityId: String
});

var Activity = db.mongoose.model('Activity', activitySchema);

exports.model = Activity;
exports.schema = activitySchema;