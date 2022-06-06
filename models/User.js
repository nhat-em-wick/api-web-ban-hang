const mongoose = require("mongoose")
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Không được để trống'],
    minlength: [2, 'Tên quá ngắn']
  },
  email: {
    type: String,
    required: [true, 'Không được để trống'],
    unique: true,
    validate: [isEmail, 'Nhập đúng email']
  },
  password: {
    type: String,
    required: [true, 'Không được để trống'],
    minlength: [8, "Mật khẩu chứa ít nhất 8 ký tự"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  member: {
    type: Boolean,
    default: false
  }

}, {timestamps: true})

userSchema.index({name: 'text', email: "text", phone: 'text'})

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

module.exports = mongoose.model("user", userSchema)