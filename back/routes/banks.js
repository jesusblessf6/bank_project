var express = require('express');
var router = express.Router();

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

});

router.get('/new', function(req, res){
	//console.log('get new page');
});

router.get('/:bankname', function(req, res){
	var Bank = require('../models/bank').model;
	//console.log('get bank');
	res.render('banks/' + req.params.bankname, {title: ''});
	
});

router.get('/:bankname/:actionname', function(req, res){
	//console.log("bankname: " + req.params.bankname + "; actionname: " + req.params.actionname);
	res.render('banks/'+ req.params.bankname + req.params.actionname, {title: ''});
});

module.exports = router;