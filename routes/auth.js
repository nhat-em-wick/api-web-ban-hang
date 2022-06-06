const router = require("express").Router()
const authControllers = require('../controllers/authController')
const tokenMiddleware = require('../middlewares/tokenMiddleware')
const rateLimitRequest = require('../middlewares/rateTimeLimit')


router.post('/login',rateLimitRequest.login, authControllers.loginUser)
router.post('/register',rateLimitRequest.createAccount, authControllers.registerUser)
router.get('/refresh', authControllers.requestRefreshToken)

module.exports = router