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
     if (!_data) return res.R.err('USER_NOT_EXITS')
     
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
      let userInfo = {
        user_id: _data.user_id,
        nick_name: _data.nick_name,
        phone: _data.phone,
        login_time: _data.login_time,
        email: _data.email
      }
      let token = JwtToken.createToken(payload) // 签发
      redis.set(nickName, token, JWT_COMF.JWTEXP) //  同步到redis
      res.cookie('nickName', nickName, { maxAge: 900000, httpOnly: true }) // 设置cookie
      res.R.ok({token:token, userInfo: userInfo })
    } catch (ex) {
      res.R.err(ex)
    }
  }
  // 退出
  loginOut(req, res) {

  }
  // 获取用户信息和菜单权限
  async getMenuList (req, res) {
    let userid = req.query['user_id']
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    // 递归遍历菜单
    function menuTree(data) {
        let arr = [] // 存储一级菜单
        function tree(data) {
          data.map((it, idx) => {
            if (it.parent_id) {
              arr.map((i, d) => {
                if (i.res_id === it.parent_id) {
                  i.children = []
                  i.children.push(it)
                }
              })
            } else {
              arr.push(it)
            }
          })
        }
        tree(data)
      return arr
    }
    let _menu = await UserServer.getMenu(userid)
    if (!_menu) return res.R.err('USER_NOT_EXITS')
      res.R.ok({menuList: menuTree(_menu) })
  }
}

module.exports = new UserController()