const {
  exec
} = require('../db/mysql.js')

const { SysUserModel }  = require('../models/TableRelationModel')

// 登入1
class UserServer {
  async login(phone) {
    try {
      let data = await SysUserModel.findOne({ where: { phone: phone }})
      return data.dataValues
    } catch (ex) {
      throw new Error(ex)
    }
  
  }
  // 获取用户信息
  async getUserInfo(userId) {
    try {
      let data = await SysUserModel.findOne({ where: { user_id: userId }})
      return data.dataValues
    } catch (ex) {
      throw new Error(ex)
    }
    let sql = `SELECT user_id, nick_name, phone, password, avatar, email FROM sys_user WHERE user_id = ${userId}`
    let row = await exec(sql)
    return row[0]

    // try {
    //   let data = await SysUserModel.findOne({ where: { user_id: userId }})
    //   console.log(data, '===================================')
    //   return data.dataValues
    // } catch (ex) {
    //   throw new Error(ex)
    // }
  }
}

module.exports = new UserServer()