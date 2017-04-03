var express = require('express');
var router = express.Router();
var URL = require('../models/URLModel');
var api = require('../api/shortv1');


router.get('/', function(req, res) {
	res.render('index');
});


router.post('/', function(req, res) {
	var url = req.body.url;
	
	var myurl = new URL({
		url: url,
		shortcode: api.getShortCode(),
		created_at: new Date()
	});

	URL.shortLink(myurl, function(err, url) {
		if(err) throw err;
		console.log("saving : ", url);
	});

	res.send("http://"+req.headers.host+"/"+shortcode);

});


router.get('/:shortcode', upload.array(), function(req, res) {
	URL.getURLFromCode(req.params.shortcode, function(err ,myurl) {
		if(err) throw err;
		res.redirect(myurl.url);
	});
	
});

module.exports = router;