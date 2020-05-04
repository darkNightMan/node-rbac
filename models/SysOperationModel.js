const Sequelize = require('sequelize')
const db = require('../db/mysql.db')
const {  formatDate } = require('../utils/format')
let SysOperationModel = db.define('sys_operation_logs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false, // 不为空
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER, //字段类型
  },
  nick_name: Sequelize.CHAR(50),
  action_method: {
    type: Sequelize.CHAR(255),
    defaultValue: 'yoyp'
  },
  action_ip:{
    type: Sequelize.CHAR(255),
    defaultValue: '127.0.0.1'
  }, 
  action_params: Sequelize.CHAR(255),
  action_time: {
    type: Sequelize.DATE,
    get() {
      return formatDate(this.getDataValue('action_time'))
    }
  }
}, {
  tableName: 'sys_operation_logs',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: 'action_time', // 不需要createdAt字段
  updatedAt: false, //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})
// db.sync({  
//   force: true // 强制同步
// });
module.exports = SysOperationModel