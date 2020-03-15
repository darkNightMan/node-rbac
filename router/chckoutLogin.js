
const { SuccessModel, ErrorModel }= require('../model/resModle')
const { JWT_COMF } = require('../conf/db')
const colors = require('colors')
const jwt = require('jsonwebtoken')
const redisFn = require('../db/redis')
module.exports = function (app) {
  //登录拦截器
  app.use(function (req, res, next) {
    var url = req.originalUrl;
    let token = req.headers.token
    if (url === "/api/login") {
        next()
    } else {
      if (token) {
        jwt.verify(token ,JWT_COMF.JWTKEY,{ complete: true }, (err, decode) => {
          if (err) { //  时间失效的 伪造的token   
            res.json(new ErrorModel('token无效!'))
          } else {
            redisFn.get(token).then((varToken) => {
              if (varToken) {
                redisFn.set(token, varToken, JWT_COMF.JWTEXP) //  继续激活token
                next()
              } else {
                res.json(new ErrorModel('token过期!'))
              }
            })
          }
        })
      } else {
        res.json(new ErrorModel('还未登入!'))
      }
    }
  });
}