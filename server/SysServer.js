const {
  exec
} = require('../db/mysql.js')


// 系统
class SysServer {
  // 获取菜单列表
  async getResourceList() {
    let sql = `SELECT * FROM sys_resource`
    let data = await exec(sql)
    return data
  }
  // 获取菜单树
  async getTreeMenu() {
    let sql = `SELECT	sys_resource.res_id,  sys_resource.parent_id, sys_resource.res_name FROM sys_resource` 
    let data = await exec(sql)
    return data
  }
  // async getUserPer (role_id){   
  //   let sql = `SELECT sys_role_permmision.res_id FROM sys_role_permmision WHERE role_id = ${role_id}`
  //   let row = await exec(sql)
  //   return row
  // }
  
}

module.exports = new SysServer()