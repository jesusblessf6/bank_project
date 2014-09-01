exports.start = function(){
	var webdriver = require('selenium-webdriver');
	var Activity = require('../models/activity');
	var async = require('async');

	var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
	var pageNum = 0;

	async.series([

			//open the coupon main page
			function(callback){
				driver.get('http://best.cmbchina.com/Shop/Search.aspx?citycode=0021').then(callback);
			},

			//get the total page number
			function(callback){
				getPageNum(driver, function(pn){
					pageNum = pn;
					console.log(pageNum);
					callback();
				});
			},

			//go through all the pages
			function(callback){
				async.timesSeries(pageNum, function(n, next){
					traversal(n, driver, next);
				}, function(err){
					if(err){
						console.dir(err);
					}
					callback();
				});
			},

			//end
			function(callback){
				driver.close();
				driver.quit();
				callback();
			}
		], 

		function(err){
			if(err){
				console.dir(err);
			}
		}
	);
};

function getPageNum(driver, callback){
	//get the total page number
	var pagenum = 0;
	driver.findElement({className: 'pageinfo'}).then(function(element){
		element.getText().then(function(text){
			var ps = text.split('/');
			pagenum = Number(ps[1].replace('页', ''));
		}).then(function(){
			callback(pagenum);
		});
	});
}

//traversal pages, get all available activity ids
function traversal(index, driver, callback){
	//console.log(index);
	driver.get('http://best.cmbchina.com/Shop/Search.aspx?citycode=0021&pageno=' + (index+1));
	driver.findElements({className: 'shopname'}).then(function(elements){
		elements.forEach(function(e){
			
		})
	});

	callback();
}

//get activity detail
function detail(activityId, driver){

}