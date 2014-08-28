/**
	web sockets dispatcher
*/


module.exports = function(io){
	io.sockets.on('connection', function(socket){
		socket.emit('log', {message: 'hello world'});
	});
};