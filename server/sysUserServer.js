const {
  exec
} = require('../db/mysql.js')


// 用户
class sysUserServer {
   // 获取的用户
   async getAllUser() {
    let sql = `SELECT * FROM sys_user`
    let row = await exec(sql)
    return row
  }

}
module.exports = new sysUserServer()
