const UserServer = require('../server/UserServer')
const SysMenuServer = require('../server/SysMenuServer')
const SysRoleServer = require('../server/SysRoleServer')
const SysLogServer = require('../server/SysLogServer')
const http = require('http');
const {
  JWT_COMF
} = require('../conf/db')
const redis = require('../db/redis')
const JwtToken = require('../utils/authToken')
const colors = require('colors')
const errMsg = require('../utils/err-msg')
class UserController {
  // 登入
  async login(req, res) {
   
    let phone = req.body.phone
    let password = req.body.password  
    
    if (!phone) {
      res.R.err('USER_PHONE_NULL')
    }
    if (!password){
      res.R.err('USER_PASSWORD_NULL')
    }

    try {
      let _data = await UserServer.login(phone)
      let dataLog = {
        user_id: _data.user_id,
        user_name: _data.nick_name,
        login_ip: env === 'dev'? req.hostname : req.headers.remoteIP,
        login_address: env === 'dev' ? '本地登入' : '未知',
      }
      if (!_data) {
        dataLog.login_description = errMsg['USER_NOT_EXITS'].msg
        await SysLogServer.insert(dataLog)      
        return res.R.err('USER_NOT_EXITS')
      }
      if (_data.password !== password) {   
        dataLog.login_description = errMsg['USER_PASSWORD_WRONG'].msg   
        await SysLogServer.insert(dataLog)
        return res.R.err('USER_PASSWORD_WRONG')
      }
      let payload = {
        user_id: _data.user_id,
        nickName: _data.nick_name,
        admin: true,
      }
      dataLog.login_description = '登入成功'
      let logrow = await SysLogServer.insert(dataLog)
      let token = JwtToken.createToken(payload) // 签发
      redis.set(`token_${_data.user_id}`, token, JWT_COMF.JWTEXP) //  同步到redis
      res.cookie(`token_${_data.user_id}`, _data.user_id, { maxAge: 900000, httpOnly: true }) // 设置cookie
      res.R.ok({ token: token })
    } catch (ex) {
      console.log(ex)
      // res.R.err(ex)
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
  // 获取登录用户信息和菜单权限
  async getUserMenuList(req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    // 遍历菜单
    function menuEach(menu) {
      // let root = menu.filter((it, index) => it.parent_id == null) //  获取根级
      let parentMenu = menu.filter((it, index) => !it.parent_id)  //  获取根父级
      parentMenu.map((p, i1) => {
        menu.map((c, i2) => {
          if (p.res_id == c.parent_id) {
            if (Object.prototype.toString.call(p.children) == '[object Array]') {
              p.children.push(c)
            } else {
              p.children = new Array()
              p.children.push(c)
            }
          }
        })
      })
      return parentMenu
    }
    let _menu = await SysMenuServer.getMenu(userid)
    let _data = await UserServer.getUserInfo(userid)

    let menuList = menuEach(_menu) // 获取菜单树  
    let userInfo = {
      user_id: _data.user_id,
      nick_name: _data.nick_name,
      phone: _data.phone,
      login_time: _data.login_time,
      email: _data.email,
      avatar: _data.avatar
    }
    if (!_menu) return res.R.err('USER_NOT_EXITS')
    res.R.ok({
      menuList: menuList,
      userInfo: userInfo
    })
  }
}
module.exports = new UserController()