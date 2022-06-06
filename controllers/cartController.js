const Product = require('../models/Product')

const cartControllers = {
  getCartItems: async (req, res) => {
    const {id} = req.query
    let response = []
    try {
      for(let i=0; i<id.length ; i++) {
        const item = await Product.findOne({_id: id[i]})
        if(item) {
          response.push(item)
        }
      }
      return res.status(200).json({cart: response, message: "ok"})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:'có lỗi'})
    }
  }
}

module.exports = cartControllers