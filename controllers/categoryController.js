const Category = require('../models/Category')

const categoryControllers = {
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find()
      return res.status(200).json({categories, message: "ok"})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:'có lỗi'})
    }
  }
}

module.exports = categoryControllers