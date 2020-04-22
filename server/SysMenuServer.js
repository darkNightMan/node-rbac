const {
  exec
} = require('../db/mysql.js')


// 菜单
class SysMenuServer {
  // 获取菜单列表
  async list(pageParmas, conditions) {
    let sqlist = `SELECT * FROM sys_resource LIMIT ?, ? `
    let sqltotal = `SELECT COUNT(res_id) AS count FROM sys_resource;`
    if (conditions) { // 如果存在条件查询
     
    }
    let list = await exec(sqlist, [pageParmas.limitStart, pageParmas.pageSize])
    let total = await exec(sqltotal)
    return {   
      list,
      total
    }
  }
  async selectMenuList () {
    let sql = `SELECT res_name, res_id, parent_id FROM sys_resource;`
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
      WHERE user_id = ${userId} AND type < 3  GROUP BY res_id`
      let row = await exec(sql)
    return row
  }
  async insertMenu (data) {
    let sql = `INSERT INTO sys_resource (parent_id, res_name, res_code, component, description, create_time, res_icon, sort, type, perms) 
    VALUES (${data.parent_id},'${data.res_name}','${data.res_code}','${data.component}','${data.description}',now(),'${data.res_icon}', ${data.sort}, ${data.type}, '${data.perms}'
    )`
    let row = await exec(sql)
    return row
  }
  async updatedMenu (data) {
    let sql = `UPDATE sys_resource SET sort = ${data.sort}, type = ${data.type}, state = ${data.state}, parent_id= ${data.parent_id}, res_name = '${data.res_name}', res_code= '${data.res_code}', res_icon= '${data.res_icon}', description = '${data.description}', component= '${data.component}', perms='${data.perms}' WHERE res_id = ${data.res_id}`
    let row = await exec(sql)
    return row
  }
  // 删除菜单
  async deleteMenu (res_id) {
    const del = async(resid) => {
      let row = await exec(`SELECT * FROM sys_resource WHERE parent_id = ${resid}`) // 查询是否有关联的子菜单
      if (row.length > 0) { // 如果存在子子菜单递归删除
        await exec(`DELETE FROM sys_resource WHERE parent_id = ${resid}`)
        return del(resid)
      } else { // 如果没有子菜单则删除当前菜单
        return await exec(`DELETE FROM sys_resource WHERE res_id = ${resid}`)
      }
    }   
    let row = await del(res_id)
    return row
  }
}
module.exports = new SysMenuServer()
