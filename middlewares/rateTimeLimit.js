const rateLimit = require('express-rate-limit')


const rateLimitRequest = {

  sendContactMail: rateLimit({
    windowMs: 60 * 1000 * 5, // 5 minutes
    max: 1,
    handler: function (req, res) {
            res.status(429).json("Thử lại sau 5 phút");
        },
    }),

  createAccount: rateLimit({
    windowMs: 60 * 1000 * 5, // 5 minutes
    max: 1,
    handler: function (req, res) {
            res.status(429).json( {message: "Thử lại sau 5 phút"});
        },
    }),
  
    login: rateLimit({
      windowMs: 60 * 1000 * 5, // 5 minutes
      max: 5,
      handler: function (req, res) {
              res.status(429).json( {message: "Thử lại sau 5 phút"});
          },
      }),
  

}

module.exports = rateLimitRequest