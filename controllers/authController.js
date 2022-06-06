const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");
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

const authControllers = {
  // GENERATE TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "40s" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "10d" }
    );
  },
  // LOGIN
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "Sai email" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }
      if (user && validPassword) {
        const accessToken = authControllers.generateAccessToken(user);
        const refreshToken = authControllers.generateRefreshToken(user);
        const refreshTokenDB = await Token.create({
          refreshToken
        })
        return res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            admin: user.admin,
          },
          accessToken,
          refreshToken,
          message: "Đăng nhập thành công",
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "lỗi server"});
    }
  },

  registerUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // create new user
      const newUser = await User.create({
        name,
        email,
        password,
      });
      return res.status(200).json({ message: "Đăng kí thành công" });
    } catch (error) {
      const errors = handleErr(error);
      return res.status(500).json({message: "lỗi server"});
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.query.token;
    
    if (!refreshToken) {
      return res.status(401).json({message: "Bạn cần đăng nhập"});
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({message: "Bạn cần đăng nhập lại"});
      }
      const deleteRefreshOld = await Token.findOneAndDelete({refreshToken: refreshToken})
      console.log(deleteRefreshOld)
      if(deleteRefreshOld) {
        const newAccessToken = authControllers.generateAccessToken(user);
        const newRefreshToken = authControllers.generateRefreshToken(user);
        const refreshTokenDB = await Token.create({
          refreshToken: newRefreshToken
        })
        return res
          .status(200)
          .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      }else {
        return res.status(401).json({message: "Bạn cần đăng nhập"});
      }
    });
  },
};

module.exports = authControllers;