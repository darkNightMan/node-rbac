const { loginServer } = require('../server/userServer')
const { SuccessModel, ErrorModel }= require('../model/resModle')
const { JWT_COMF } = require('../conf/db')
const redisFn = require('../db/redis')
const jwt = require('jsonwebtoken')
const colors = require('colors')
const secret = 'wangxiping'
  class UserController {
    // 登入
    login (req, res) {
      let phone = req.body.phone
      let password = req.body.password
      loginServer(phone).then(_data => {
        if (_data.phone !== phone) {
          res.json(new ErrorModel('账号错误!'))
        }
        if (_data.password !== password) {
          res.json(new ErrorModel('密码错误!'))
        }
        let payload = {
          id: _data.user_id,
          nickName: _data.nick_name,
          admin: true
         }
        let token = jwt.sign(payload, JWT_COMF.JWTKEY) //3分钟过期// 签发
        console.log(token, 'login')
        redisFn.set(token, _data.user_id, JWT_COMF.JWTEXP) //  同步到redis  
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