var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/urlapp');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    username : String,
    password : String,
    created_at : Date
});

mongoose.model('users', UserSchema);
var User = mongoose.model('users');

module.exports = User;