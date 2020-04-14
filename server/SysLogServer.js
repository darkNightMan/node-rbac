const {
  exec
} = require('../db/mysql.js')

// 登入1
class SysLogServer {
  async insert (data) {  
    let inserData = Object.assign({
      user_id: '',
      user_name: '',
      login_time: '',
      login_ip: '',
      login_address: '',
      login_description: ''
    }, data)
    let sql = `INSERT INTO sys_login_logs (user_id, user_name, login_time, login_ip, login_address, login_description) VALUES(
      ${inserData.user_id},    
      '${inserData.user_name}',
      now(),
      '${inserData.login_ip}',
      '${inserData.login_address}',
      '${inserData.login_description}'
    )`
    let row = await exec(sql)
    return row[0]
  }
}

module.exports = new SysLogServer()