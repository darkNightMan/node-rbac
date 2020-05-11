const UserServer = require('../server/UserServer')
const SysMenuServer = require('../server/SysMenuServer')
const SysRoleServer = require('../server/SysRoleServer')
const SysLogServer = require('../server/SysLogServer')
const http = require('http');
const { JWT_COMF } = require('../conf')
const redis = require('../db/redis')
const JwtToken = require('../utils/authToken')
const colors = require('colors')
const errMsg = require('../utils/err-msg')
const successMsg = require('../utils/success-msg')
const cryptoAuth = require('../utils/crypto')
const svgCaptcha = require('svg-captcha')

class UserController {
  // 登入
  async login(req, res) {
    let phone = req.body.phone
    let password = req.body.password  
    let code = req.body.code
    // 电话
    if (!phone) {
      res.R.err('USER_PHONE_NULL')
    }
    // 密码
    if (!password){
      res.R.err('USER_PASSWORD_NULL')
    }
    // 验证码
    if (code != req.cookies.captcha) {
      res.R.err('USER_CAPTCHA_ERR')
    }
    try {
      let _data = await UserServer.login(phone)
      let dataLog = {
        login_ip: env === 'dev'? req.hostname : req.headers.remoteIP,
        login_address: env === 'dev' ? '本地登入' : '未知',
        login_agent: req.agent
      }
      if (!_data) {
        dataLog.login_description = errMsg['USER_NOT_EXITS'].msg
        await SysLogServer.insert(dataLog)      
        return res.R.err('USER_NOT_EXITS')
      }
      // 密码解密
      if (_data.password !== cryptoAuth.encrypted(password)) {   
        dataLog.login_description = errMsg['USER_PASSWORD_WRONG'].msg   
        await SysLogServer.insert(dataLog)
        return res.R.err('USER_PASSWORD_WRONG')
      }
      let payload = {
        userInfo: _data,
        admin: true,
      }
      dataLog.login_description = successMsg['LOGING_SUCCESS']
      dataLog.user_id = _data.user_id
      dataLog.user_name = _data.nick_name
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
    // 遍历菜单
    function menuEach(menu) {
      let root = menu.filter((it, index) => it.parent_id == 0) //  获取根级
      // let parentMenu = menu.filter((it, index) => !it.parent_id)  //  获取根父级
      root.map((p, i1) => {
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
      return root
    }
    let _menu = await SysMenuServer.getUserMenu(userid)
    let _perms = await SysMenuServer.getUserPer(userid)  
    let _data = await UserServer.getUserInfo(userid)
    function getPerms (perms) {
      let permsArr = []
      perms.map((it) => {
        if (it.perms) {
          permsArr.push(it.perms)
        }
      })
      return permsArr
    }
    let roleArr = [] // 角色集合
    _data.sys_roles.map(it=> roleArr.push(it.role_id))
    let menuList = menuEach(_menu) // 获取菜单树  
    let userInfo = {
      user_id: _data.user_id,
      nick_name: _data.nick_name,
      phone: _data.phone,
      login_time: _data.login_time,
      email: _data.email,
      avatar: _data.avatar,
      role_id: roleArr
    }
    if (!_menu) return res.R.err('USER_NOT_EXITS')
    redis.set(`user_perms_${userid}`, getPerms(_perms).toString(), JWT_COMF.JWTEXP) //  将权限存储到reids
    res.R.ok({
      menuList: menuList,
      userInfo: userInfo,
      perms: getPerms(_perms)
    })
  }
  // 验证码
  captcha (req, res) {
    var captcha = svgCaptcha.create({ 
      // 翻转颜色    
      inverse: false,    
      // 字体大小    
      fontSize: 36,    
      // 噪声线条数    
      noise: 2,    
      // 宽度    
      width: 80,    
      // 高度    
      height: 38,    
     })
    //  保存到req
     req.captcha = captcha.text.toLowerCase()
     console.log(req.captcha); // 生成的验证码
     //保存到cookie 方便前端调用验证   
     res.cookie('captcha', req.captcha, { maxAge: 900000, httpOnly: true } )   
     res.setHeader('Content-Type', 'image/svg+xml')
     res.write(String(captcha.data))
     res.end()
  }
}
module.exports = new UserController()