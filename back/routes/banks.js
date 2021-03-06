var express = require('express');
var router = express.Router();
var Bank = require('../models/bank').model;

/*
routes:
	=== banks ===
	GET '/' : banks-index;
	POST '/' : banks-create;
	GET '/new' : banks-new;
	GET '/:bankcode' : display bank info by code
	GET '/:bankcode/edit' : edit bank info by code
	POST '/:bankcode' : update bank info by code
	DELETE '/:bankcode' : delete bank by code
	POST '/checkname' : bank name validation when create or update
	=== activities of current bank ===
	GET '/:bankcode/activities' : bank's activities - index
	POST '/:bankcode/activities' : bank's activities - create
	GET '/:bankcode/activities/new' : open the activity-new interface
	GET '/:bankcode/activities/:activityid' : display activity info
	GET '/:bankcode/activities/:activityid/edit' : edit activity
	POST '/:bankcode/activities/:activityid' : update activity
	DELETE '/:bankcode/activities/:activityid' : delete activity
*/


//GET '/' : banks-index;
router.get('/', function(req, res){
	res.render('banks/index', {title: '银行'});
});


//POST '/' : banks-create;
router.post('/', function(req, res){
	var bankName = req.param('bankName');
	var bankCode = req.param('bankCode');
	console.log(bankName);
	console.log(bankCode);
	var result = {};

	var bank = new Bank({
		name: bankName,
		code: bankCode
	});

	bank.save(function(err, r){
		if(err){
			result.status = 'failed';
			result.message = err;
			console.dir(err);
		}else{
			result.status = 'success';
			console.log('success');
		}
		res.json(result);
	});
});


//validate the bank info
router.post('/check', function(req, res){
	var field  = req.param('checkField');
	var result = {valid : false};

	switch(field){
		case 'name':
			var bankName = req.param('bankName');
			Bank.count({name : bankName}, function(err, count){
				if(count === 0){
					result.valid = true;
				}
				res.json(result);
			});
			break;
		case 'code':
			var bankCode = req.param('bankCode');
			Bank.count({code : bankCode}, function(err, count){
				if(count === 0){
					result.valid = true;
				}
				res.json(result);
			})
			break;
		default:
			res.json(result);
			break;
	}
});


// open the bank index page
router.get('/:bankname', function(req, res){
	res.render('banks/'+req.params.bankname+'/index', {title: ''});
});


// open all the activities of current bank
router.get('/:bankname/activities', function(req, res){
	var bankname = req.params.bankname;
	res.render('banks/' + bankname + "/allActivities", {title: 'hello activities'});
});


module.exports = router;