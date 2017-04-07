var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

//local modules
var routes = require('./routes/index');
var user = require('./routes/users');

//app init
var app = express();
//static files directory eg. like bootstrap
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/', routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('App running on port '+app.get('port'));
});

