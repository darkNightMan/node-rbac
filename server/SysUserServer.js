const {
  exec
} = require('../db/mysql.js')


// 用户
class SysUserServer {
   // 获取的用户
   async list() {
    let sql = `SELECT * FROM sys_user`
    let row = await exec(sql)
    return row
  }
  async createUser (userInfo) {
    function getValues(id, arr) {
      let values = ''
      arr.forEach((roleid) => {
        values+=`(${id},${roleid}),`
      })
      return values.replace(/,$/gi, '')
    }
    let sql = `INSERT INTO sys_user (nick_name, password, email, phone, avatar) 
    VALUES ('${userInfo.nick_name}','${userInfo.password}','${userInfo.email}',${userInfo.phone},'${userInfo.avatar}')`  
    let row = await exec(sql)     
    let updateRole = await SysUserServer.setUserRole(row.insertId, userInfo.role_id)
    return true 
  }
  // 更新用户1
  async updateUser (data) {
    let usersql = `UPDATE sys_user SET 
      nick_name = '${data.nick_name}', 
      password = '${data.password}', 
      email = '${data.email}', 
      phone = '${data.phone}', 
      avatar = '${data.avatar}' WHERE user_id = ${data.user_id}`
      let sqlRole = `DELETE FROM sys_user_role WHERE user_id = ${data.user_id}`
      let dataUser = await exec(usersql)
      let delrole = await exec(sqlRole)
      let updateRole = await SysUserServer.setUserRole(data.user_id, data.role_id)
      return true
  }
  // 删除用户2
  async deleteUser (user_id) {
    let sqluser = `DELETE FROM sys_user  WHERE user_id = ${user_id}`
    let sqlRole = `DELETE FROM sys_user_role WHERE user_id = ${user_id}`
    let delrole = await exec(sqlRole)
    let deluser = await exec(sqluser)
    return true
  }
  // 更新用户角色
  static setUserRole(userid, roleArr) {
    function getValues(id, arr) {
      let values = ''
      arr.forEach((roleid) => {
        values+=`(${id},${roleid}),`
      })
      return values.replace(/,$/gi, '')
    }
    let insertSql = `INSERT INTO sys_user_role (user_id, role_id) VALUES ${getValues(userid, roleArr)}`  
    return exec(insertSql)
  }
}
module.exports = new SysUserServer()
