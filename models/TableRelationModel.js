const db = require('../db/mysql.db')
const SysUserModel = require('../models/SysUserModel') // 用户表
const SysUserRoleModel = require('../models/SysUserRoleModel') // 用户角色关联表
const SysRoleModel = require('../models/SysRoleModel') // 角色表
const SysRolePermmisionModel = require('../models/SysRolePermmisionModel') // 角色权限关联表
const SysResourceModel = require('../models/SysResourceModel') // 权限表

// 一对一多 用户表对关联表 
SysUserModel.hasMany(SysUserRoleModel, {
  foreignKey: 'user_id', //  外键约束
  as: 'roleLits'
}) 
// 一对一多 角色对关联表
SysRoleModel.hasMany(SysUserRoleModel, {
  foreignKey: 'role_id', //  外键约束
  as: 'roleLits'
})

// 一对一多  角色对关联表
SysRoleModel.hasMany(SysRolePermmisionModel, {
  foreignKey: 'role_id'
}) //  外键约束
// 一对一多  权限对关联表
SysResourceModel.hasMany(SysRolePermmisionModel, {
  foreignKey: 'res_id'
}) //  外键约束

// 用户-角色 多对多
SysUserModel.belongsToMany(SysRoleModel, {
  through: {
    model: SysUserRoleModel,
    unique: false // 取消联合主键的约定
  },
  foreignKey: 'user_id', //通过外键user_id
  constraints: false
})
SysRoleModel.belongsToMany(SysUserModel, {
  through: {
    model: SysUserRoleModel,
    unique: false, // 取消联合主键的约定
  },
  foreignKey: 'role_id', //通过外键role_id
  constraints: false
})
// 角色-权限 多对多
SysRoleModel.belongsToMany(SysResourceModel, {
  through: {
    model: SysRolePermmisionModel,
    unique: false
  },
  foreignKey: 'role_id', //通过外键user_id
  constraints: false
})
SysResourceModel.belongsToMany(SysRoleModel, {
  through: {
    model: SysRolePermmisionModel,
    unique: false,
  },
  foreignKey: 'res_id', //通过外键role_id
  constraints: false
})

module.exports = {
  SysUserModel,
  SysUserRoleModel,
  SysRoleModel,
  SysRolePermmisionModel,
  SysResourceModel
}