
const {
  SysRoleModel,
  SysUserModel,
  SysLoginLogsModel
} = require('../models/TableRelationModel')
// 登入1
class SysOperationServer {
  // 插入
  async insert (data) {  
    let inserData = Object.assign({
      user_id: null,
      user_name: '',     
      login_ip: '',
      login_address: '',
      login_description: ''
    }, data) 
    let rows = await SysLoginLogsModel.create(inserData)
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
    let data = await SysLoginLogsModel.findAndCountAll({
      where,
      distinct:true, //  include 关联会出现重复条数 去重
      include: [{
        model: SysUserModel,
        attributes: ['user_id'],
        as: 'userInfo',
        include: [{
          model: SysRoleModel,
          through: {
            attributes: []
          },
        }]
      }],
      order: [
        ['login_time', 'DESC']
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
module.exports = new SysLogServer()