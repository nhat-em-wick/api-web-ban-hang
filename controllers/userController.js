const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const pagination = require("../utils/pagination");
const jwt = require("jsonwebtoken");

const handleErr = (err) => {
  let errors = { name: "", email: "", password: "" };
  //  duplicate error code
  if (err.code === 11000) {
    errors.email = "Email đã tồn tại";
    return errors;
  }
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const userControllers = {
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isAdmin: user.admin,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json("có lỗi");
    }
  },

  changeInfo: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id })
      user.name = req.body.name || user.name
      user.address = req.body.address || user.address
      user.phone = req.body.phone || user.phone
      const updatedUser = await user.save()
      res.status(200).json({user: {
        name: updatedUser.name,
        id: updatedUser._id,
        admin: updatedUser.admin
      }, message: "Cập nhật thành công"});
    } catch (error) {
      console.log(error);
      return res.status(500).json("Cập nhật thông tin thất bại");
    }
  },
  changePassword: async (req, res) => {
    const { password, newPassword } = req.body;
    try {
      const user = await User.findOne({ _id: req.user.id });
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatePass = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: hashedPassword,
        }
      );
      return res.status(200).json({message: "Thay đổi mật khẩu thành công"});
    } catch (error) {
      console.log(error);
      return res.status(500).json("có lỗi");
    }
  },

  // admin
  getAllUser: async (req, res) => {
    const page = req.query._page || 1;
    const limit = req.query._limit || 12;
    const { q } = req.query;
    let result;
    try {
      if (q) {
        const users = await User.find({ $text: { $search: q } }).select(
          "-password"
        );
        result = users;
      } else {
        const users = await User.find().select("-password");
        result = users;
      }

      res.status(200).json({
        users: pagination(page, limit, result),
        pagination: {
          _page: parseInt(page),
          _limit: parseInt(limit),
          _totalRows: result.length,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"lỗi server"});
    }
  },
  infoUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isAdmin: user.admin,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },
  addUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json({message:"Thêm người dùng thành công"});
    } catch (error) {
      const errors = handleErr(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },
  editUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          email: req.body.email,
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          admin: req.body.isAdmin,
        }
      );
      res.status(200).json({message:"Cập nhật thông tin thành công"});
    } catch (error) {
      const errors = handleErr(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const ids = req.query.ids;
      const deletedUsers = await User.deleteMany({
        _id: { $in: req.query.ids },
      });
      const deleteOrderUsers = await Order.deleteMany({
        customerId: { $in: req.query.ids },
      });
      return res.status(200).json({message:"Xóa thành công"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },
  recoveryPassword: async (req, res) => {
    try {
      const password = req.body.password;
      const token = req.body.token;
      let user
      try {
        const decoded = await jwt.verify(token, process.env.JWT_RECOVERY_KEY);
        user = decoded
      } catch (error) {
        return res.status(400).json({message:"Link khôi phục đã hết hạn, xin thử lại"});
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatePass = await User.findOneAndUpdate(
        { _id: user.id },
        {
          password: hashedPassword,
        }
      );
      return res.status(200).json({message:"Thay đổi mật khẩu thành công"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },
};

module.exports = userControllers;