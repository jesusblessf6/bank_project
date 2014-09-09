var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('banks/index', {title: '银行'});
});

router.get('/:bankname', function(req, res){
	//res.send(req.params.bankname);
	//res.render('')
	switch(req.params.bankname){
		case 'cmb':
			res.render('banks/cmb', {title: '招商银行'});
			break;

		default:
			break;
	}
});

module.exports = router;