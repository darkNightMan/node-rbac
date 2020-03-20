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
      let payload = {
        user_id: _data.user_id,
        nickName: _data.nick_name,
        admin: true,
      }
      let token = JwtToken.createToken(payload) // 签发
      redis.set(`token_${_data.user_id}`, token, JWT_COMF.JWTEXP) //  同步到redis
      res.cookie(`token_${_data.user_id}`, _data.user_id, { maxAge: 900000, httpOnly: true }) // 设置cookie
      res.R.ok({token:token })
    } catch (ex) {
      res.R.err(ex)
    }
  }
  // 退出
  loginOut(req, res) {
    let userid = req.userInfo.user_id
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    redis.set(`token_${userid}`, '')
    res.R.ok('退出成功') 
  }
  // 获取用户信息和菜单权限
  async getUserMenuList (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
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
    let _data = await UserServer.getUserInfo(userid)

     let userInfo = {
        user_id: _data.user_id,
        nick_name: _data.nick_name,
        phone: _data.phone,
        login_time: _data.login_time,
        email: _data.email,
        avatar: _data.avatar
      }
    if (!_menu) return res.R.err('USER_NOT_EXITS')
      res.R.ok({menuList: menuTree(_menu), userInfo: userInfo })
  }
}

module.exports = new UserController()