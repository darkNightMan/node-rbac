
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
    let data = await SysOperationModel.findAndCountAll({
      distinct:true, //  include 关联会出现重复条数 去重
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