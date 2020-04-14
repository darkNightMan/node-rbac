const {
  exec
} = require('../db/mysql.js')

// 登入1
class SysLogServer {
  insert (data) {
    let sql = `INSERT INTO sys_loging_log(user_log_id, user_name, login_time, login_ip, login_address, user_role) VALUES(
      ${data.user_id},
      now(),
      ${data.user_id},
      ${data.user_id},
      ${data.user_id},
    )`
  }
}

module.exports = new SysLogServer()