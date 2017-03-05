var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/urlapp');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var URL = new Schema({
    url : String,
    shortcode : String,
    created_at : Date
});

mongoose.model('URL', URL);
var Url = mongoose.model('URL'); //this is URL model

Url.shortLink = function (urlObj, callback) {
    urlObj.save(callback);
};

Url.getURLFromCode = function (shortcode, callback) {
    var query = {shortcode : shortcode};
    Url.findOne(query, callback);
};

module.exports = Url; //export model Url.

