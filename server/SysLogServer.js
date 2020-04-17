const {
  exec
} = require('../db/mysql.js')

// 登入1
class SysLogServer {
  async insert (data) {  
    let inserData = Object.assign({
      user_id: null,
      user_name: '',
      login_time: '',
      login_ip: '',
      login_address: '',
      login_description: ''
    }, data)
    let sql = `INSERT INTO sys_login_logs (user_id, user_name, login_time, login_ip, login_address, login_description, login_agent) VALUES(
      ${inserData.user_id},    
      '${inserData.user_name}',
      now(),
      '${inserData.login_ip}',
      '${inserData.login_address}',
      '${inserData.login_description}',
      '${inserData.login_agent}'
    )`
    let row = await exec(sql)
    return row[0]
  }
  async list (pageParmas, conditions) {
    let sql = `SELECT * FROM sys_login_logs`
    let sqlArr = [] 
    let sqltotal = `SELECT COUNT(id) AS count FROM sys_login_logs`
    let sqltotalArr = []
    if (conditions.user_id) {
      let userid = conditions.user_id
      sql += ` WHERE user_id = ? `
      sqltotal += ` WHERE user_id = ? `
      sqltotalArr.push(userid)
      sqlArr.push(userid)
    }
    sql += ` LIMIT ?, ? `
    sqlArr.push(pageParmas.limitStart, pageParmas.pageSize)
    sqltotalArr.push(pageParmas.limitStart, pageParmas.pageSize)
    let list = await exec(sql,sqlArr)
    let total = await exec(sqltotal, sqltotalArr)
    return {
      list,
      total
    }
  }
}

module.exports = new SysLogServer()