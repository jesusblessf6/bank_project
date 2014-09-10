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
	var url = require('url');
	var async = require('async');
	var shopids = [];

	async.series([

			function(callback){
				console.log("page:" + (index+1));
				driver.get('http://best.cmbchina.com/Shop/Search.aspx?citycode=0021&pageno=' + (index+1)).then(callback);
			},

			function(callback){
				driver.findElements({className: 'shopname'}).then(function(elements){
					elements.forEach(function(e, index, arr){
						e.getAttribute('href').then(function(href){
							var parsedUrl = url.parse(href, true);
							//console.log(parsedUrl.query.id);
							//detail(parsedUrl.query.id, driver);
							shopids.push(parsedUrl.query.id);
						});
					});
				}).then(callback);
			},

			function(callback){
				async.each(shopids, 
					function(id, next){
						detail(id, driver, next);
					}, 
					function(err){
						if(err){
							console.dir(err);
						}
						callback();
					}
				);
			}

		], 

		function(err){
			if(err){
				console.dir(err);
			}
			callback();
		}
	);
}

//get activity detail
function detail(activityId, driver, next){
	
	var async = require('async');
	var activityModel = require('../models/activity').model;
	var activity = new activityModel({
		activityId : activityId
	});
	
	async.series([
			function(callback){
				driver.get('http://best.cmbchina.com/Shop/Detail.aspx?citycode=0021&id='+activityId).then(callback);
			},

			function(callback){
				driver.findElement({className : 'title'}).then(function(title){
					title.getText().then(function(t){
						activity.shopName = t;
					});
				}).then(callback);
			},

			function(callback){

				driver.findElements({className : 'content_detail'}).then(function(contents){
					getShopInfo(contents[0], driver, activity);
					getActivityInfo(contents[1],driver,activity);
				}).then(callback);

			},

			function(callback){
				console.dir(activity);
				var activityModel = require('../models/activity').model;

				activityModel.count({activityId : activity.activityId}, function(err, count){
					if(count == 0){
						//persistence
						activity.bankCode = 'cmb';
						activity.save(function(err){
							if(err){
								console.dir(err);
							}
						});
					}
					callback();
				});

				
			}

		], function(err){
		if(err){
			console.dir(err);
		}
		next();
	});
}

function getShopInfo(contentDiv, driver, activity){
	contentDiv.findElement({className: 'list'}).then(function(listDiv){
		listDiv.findElements({tagName: 'tr'}).then(function(trs){
			trs.forEach(function(tr, index, arr){
				tr.findElements({tagName: 'td'}).then(function(tds){
					tds[0].getText().then(function(tt){
						if(tt.trim() === "服务电话："){
							tds[1].getText().then(function(tt2){
								activity.tel = tt2.trim();
							});
						}else if(tt.trim() === "商户地址："){
							tds[1].getText().then(function(tt2){
								activity.address = (tt2.split('\n'))[0].trim();
							});
						}else if(tt.trim() === "优惠日期："){
							tds[1].getText().then(function(tt2){
								var arr1 = tt2.split('(开始)');
								var start = new Date(arr1[0].trim());
								var end = new Date(arr1[1].replace('(截止)',''));
								activity.start = start;
								activity.end = end;
							});
						}
					});
				});
			});
		});
	});
}

function getActivityInfo(contentDiv, driver, activity){
	contentDiv.findElement({className: 'list'}).then(function(listDiv){
		listDiv.findElements({tagName: 'tr'}).then(function(trs){
			trs.forEach(function(tr, index, arr){
				tr.findElements({tagName: 'td'}).then(function(tds){
					tds[0].getText().then(function(tt){
						if(tt.trim() === "持卡优惠："){
							tds[1].getText().then(function(tt2){
								activity.description = tt2.trim();
							});
						}else if(tt.trim() === "优惠细则："){
							tds[1].getText().then(function(tt2){
								activity.rule = tt2.trim();
							});
						}
					});
				});
			});
		});
	});
}