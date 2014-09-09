var home = require('./home');
var banks = require('./banks');

module.exports = function (app){
	app.use('/', home);
	//app.use('/users', users);

	app.use('/banks', banks);
};