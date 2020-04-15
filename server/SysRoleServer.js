
const {
  exec
} = require('../db/mysql.js')
// 角色
class SysRoleServer {
  // 获取当前角色的权限
  async getRolePer (role_id){   
    let sql = `SELECT sys_role_permmision.res_id FROM sys_role_permmision WHERE role_id = ${role_id};`
    let row = await exec(sql)
    return row
  }
  // 给角色设置权限
  async setRolePer (roleid, residArr) {
    function getValues(params) {
      let values = ''
      residArr.forEach((res_id) => {
        values+=`(${roleid},${res_id}),`
      })
      return values.replace(/,$/gi, '')
    }
    let deletSql = `DELETE FROM sys_role_permmision WHERE role_id = ${roleid};`
    let insertSql = `INSERT INTO sys_role_permmision (role_id, res_id) VALUES ${getValues(residArr)}`
    let isDelete = await exec(deletSql) // 先将所有的删除
    if (isDelete && residArr.length > 0) {
      let isInsert = await exec(insertSql)// 再插入数据
    }
    if (isDelete) {
      return true
    }
  }
  // 获取所有的角色
  async getAllRole() {
    let sql = `SELECT * FROM sys_role`
    let row = await exec(sql)
    return row
  }
  
  // 创建角色
  async createRole (name, code) {
    let sql = `INSERT INTO sys_role (role_name, role_code) VALUES ('${name}', '${code}')` 
    let data = await exec(sql) 
    return data
  }
  // 更新角色
  async updateRole (roleId, name, code) {
    let sql = `UPDATE sys_role SET role_code='${code}', role_name='${name}' WHERE role_id=${roleId}` 
    let data = await exec(sql) 
    return data
  }
  // 删除角色
  async daleteRole (roleId) {
    let sql = `DELETE FROM sys_role WHERE role_id = ${roleId}`   
    let data = await exec(sql) 
    return data
  }
  async findRoles (userid) {
    let sql = userid ? `SELECT role_id, user_id FROM sys_user_role WHERE user_id =${userid}` : `SELECT * FROM sys_user_role`
    let data = await exec(sql) 
    return data
  }
}
module.exports = new SysRoleServer()