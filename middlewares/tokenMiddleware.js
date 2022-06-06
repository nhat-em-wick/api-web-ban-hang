const jwt = require("jsonwebtoken")


const tokenMiddleware = {
  // verifyToken
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
      const accessToken = token.split(" ")[1]
      try {
        const decodedAccessToken = await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
        req.user = decodedAccessToken
        next()
      } catch(err) {
        return res.status(403).json("Token không hợp lệ")
      }
    }else {
      return res.status(401).json("Bạn cần đăng nhập")
    }
  },
  verifyTokenAndAdmin: (req, res, next) => {
    tokenMiddleware.verifyToken(req, res, ()=>{
      if(req.user.admin === true) {
        next()
      }else {
        return res.status(403).json("Không được phép")
      }
    })
  }

}

module.exports = tokenMiddleware