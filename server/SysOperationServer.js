
const {
  SysRoleModel,
  SysUserModel,
  SysOperationModel
} = require('../models/TableRelationModel')
// 登入1
class SysOperationServer {
  // 插入
  async insert (data) {
    console.log(data)
    let rows = await SysOperationModel.create(data)
    return rows
  }
  // 列表
  async list (pageParmas, conditions) {
    let where = {}
    if (conditions) {
      if (conditions.user_id !== '' ) {
          where.user_id= conditions.user_id
      }
    } 
    let data = await SysOperationModel.findAndCountAll({
      where,
      distinct:true, //  include 关联会出现重复条数 去重
      // include: [{
      //   model: SysUserModel,
      //   attributes: ['user_id'],
      //   as: 'userInfo',
      //   include: [{
      //     model: SysRoleModel,
      //     through: {
      //       attributes: []
      //     },
      //   }]
      // }],
      order: [
        ['action_time', 'DESC']
      ],
      limit: pageParmas.pageSize,
      offset: pageParmas.limitStart
    })  
    return {
      list: data.rows,
      count: data.count
    } 
  }
}

module.exports = new SysOperationServer()