const Sequelize = require('sequelize')
const db = require('../db/mysql.db')
const {  formatDate } = require('../utils/format')
let SysLoginLogsModel = db.define('sys_login_logs', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false, // 不为空
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER, //字段类型
  },
  login_ip: Sequelize.CHAR(255),
  login_address: Sequelize.CHAR(50),
  login_description: {
    type: Sequelize.CHAR(255),
    defaultValue: 'yoyp'
  },
  user_name: Sequelize.CHAR(50),
  login_agent: Sequelize.CHAR(255),
  login_agent_info: Sequelize.CHAR(255),
  login_time: {
    type: Sequelize.DATE,
    get() {
      return formatDate(this.getDataValue('login_time'))
    }
  }
}, {
  tableName: 'sys_login_logs',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: 'login_time', // 不需要createdAt字段
  updatedAt: false, //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})

module.exports = SysLoginLogsModel