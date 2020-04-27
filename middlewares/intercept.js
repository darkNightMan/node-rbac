const { JWT_COMF} = require('../conf')
const colors = require('colors')
const JwtToken = require('../utils/authToken')
const jwt = require('jsonwebtoken')
const redis = require('../db/redis')

class InterceptAuth {
  async authToken(req, res, next) {
    var url = req.originalUrl;
    let cookieName = req.cookies.username
    let token = req.headers.token
    if (!token) return res.R.err('TOKEN_IS_MISSING')
    try {
      let decoded = JwtToken.verifyToken(token)
      // 验证客户端token是否合法
      if (decoded.userInfo.user_id) {
        // 获取redis中的token1
        let redisToken = await redis.get(`token_${decoded.userInfo.user_id}`)
        // 当前的token 是否和 redis中的一致 token 反则 用户可能重新登入或者在林外一台机子登入了
        if (token === redisToken) {
          req.userInfo = decoded.userInfo
          redis.set(`token_${decoded.userInfo.user_id}`, token, JWT_COMF.JWTEXP) // 继续激活当前token
          next() // 跳转下一个路由
        } else {
          // res.status(401).send()
          res.R.err('TOKEN_HAS_EXPIRED')
        }
      } else {
        res.R.err('TOKEN_IS_INVALID')
      }
    } catch (ex) {
      res.R.err('TOKEN_IS_INVALID')
    }
  }
}
module.exports = new InterceptAuth()