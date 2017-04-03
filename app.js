var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');



//local modules
var routes = require('./routes/index');
var users = require('./routes/users');

//app init
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//static files directory eg. like bootstrap
app.use(express.static(path.join(__dirname, 'public')));

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

