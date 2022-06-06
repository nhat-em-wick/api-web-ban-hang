const mongoose = require("mongoose")
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  old_price: {
    type: Number
  },
  new_price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  short_description: {
    type: String
  },
  long_description: {
    type: String
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  gallery: [],
  slug: {
    type: String,
    unique: true,
    slug: "name"
  }

}, {timestamps: true})

productSchema.index({name: 'text'})

module.exports = mongoose.model("product", productSchema)