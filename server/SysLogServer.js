const {
  exec
} = require('../db/mysql.js')
const {
  Op, 
  SysRoleModel,
  SysLoginLogsModel
} = require('../models/TableRelationModel')
// 登入1
class SysLogServer {
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
  async list (pageParmas, conditions) {
    console.log(conditions)
    let where = {}
    if (conditions) {
      if (conditions.user_id !== '' ) {
          where[user_id] = user_id
      }
    }   
    let data = await SysLoginLogsModel.findAndCountAll({
      where,
      include: [{
        model: SysRoleModel,
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