const  base64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+_";

var getRandomCode = function () {
                var d = Number(new Date()%1000000000) + (Math.random()*10000);
                return Math.floor(d);
            }

            

var converToBase64 = function (n) {
                res = "";
                while( n > 0) {
                    res += base64.charAt(n%64);
                    n = Math.floor(n/64);
                }
                return res;
            }

module.exports = {
    getShortCode : function () {
        return converToBase64(getRandomCode());
    }
};



