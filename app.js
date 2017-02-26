var multer = require('multer');
var exphbs = require('express-handlebars');
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongod');
var mongoose = require('mongoose');
var passport = require('passport');

//local modules
var routes = require('./routes/index');
var users = require('./routes/users');

//app init
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'layout'}));
app.set('view engine', 'handlebars');

app.use(cookieParser());

//static files directory eg. like bootstrap
app.use(express.static(path.join(__dirname, 'public')));

//Sessions
app.use(session({
	'secret': 'secret',
	saveUninitialized : true,
	resave : true
}));

app.use(passport.initialize());
app.use(passport.session());

//Express Validator


//Connect flash
app.use(flash());

app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('App running on port '+app.get('port'));
});

