const router = require("express").Router()
const mailControllers = require('../controllers/mailController')
const rateLimitRequest = require('../middlewares/rateTimeLimit')

router.post('/contact',rateLimitRequest.sendContactMail, mailControllers.contactForm)
router.post('/forgot', rateLimitRequest.sendContactMail, mailControllers.forgotPasswordMail)
module.exports = router