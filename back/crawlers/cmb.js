exports.start = function(){
	var webdriver = require('selenium-webdriver');
	var Activity = require('../models/activity');
	var async = require('async');

	var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

	driver.get('http://best.cmbchina.com/Shop/Search.aspx?citycode=0021');

};


