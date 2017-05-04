var express = require('express');
var router = express.Router();
var URL = require('../models/mongoModel');
var multer = require('multer');
var upload = multer();

function getRandomCode() {
	var d = Number(new Date()) * (Math.random());
	return Math.floor(d);
}

var base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+@#";
function converToBase62(n) {
	res = "";
	while( n > 0) {
		res += base62.charAt(n%64);
		n = Math.floor(n/64);
	}
	return res;
}

router.get('/', function(req, res) {
	res.render('index');
});


router.post('/', upload.array(), function(req, res) {
	var url = req.body.url;
	var shortcode = converToBase62(getRandomCode());
	var myurl = new URL({
		url: url,
		shortcode: shortcode,
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
		if(myurl)
			res.redirect(myurl.url);
		else
			res.redirect("http://localhost:3000");
	});
	
});

module.exports = router;
