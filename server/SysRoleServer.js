const {
  exec
} = require('../db/mysql.js')
const {
  Op,
  SysRoleModel,
  SysUserModel,
  SysRolePermmisionModel
} = require('../models/TableRelationModel')
// 角色
class SysRoleServer {
  // 当前角色的权限集合
  async getRolePer(roleid) {
    let row = await SysRolePermmisionModel.findAll({
      attributes: ['res_id'],
      where: {
        role_id: roleid
      }
    })
    return row
  }
  // 给角色设置权限
  async setRolePer(roleid, residArr) {
    let role_update = []
    residArr.map((i) => {
      role_update.push({
        res_id: i,
        role_id: roleid
      })
    })
    let del = await SysRolePermmisionModel.destroy({
      where: {
        role_id: roleid
      }
    })
    let row = await SysRolePermmisionModel.bulkCreate(role_update)
    return true
  }
  // 列表
  async list() {
    let rows = await SysRoleModel.findAll()
    return rows
  }
  // 创建角色
  async createRole(name, code) {
    let data = await SysRoleModel.create({
      role_name: name,
      role_code: code,
    })
    return data
  }
  // 更新角色
  async updateRole(roleId, name, code) {
    let data = await SysRoleModel.update({
      role_name: name,
      role_code: code,
    }, {
      where: {
        role_id: roleId
      }
    })
    return data
  }
  // 删除角色
  async daleteRole(roleId) {
    let data = await SysRoleModel.destroy({
      where: {
        role_id: roleId
      }
    })
    return data
  }
  async findRoles(userid) {
    let sql = userid ? `SELECT role_id, user_id FROM sys_user_role WHERE user_id =${userid}` : `SELECT * FROM sys_user_role`
    let data = await exec(sql)
    return data
  }
}
module.exports = new SysRoleServer()