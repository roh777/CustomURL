const var base64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+_";

var getRandomCode = function () {
                var d = Number(new Date()) * (Math.random());
                return Math.floor(d);
            }

            

var converToBase64 = function (n) {
                res = "";
                while( n > 0) {
                    res += base62.charAt(n%64);
                    n = Math.floor(n/64);
                }
                return res;
            }

module.exports = {
    getShortCode : function () {
        return converToBase64(getRandomCode());
    }
};



