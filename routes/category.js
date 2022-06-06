const router = require("express").Router()
const categoryControllers = require('../controllers/categoryController')

router.get('/', categoryControllers.getAllCategory)



module.exports = router