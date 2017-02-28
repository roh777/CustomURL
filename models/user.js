var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/urlapp');

var UserSchema = new mongoose.Schema({
	username : {
		type : String,
		index : true
	},
	password : {
		type : String
	},
	email : {
		type:String
	},
	name : {
		type:String
	},
	urls : [ {
		url : String,
		date : Date
	}]

});

var User = mongoose.model('User', UserSchema);

User.createUser  = function createU(newuser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
});
};

module.exports = User;