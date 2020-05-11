
const { SysUserModel, SysRoleModel } = require('../models/TableRelationModel')

// 登入1
class UserServer {
  async login(phone) {
    try {
      let data = await SysUserModel.findOne({
        where: { phone: phone }
      })
      return data
    } catch (ex) {
      throw new Error(ex)
    }
  }
  // 获取用户信息
  async getUserInfo(userId) {
    try {
      let data = await SysUserModel.findOne({
        where: { user_id: userId },
        include: [{
          model: SysRoleModel,
          attributes: ['role_id'],
          through: {
            attributes: []
          }, // 排除中间表
        }]
      })
      return data.toJSON()
    } catch (ex) {
      throw new Error(ex)
    }
  }
}
module.exports = new UserServer()