

const SysLogServer = require('../server/SysLogServer')
const SysRoleServer = require('../server/SysRoleServer')
const { formatDate } = require('../utils/format')
class SysLoginLogsController {
  async list (req, res) {
    let user_id = req.query.user_id
    let _data = await SysLogServer.list(user_id)
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
        it1.login_time = formatDate(it1.login_time)
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
    res.R.ok(_data)
  }
}
module.exports = new SysLoginLogsController()