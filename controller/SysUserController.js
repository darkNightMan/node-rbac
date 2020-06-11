

const SysUserServer = require('../server/SysUserServer')
const SysRoleServer = require('../server/SysRoleServer')
const { formatDate } = require('../utils/format')
const CryptoAuth = require('../utils/crypto')
const { offsetPage } = require('../utils/offsetPage')
const { SALTKEY } = require('../conf')
class SysUserController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.R.ok(data)
  }
   // 获取所有用户列表
  async list (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await SysUserServer.list(pageParams, conditions) // 用户表  
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
  // 创建用户
  async createUser (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let userInfo = {
      nick_name: req.body.nick_name,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email || '',
      avatar: req.body.avatar || '',
      role_id: req.body.role_id,
      update_id: userid
    }
    // 密码加密
    userInfo.password = CryptoAuth.encrypted(userInfo.password)
    let _data = await SysUserServer.createUser(userInfo) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新用户
  async updateUser (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let data = req.body
    data.update_id = userid
    let _data = await SysUserServer.updateUser(data) // 更新
    res.R.ok(_data)
  }
  async deleteUser (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let user_id = req.body.user_id
    let _data = await SysUserServer.deleteUser(user_id) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new SysUserController()