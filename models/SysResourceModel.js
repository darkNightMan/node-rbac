const Sequelize = require('sequelize')
const db = require('../db/mysql.db')
let SysRoleModel = db.define('sys_resource', {
  res_id: {
    type: Sequelize.INTEGER, //字段类型
    primaryKey: true,
    allowNull: false, // 不为空
    autoIncrement: true
  },
  parent_id: Sequelize.INTEGER,
  res_name: Sequelize.CHAR(50),
  res_icon: Sequelize.CHAR(50),
  state: Sequelize.TINYINT,
  res_code: Sequelize.CHAR(50),
  type: Sequelize.TINYINT,
  component: Sequelize.CHAR(50),
  description: Sequelize.CHAR(255),
  sort: Sequelize.BIGINT,
  perms: Sequelize.CHAR(255)
}, {
  tableName: 'sys_resource',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: 'create_time', // 不需要createdAt字段
  updatedAt: false, //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})



module.exports = SysRoleModel