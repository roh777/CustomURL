var express = require('express');
var router = express.Router();
var URL = require('../models/URLModel');
var api = require('../api/shortv1');
var UserModel = require('../models/USERModel.js');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.use(session({secret : '221B Bakers Street',
                    resave: false,
                    saveUninitialized: false}));
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

router.use(function(req, res, next) {
    res.locals.user = req.user; // This is the important line
    next();
});

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
  UserModel.findById(id, function(err, user) {
        done(err, user);
    })
 });

function checkAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    }else {
        res.render('login', {message : "You need to Log In or register to access this page"});
    }
}

//GET REQUESTS

router.get('/main',checkAuth, function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function (req, res) {
    console.log('In register', req.user);
    res.render('register');
});


router.get('/logout', function(req, res) {
    req.logout();

    res.redirect('/');
});

router.get('/profile', checkAuth, function (req, res)  {

    var owner = req.user.username;
    URL.find({owner : owner}, function (err, shorturls) {
        res.render('profile', {user : owner, urls : shorturls})
    });
});

//POST REQUESTS

router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req.isAuthenticated());
    res.redirect('/user/main');
});

router.post('/register', function(req, res) {
    var user = req.body;
    UserModel.findOne({username: user.username}, function (err, found) {
        if(found) {
            res.render("register", {message:'User with username '+ found.username+' already exists in database'});
        } else {
            var newUser = new UserModel(user);
            newUser.save();
            res.json(user);
        }
    }); 
    console.log('NEW USER IS ===> ', user);
});


router.post('/main',checkAuth, function(req, res) {

    var url = req.body.url;
    console.log(req.body);
    var shortcode = api.getShortCode();
    var myurl = new URL({
        url: url,
        shortcode: shortcode,
        created_at: new Date(),
        owner : req.user.username
    });

    URL.shortLink(myurl, function(err, url) {
        if(err) throw err;
        console.log("saving in main for user "+req.user.username, url);
    });
    var miniurl = "http://"+req.headers.host+"/"+shortcode;
    res.render("index", {shorturl : miniurl});

});

module.exports = router;



