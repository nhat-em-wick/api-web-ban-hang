
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  },
  cartItems: [{
    productId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number
    },
  }],
  total_product: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
  paid: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})


module.exports = mongoose.model('orders', orderSchema);