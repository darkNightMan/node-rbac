
const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')
const colors = require('colors') // https://github.com/Marak/colors.js
// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行sql 函授
function exec (sql) {
  const promise = new Promise((resolve, reject) => {
    console.log(colors.magenta('sql执行：=>', sql))
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }    
      resolve(result)
    })  
  })
  return promise
}

module.exports = {
  exec
}
