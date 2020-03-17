const { exec } = require ('../db/mysql.js')

  // 登入

  class UserServer {
    async login (phone) {
      let sql = `SELECT user_id, nick_name, phone, password, login_time from sys_user WHERE phone = ${phone}`
      let row = await exec(sql)
      return row[0]
    }
    async testSql () {
      let sql = 'select sys_resource.*  from sys_user_role, sys_role_permmision, sys_resource  where user_id = 1 group by `res_id`'
      let row = await exec(sql)
      return row
    }
  }

  module.exports = new UserServer()