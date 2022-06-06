const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
  refreshToken : {
    type: String,
  },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 10 }
})

module.exports = mongoose.model("token", tokenSchema)