const {
  exec
} = require('../db/mysql.js')


// 菜单
class SysMenuServer {
  // 获取菜单列表
  async getResourceList() {
    let sql = `SELECT * FROM sys_resource;`
    let data = await exec(sql)
    return data
  }
  // 获取所有菜单树
  async getTreeMenu() {
    let sql = `SELECT	sys_resource.res_id,  sys_resource.parent_id, sys_resource.res_name FROM sys_resource;` 
    let data = await exec(sql)
    return data
  }
  // 当前用户的菜单
  async getMenu(userId) {
    let sql = `SELECT	sys_resource.*  FROM  sys_user_role
      INNER JOIN sys_role_permmision ON sys_user_role.role_id = sys_role_permmision.role_id
      INNER JOIN sys_resource ON sys_role_permmision.res_id = sys_resource.res_id
      WHERE user_id = ${userId} GROUP BY res_id`
      let row = await exec(sql)
    return row
  }
  async insertMenu (data) {
    let sql = `INSERT INTO sys_resource (parent_id, res_name, res_code, component, description, create_time, res_icon, sort, type) 
    VALUES (${data.parent_id ? data.parent_id : 0},'${data.res_name}','${data.res_code}','${data.component}','${data.description}',now(),'${data.res_icon}', 0, 0
    )`
    let row = await exec(sql)
    return row
  }
  async updatedMenu (data) {
    let sql = `UPDATE sys_resource SET sort = 0, type = 0, parent_id= ${data.parent_id}, res_name = '${data.res_name}', res_code= '${data.res_code}', res_icon= '${data.res_icon}', description = '${data.description}', component= '${data.component}' WHERE res_id = ${data.res_id}`
    let row = await exec(sql)
    return row
  }
  async deleteMenu (res_id) {
    let sql = `DELETE FROM sys_resource WHERE  res_id = ${res_id}`
    let row = await exec(sql)
    return row
  }
}
module.exports = new SysMenuServer()
