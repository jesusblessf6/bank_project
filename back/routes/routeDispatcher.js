var home = require('./home');

module.exports = function (app){
	app.use('/', home);
	//app.use('/users', users);
};