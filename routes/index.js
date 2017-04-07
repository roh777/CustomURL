var express = require('express');
var router = express.Router();
var URL = require('../models/URLModel');
var api = require('../api/shortv1');


router.get('/', function(req, res) {
	res.render('index');
});

router.get('/favicon.ico', function(req, res) {
	res.status(204);
});


router.post('/', function(req, res) {

	var url = req.body.url;
	console.log(req.body);
	var shortcode = api.getShortCode();
	var myurl = new URL({
		url: url,
		shortcode: shortcode,
		created_at: new Date(),
	});

	URL.shortLink(myurl, function(err, url) {
		if(err) throw err;
		console.log("saving : ", url);
	});
	var miniurl = "http://"+req.headers.host+"/"+shortcode;
	res.render("index", {shorturl : miniurl});

});


router.get('/:shortcode',  function(req, res) {
	console.log("SHORTCODE PARAMS " + req.params.shortcode);
	URL.getURLFromCode(req.params.shortcode, function(err ,myurl) {
		if(err) {
			res.send("Not found in DATABASE");
		}
		res.redirect(myurl.url);
	});
	
});

module.exports = router;