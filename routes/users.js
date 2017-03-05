var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();

router.get('/register', function(req,res) {
	res.render('register');
});

router.get('/login', function (req,res) {
	res.render('login');
});

//for Registration form
router.post('/register', upload.array(), function(req, res) {
	var name = req.body.name;
	var email= req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//Validate Input
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not correct').isEmail();
	req.checkBody('password', 'password is required').notEmpty();
	req.checkBody('password', 'passwords didn\'t match').equals(req.body.password2);

	var errors = req.validationErrors();
	if(errors) {
		res.render('register', { errors: errors});
	}
	else {
		var newUser = new User({
			name : name,
			email : email,
			username : username,
			password : password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log('USER CREATED', user);
		});

		req.redirect('/users/login');
	}

});

module.exports = router;