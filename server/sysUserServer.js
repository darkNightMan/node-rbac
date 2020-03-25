const {
  exec
} = require('../db/mysql.js')


// 用户
class SysUserServer {
   // 获取的用户
   async getAllUser() {
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
    let insertSql = `INSERT INTO sys_user_role (user_id, role_id) VALUES ${getValues(row.insertId, userInfo.role_id)}`
    let role = await exec(insertSql)
    return insertSql 
  }
  async updateUser () {
    
  }
  async deleteUser () {
    
  }

}
module.exports = new SysUserServer()
