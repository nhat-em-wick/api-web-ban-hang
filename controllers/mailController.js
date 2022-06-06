const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require('../models/User')
const jwt = require("jsonwebtoken");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN_MAIL });

const accessToken =  oauth2Client.getAccessToken((err, token) => {
  if(err) {
    console.log(err)
    return
  }
  return token
});

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN_MAIL,
    accessToken: accessToken,
  },
});



const mailControllers = {
  contactForm: async (req, res) => {
    try {
      const mailOption = {
        from: `Contact <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: "Contact bacola shop",
        html: `<h3>Email được gửi từ form liên hệ</h3>
            <div>Tên: ${req.body.name}</div>
            <div>Email: ${req.body.email}</div>
            <div>Số điện thoại: ${req.body.phone}</div>
            <div>Nội dung: ${req.body.message}</div>
        `,
      };
      const result = await transport.sendMail(mailOption);
      res.status(200).json({message: "Gửi mail thành công"});
    } catch (error) {
      console.log(error);
      res.status(500).json({messgae:"Lỗi server"});
    }
  },
  forgotPasswordMail: async (req, res) => {
    try {
      const user = await User.findOne({email: req.body.email})
      if(!user) return res.status(404).json({messgae:'Email không tồn tại !!!'})
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_RECOVERY_KEY,
        { expiresIn: "5m" }
      );
      const mailOption = {
        from: `Bacola <${process.env.EMAIL}>`,
        to: req.body.email,
        subject: "Quên mật khẩu",
        html: `<div>
        Hãy nhấn vào link dưới đây để lấy lại mật khẩu: 
        </div><br>
        <a href="${process.env.URL_CLIENT}/recovery?token=${token}" target="_blank">Nhấn vào đây để lấy lại mật khẩu</a><br>
        <p>Link có thời hạn 5 phút</p>
        `,
      };
      const result = await transport.sendMail(mailOption);
      res.status(200).json({message:"Email khôi phục mật khẩu đẫ được gửi, vui lòng kiểm tra email"});
    } catch (error) {
      console.log(error);
      res.status(500).json({messgae: "Lỗi server"});
    }
  }
};

module.exports = mailControllers;