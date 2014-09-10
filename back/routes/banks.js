var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('banks/index', {title: '银行'});
});

router.get('/:bankname', function(req, res){
	//console.log("bankname: " + req.params.bankname);
	//res.send(req.params.bankname);
	res.render('banks/' + req.params.bankname, {title: ''});
	
});

router.get('/:bankname/:actionname', function(req, res){
	//console.log("bankname: " + req.params.bankname + "; actionname: " + req.params.actionname);
	res.render('banks/'+ req.params.bankname + req.params.actionname, {title: ''});
});

module.exports = router;