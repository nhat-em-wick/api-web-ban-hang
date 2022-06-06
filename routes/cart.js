const router = require("express").Router()
const cartControllers = require('../controllers/cartController')

router.get('/', cartControllers.getCartItems)

module.exports = router