const {
  Op,
  SysUserModel,
  SysRoleModel
} = require('../models/TableRelationModel')

// 用户
class SysUserServer {
  // 获取的用户
  async list(pageParmas, conditions) {
    let where = {}
    if (conditions) {
      if (conditions.treeId) {
        where[Op.or] = [{
            parent_id: conditions.treeId
          },
          {
            res_id: conditions.treeId
          },
        ]
      }
    }
    let _data = await SysUserModel.findAndCountAll({
      where,
      attributes: {
        exclude: ['password'],
      },
      distinct:true,
      include: [{
        model: SysRoleModel,
        through: {
          attributes: []
        }, // 排除中间表
      }],
      limit: pageParmas.pageSize,
      offset: pageParmas.limitStart
    })
    return {
      list: _data.rows,
      count: _data.count
    }
  }
  // 添加用户
  async createUser(userInfo) {
    let user = await SysUserModel.create({
      nick_name: userInfo.nick_name,
      password: userInfo.password,
      email: userInfo.email,
      phone: userInfo.phone,
      avatar: userInfo.avatar,
      create_time: userInfo.create_time,
      update_id: userInfo.update_id,
    })
    let roles = await SysRoleModel.findAll({
      where: {
        role_id: userInfo.role_id
      }
    })
    let row = await user.addSys_roles(roles)
    return true
  }
  // 更新用户
  async updateUser(data) {
    let roles = await SysRoleModel.findAll({
      where: {
        role_id: data.role_id
      }
    })
    let user = await SysUserModel.findByPk(data.user_id) //  通过主键查询
    await user.update({
      nick_name: data.nick_name,
      password: data.password,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      create_time: data.create_time,
      update_id: data.update_id,
    })
    let row = await user.setSys_roles(roles)
    return true
  }
  // 删除用户
  async deleteUser(user_id) {
    let row = await SysUserModel.destroy({
      where: {
        user_id: user_id
      }
    })
    return true
  }
}
module.exports = new SysUserServer()