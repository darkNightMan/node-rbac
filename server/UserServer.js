const {
  exec
} = require('../db/mysql.js')

// 登入1
class UserServer {
  async login(phone) {
    let sqlfind = `SELECT user_id, nick_name, phone, password, avatar, email FROM sys_user WHERE phone = ${phone}`
    try {
      let data = await exec(sqlfind)
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
  // 获取用户信息
  async getUserInfo(userId) {
    let sql = `SELECT user_id, nick_name, phone, password, avatar, email FROM sys_user WHERE user_id = ${userId}`
    let row = await exec(sql)
    return row[0]
  }
}

module.exports = new UserServer()