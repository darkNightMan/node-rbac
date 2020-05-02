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
// SysUserModel.hasMany(SysUserRoleModel, {foreignKey: 'FK_sys_user_id', target: 'user_id'})


















//如果是第一次运行的话,需要用sync 方法创建表
// User.sync({force: true}).then(d=> { //建议在表模型设计完成后，打开此段代码，待数据库中表建立完成后，注释掉此段，防止每次都删除并重新建表
//   for (let n=1;n<10;n++) {
//     User.create({
//       username: `wangxiping${n}`,
//       gender: 1
//     })
//   }
// });
// hasOne - 添加外键到目标模型，并以单数关系混入到源模型
// belongsTo - 为当前模型添加外键，并以单数关系混入到源模型
// hasMany - 添加外键到目标模型，并以复数关系混入到源模型
// belongsToMany - 为连接的表创建N:M关系并以复数关系混入到源模型。会通过sourceId和targetId创建交叉表。

module.exports = SysRoleModel