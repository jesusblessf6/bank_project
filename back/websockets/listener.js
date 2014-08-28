/**
	web sockets dispatcher
*/


module.exports = function(io){
	io.sockets.on('connection', function(socket){
		
    socket.on('startCrawling', function(data){
      switch(data.target){
        case 'cmb':
          //招行
          
          break;

      }
    });

	});
};