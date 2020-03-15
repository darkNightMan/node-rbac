const { exec } = require ('../db/mysql.js')

  // 登入
  const login = (phone) => {
    let sql = `select user_id, nick_name, phone, password, login_time from sys_user where phone = ${phone}`
    return exec(sql).then(rows => {
      return rows[0] || {}
    })
  }
module.exports = {
  login
}