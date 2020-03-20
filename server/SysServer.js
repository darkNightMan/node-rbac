const { exec } = require ('../db/mysql.js')

  // 登入

  class SysServer {
    async getResourceList () {
      let sql = `SELECT * FROM sys_resource`
      let data = await exec(sql)
      return data
    }
  }

  module.exports = new SysServer()