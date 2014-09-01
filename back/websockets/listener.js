/**
	web sockets dispatcher
*/
var cmbCrawler = require('../crawlers/cmb');

module.exports = function(io){
	io.sockets.on('connection', function(socket){
		
    socket.on('startCrawling', function(data){
      switch(data.target){
        case 'cmb':
          //招行
          cmbCrawler.start();
          break;

      }
    });

	});
};
