const UserServer = require('../server/UserServer')
const { JWT_COMF } = require('../conf/db')
const redis = require('../db/redis')
const JwtToken = require('../utils/authToken')
const colors = require('colors')

class UserController {
  // 登入
  async login(req, res) {
    let phone = req.body.phone
    let password = req.body.password

    if (!phone) res.R.err('USER_PHONE_NULL')
    if (!password) res.R.err('USER_PASSWORD_NULL')

    try {
      let _data = await UserServer.login(phone)
      if (!_data) throw 'USER_NOT_EXITS'
      // if (_data.phone !== phone) {
      //   res.R.err('USER_PASSWORD_WRONG')
      //   return false
      // }
      if (_data.password !== password) {       
        res.R.err('USER_PASSWORD_WRONG')
        return false
      }
      let nickName = _data.nick_name
      let payload = {
        user_id: _data.user_id,
        nickName: _data.nick_name,
        admin: true,
      }
      let token = JwtToken.createToken(payload) // 签发
      redis.set(nickName, token, JWT_COMF.JWTEXP) //  同步到redis
      res.cookie('nickName', nickName, { maxAge: 900000, httpOnly: true }) // 设置cookie
      res.R.ok({token:token})
    } catch (ex) {
      res.R.err(ex)
    }
  }
  // 退出
  loginOut(req, res) {

  }
  // 获取用户信息
  getUserInfo(req, res) {

  }
}

module.exports = new UserController()