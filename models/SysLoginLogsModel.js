const Sequelize = require('sequelize')
const db = require('../db/mysql.db')

let SysLoginLogsModel = db.define('sys_login_logs', {
  user_id: {
    type: Sequelize.INTEGER, //字段类型
    allowNull: false, // 不为空
  },
  login_ip: Sequelize.CHAR(255),
  login_address: Sequelize.CHAR(50),
  login_description: Sequelize.CHAR(50),
  user_name: Sequelize.CHAR(50),
  login_agent: Sequelize.CHAR(255),
  login_agen_info: Sequelize.CHAR(255)
}, {
  tableName: 'sys_login_logs',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: 'login_time', // 不需要createdAt字段
  updatedAt: false, //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})

module.exports = SysLoginLogsModel