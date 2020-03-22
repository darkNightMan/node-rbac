const {
  exec
} = require('../db/mysql.js')

// 登入
class UserServer {
  async login(phone) {
    let sqlfind = `SELECT user_id, nick_name, phone, password, login_time, avatar, email FROM sys_user WHERE phone = ${phone}`
    let sqlset = `update sys_user set login_time=now() WHERE phone = ${phone}`
    try {
      let data = await exec(sqlfind)
      let row = await exec(sqlset)
      let user_id = await (data)
      return data[0]
    } catch (ex) {
      throw new Error(ex)
    }
  }
  // 测试
  async testSql() {
    let sql = 'select sys_resource.*  FROM sys_user_role, sys_role_permmision, sys_resource  where user_id = 1 group by res_id'
    let row = await exec(sql)
    return row
  }
  // 获取菜单
  async getMenu(userId) {
    let sql = `SELECT	sys_resource.*  FROM  sys_user_role
        INNER JOIN sys_role_permmision ON sys_user_role.role_id = sys_role_permmision.role_id
        INNER JOIN sys_resource ON sys_role_permmision.res_id = sys_resource.res_id
        WHERE user_id = ${userId} GROUP BY res_id`
    let row = await exec(sql)
    return row
  }
  // 获取用户信息
  async getUserInfo(userId) {
    let sql = `SELECT user_id, nick_name, phone, password, login_time, avatar, email FROM sys_user WHERE user_id = ${userId}`
    let row = await exec(sql)
    return row[0]
  }
  // 获取的用户
  async getAllUser() {
    let sql = `SELECT * FROM sys_user`
    let row = await exec(sql)
    return row
  }
  // 获取所有的角色
  async getAllRole() {
    let sql = `SELECT * FROM sys_role`
    let row = await exec(sql)
    return row
  }
  async setUserPer (user_id) {

  }
}

module.exports = new UserServer()