const Sequelize = require('sequelize')
const db = require('../db/mysql.db')
const SysUserRoleModel = require('./SysUserRoleModel')
let SysRoleModel = db.define('sys_role', {
  role_id: {
    type: Sequelize.INTEGER, //字段类型
    primaryKey: true,
    allowNull: false, // 不为空
    autoIncrement: true
  },
  role_code: Sequelize.CHAR(32),
  role_name: Sequelize.CHAR(32)
}, {
  tableName: 'sys_role',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: false, // 不需要createdAt字段
  updatedAt: false, //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})

module.exports = SysRoleModel