const router = require("express").Router()

const tokenMiddleware = require('../middlewares/tokenMiddleware')
const adminControllers = require('../controllers/adminController')

router.get('/dashboard',tokenMiddleware.verifyToken, tokenMiddleware.verifyTokenAndAdmin, adminControllers.dashboard)

module.exports = router