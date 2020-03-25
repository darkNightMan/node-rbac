

const SysUserServer = require('../server/SysUserServer')
const SysRoleServer = require('../server/SysRoleServer')
class SysUserController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.R.ok(data)
  }
   // 获取所有用户列表
  async getAllUser (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await SysUserServer.getAllUser() // 用户表
    let roleList = await SysRoleServer.findRoles() // 用户角色关联
    let roleName = await SysRoleServer.getAllRole() // 角色名
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

  async createUser (req, res) {
    let userInfo = {
      nick_name: req.body.nick_name,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email || '',
      avatar: req.body.avatar || '',
      role_id: req.body.role_id   
    }
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await SysUserServer.createUser(userInfo) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  async updateUser (req, res) {
    
  }
  async deleteUser (req, res) {
    
  }
}
module.exports = new SysUserController()