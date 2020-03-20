const { exec } = require ('../db/mysql.js')

  // 登入

  class UserServer {
    async login (phone) {
      let sqlfind = `SELECT user_id, nick_name, phone, password, login_time, avatar, email from sys_user WHERE phone = ${phone}`
      let sqlset = `update sys_user set login_time=now() WHERE phone = ${phone}`
      try {
        let data = await exec(sqlfind)
        let row = await exec(sqlset)
        return data[0]
      } catch (ex) {
        throw new Error(ex);
      }
    }
    async testSql () {
      let sql = 'select sys_resource.*  from sys_user_role, sys_role_permmision, sys_resource  where user_id = 1 group by res_id'
      let row = await exec(sql)
      return row
    }
    
    async getMenu (userId) {
      let sql = `select sys_resource.*  from sys_user_role, sys_role_permmision, sys_resource  where user_id =${userId} group by res_id`
      let row = await exec(sql)
      return row
    }
    async getUserInfo (userId) {
      let sql = `SELECT user_id, nick_name, phone, password, login_time, avatar, email from sys_user WHERE user_id = ${userId}`
      let row = await exec(sql)
      return row[0]
    }
  }

  module.exports = new UserServer()