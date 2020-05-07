
const { SysUserModel }  = require('../models/TableRelationModel')

// 登入1
class UserServer {
  async login(phone) {
    try {
      let data = await SysUserModel.findOne({ where: { phone: phone }})
      console.log(data)
      return data
    } catch (ex) {
      throw new Error(ex)
    }
  }
  // 获取用户信息
  async getUserInfo(userId) {
    try {
      let data = await SysUserModel.findOne({ where: { user_id: userId }})
      return data
    } catch (ex) {
      throw new Error(ex)
    }
  }
}
module.exports = new UserServer()