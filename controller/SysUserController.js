

const SysUserServer = require('../server/SysUserServer')
const SysRoleServer = require('../server/SysRoleServer')
const { formatDate } = require('../utils/format')
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
    let _data = await SysUserServer.list() // 用户表
    let roleList = await SysRoleServer.findRoles() // 用户角色关联
    let roleName = await SysRoleServer.list() // 角色名
    _data.map((it1) => {
      roleList.map((it2) => {
        if (it1.user_id === it2.user_id ){ // 匹配表关联的数据
          if(Object.prototype.toString.call(it1.roleList) == '[object Array]') {
            it1.roleList.push(getName(roleName,  it2.role_id))
          } else {
            it1.roleList  = new Array()
            // it1.roleList.push(roleName.filter((r) => r.role_id === it2.role_id))
            it1.roleList.push(getName(roleName,  it2.role_id))
          }
        }
      })
      it1.create_time = formatDate(it1.create_time)
    })
    function getName(roleName, role_id) {
      let nameObj = {}
      roleName.forEach((r) =>{
        if (r.role_id === role_id) {
          nameObj = r
        }
      })
      return nameObj
    }
    if (_data) {
      res.R.ok({userList: _data})
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
      user_id: userid
    } 
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
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