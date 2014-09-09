var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('banks/index', {title: '银行'});
});

router.get('/:bankname', function(req, res){
	//res.send(req.params.bankname);
	res.render('banks/' + req.params.bankname, {title: ''});
	
});

module.exports = router;