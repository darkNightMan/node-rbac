const UserServer = require('../server/UserServer')
const { SuccessModel, ErrorModel }= require('../model/resModle')
const { JWT_COMF } = require('../conf/db')
const redis = require('../db/redis')
const JwtToken = require('../utils/authToken')
const colors = require('colors')
const secret = 'wangxiping'
  class UserController {
    // 登入
     login (req, res) {
      let phone = req.body.phone
      let password = req.body.password
      UserServer.login(phone).then(_data => {
        let nickName = _data.nick_name
        if (_data.phone !== phone) {
          res.json(new ErrorModel('账号错误!'))
        }
        if (_data.password !== password) {
          res.json(new ErrorModel('密码错误!'))
        }
        let payload = {
          user_id: _data.user_id,
          nickName: _data.nick_name,
          admin: true,
         }
        let token = JwtToken.createToken(payload) // 签发
        redis.set(nickName, token, JWT_COMF.JWTEXP) //  同步到redis
        res.cookie('nickName', nickName,{maxAge: 900000, httpOnly: true}) // 设置cookie
        res.json(new SuccessModel({token : token, userid: _data.user_id}, '登入成功'))
      })
    }
    // 退出
    loginOut (req, res) {

    }
    // 获取用户信息
    getUserInfo (req, res) {

    }
  }

module.exports = new UserController()