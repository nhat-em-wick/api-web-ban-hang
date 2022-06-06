const router = require("express").Router()
const tokenMiddleware = require('../middlewares/tokenMiddleware')
const userControllers = require('../controllers/userController')
const orderControllers = require('../controllers/orderController')


router.post('/recovery', userControllers.recoveryPassword)
router.put('/change-password', tokenMiddleware.verifyToken, userControllers.changePassword)
router.put('/edit', tokenMiddleware.verifyToken, tokenMiddleware.verifyToken, userControllers.editUser)
router.get('/info', tokenMiddleware.verifyToken,tokenMiddleware.verifyToken, userControllers.infoUser)
router.get('/', tokenMiddleware.verifyToken,tokenMiddleware.verifyTokenAndAdmin, userControllers.getAllUser)
router.post('/', tokenMiddleware.verifyToken, tokenMiddleware.verifyTokenAndAdmin, userControllers.addUser)
router.delete('/', tokenMiddleware.verifyToken, tokenMiddleware.verifyTokenAndAdmin, userControllers.deleteUsers)
router.get('/:userId', tokenMiddleware.verifyToken, userControllers.getUser)
router.put('/:userId', tokenMiddleware.verifyToken, userControllers.changeInfo)

module.exports = router