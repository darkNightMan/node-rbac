const UserController = require('../controller/UserController')
const SysMenuController = require('../controller/SysMenuController')
const SysRoleController = require('../controller/SysRoleController')
const SysUserController = require('../controller/SysUserController')
const TestController = require('../controller/TestController')
const SysLoginLogsController = require('../controller/SysLoginLogsController')
const SysOperationController = require('../controller/SysOperationController')
const InterceptAuth = require('../middlewares/intercept')
const log = require('../middlewares/log')
const NotFind = require('../middlewares/notFind')
const permissions = require('../middlewares/permissions')

module.exports = function (app) {
  app.use(log.setLog)
  app.get('/api/getCaptcha', UserController.captcha)
  app.post('/api/login', UserController.login) // 登入接口
  app.use(InterceptAuth.authToken) // 校验token
  app.use(log.operatioLogs)
  app.get('/api/test', TestController.test) // 测试接口  
  app.get('/api/loginOut', UserController.loginOut) // 退出 
  app.get('/api/getUserMenuList', UserController.getUserMenuList) // 获取用户信息和菜单
 // 角色
  app.get('/api/role/getRoleTreePer/',permissions.hasPerms('sys:role:lookPerms'), SysRoleController.getRoleTreePer) // 获取当前角色下的权限 
  app.post('/api/role/setRoleTreePer/', permissions.hasPerms('sys:role:editPerms'), SysRoleController.setRoleTreePer) // 修改角色权限
  app.get('/api/role/list', permissions.hasPerms('sys:role:list'), SysRoleController.list) // 获取所有的角色名  
  app.post('/api/role/createRole', permissions.hasPerms('sys:role:create'), SysRoleController.createRole) // 新建角色 
  app.put('/api/role/updateRole', permissions.hasPerms('sys:role:update'), SysRoleController.updateRole) // 更新角色名  
  app.delete('/api/role/deleteRole', permissions.hasPerms('sys:role:delete'), SysRoleController.deleteRole)  // 删除角色 
// 用户
  app.get('/api/user/list', permissions.hasPerms('sys:user:list'), SysUserController.list) // 获取所有的用户
  app.post('/api/user/createUser', permissions.hasPerms('sys:user:create'), SysUserController.createUser) // 新增用户
  app.put('/api/user/updateUser', permissions.hasPerms('sys:user:update'), SysUserController.updateUser) // 更新用户
  app.delete('/api/user/deleteUser', permissions.hasPerms('sys:user:delete'), SysUserController.deleteUser) // 删除用户
// 菜单
  app.get('/api/menu/selectMenuList', SysMenuController.selectMenuList)
  app.get('/api/menu/sysMenutree/', SysMenuController.treeMenu) // 获取菜单树
  app.get('/api/menu/list/', permissions.hasPerms('sys:menu:list'), SysMenuController.list) // 获取菜单列表  
  app.post('/api/menu/createMenu', permissions.hasPerms('sys:menu:create'), SysMenuController.createMenu) // 新增菜单 
  app.put('/api/menu/updatedMenu', permissions.hasPerms('sys:menu:update'), SysMenuController.updatedMenu) // 更新菜单 
  app.delete('/api/menu/deleteMenu', permissions.hasPerms('sys:menu:delete'), SysMenuController.deleteMenu) // 删除菜单  
  app.get('/api/loginLogs/list', permissions.hasPerms('sys:logs:list'), SysLoginLogsController.list) // logs列表    
  app.get('/api/operationLos/list', SysOperationController.list) // logs列表  
  app.use(NotFind.notApi) // 访问的路由不存在  
}