

const sysUserServer = require('../server/sysUserServer')
const SysRoleServer = require('../server/SysRoleServer')
class SysUserController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.R.ok(data)
  }
   // 获取所有用户
  async getAllUser (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await sysUserServer.getAllUser()
    let roleList = await SysRoleServer.findRoles()
    _data.map((it1) => {
      roleList.map((it2) => {
        if (it1.user_id === it2.user_id ){          
          if(Object.prototype.toString.call(it1.roleList) == '[object Array]') {
            it1.roleList.push({role_id: it2.role_id})
          } else {
            it1.roleList  = new Array()
            it1.roleList.push({role_id: it2.role_id})
          }
        }
      })
    })
    if (_data) {
      res.R.ok({userList: _data})
    }
  }
}
module.exports = new SysUserController()