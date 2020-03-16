const { JWT_COMF } = require('../conf/db')
const jwt = require('jsonwebtoken')

class JwtToken {
  // 生成 token
  createToken (data) {
    let token = jwt.sign(data, JWT_COMF.JWTKEY) // 签发
    return token
  }
  // 校验token
  verifyToken (token) {
    let  result
    try{
       result = jwt.verify(token ,JWT_COMF.JWTKEY)
    } catch (ex) {
       result = ex
    }
    return result
  }
}

module.exports = new JwtToken()