const router = require("express").Router()
const tokenMiddleware = require('../middlewares/tokenMiddleware')
const orderControllers = require('../controllers/orderController')


router.get('/user', tokenMiddleware.verifyToken, orderControllers.getAllOrderUser)
router.put('/user/:orderId', tokenMiddleware.verifyToken, orderControllers.updateOrderUser)
router.get('/user/:orderId', tokenMiddleware.verifyToken, orderControllers.getOrderUser)
router.post('/user',tokenMiddleware.verifyToken, orderControllers.postOrderUser)

router.get('/customer/:orderId', tokenMiddleware.verifyToken, tokenMiddleware.verifyTokenAndAdmin, orderControllers.getOrder)
router.put('/customer/:orderId', tokenMiddleware.verifyToken, tokenMiddleware.verifyTokenAndAdmin, orderControllers.putOrder)
router.get('/customer', tokenMiddleware.verifyToken, tokenMiddleware.verifyTokenAndAdmin, orderControllers.getAllOrder)



module.exports = router