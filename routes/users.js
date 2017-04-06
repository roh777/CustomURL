var express = require('express');
var router = express.Router();
var api = require('../api/shortv1');
var UserModel = require('../models/USERModel.js');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.use(session({secret : '221B Bakers Street'}));
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy( function(user, password, done) {
    UserModel.findOne({username : user, password : password}, function(err, userfound) {
        if(userfound) {
            return done(null, userfound, {message : 'Loggin You In'});
        }else {
            return done(null, false, {message : 'No such user/password in database'});  
        }
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/login', passport.authenticate('local'),function(req, res) {
    res.json(req.user);
});

router.post('/register', function(req, res) {
    var user = req.body;
    UserModel.findOne({username: user.username}, function (err, found) {
        if(found) {
            res.send('User with username '+ found.username+' already exists in database');
        } else {
            var newUser = new UserModel(user);
            newUser.save();
            res.json(user);
        }
    })
    console.log('NEW USER IS ===> ', user);
});

router.get('/logout', function(req, res) {
    req.logout();
})

module.exports = router;



