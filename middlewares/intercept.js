const { SuccessModel, ErrorModel }= require('../model/resModle')
const { JWT_COMF } = require('../conf/db')
const colors = require('colors')
const JwtToken = require('../utils/authToken')
const jwt = require('jsonwebtoken')
const redis = require('../db/redis')

class InterceptAuth {
  async auth (req, res, next) {
    var url = req.originalUrl;
    let cookieName = req.cookies.username
    let token = req.headers.token
    if (!token) return  res.json(new ErrorModel('还未登入!'))
    try {
      let { nickName, user_id } = JwtToken.verifyToken(token)
      // 验证客户端token是否合法
      if (nickName) {
        // 获取redis中的token
        let redisToken = await redis.get(nickName)
        // 当前的token 是否和 redis中的一致 token 反则 用户可能重新登入或者在林外一台机子登入了
        if (token === redisToken) {
            redis.set(nickName, token, JWT_COMF.JWTEXP) // 继续激活当前token
            next() // 跳转下一个路由
        } else {
          res.json(new ErrorModel('token过期!'))
        }
      } 
    } catch (ex) {
      res.json(new ErrorModel(ex.message))
    }
  } 
}
module.exports = new InterceptAuth()