const UserController = require('../controller/UserController')
const SysMenuController = require('../controller/SysMenuController')
const SysRoleController = require('../controller/SysRoleController')
const SysUserController = require('../controller/SysUserController')
const TestController = require('../controller/TestController')
const SysLoginLogsController = require('../controller/SysLoginLogsController')
const InterceptAuth = require('../middlewares/intercept')
const log = require('../middlewares/log')
const NotFind = require('../middlewares/notFind')


module.exports = function (app) {
  app.use(log.setLog) // 日志
  app.post('/api/login', UserController.login) // 登入接口
  app.use(InterceptAuth.auth) // 拦截器校验
  app.get('/api/loginOut', UserController.loginOut) // 退出
  app.route('/api/test', TestController.test) // 测试接口  
  app.get('/api/getUserMenuList', UserController.getUserMenuList) // 获取用户信息和菜单
  app.get('/api/sysMenu/',SysMenuController.list) // 获取菜单列表
  app.get('/api/sysMenutree/',SysMenuController.treeMenu) // 获取菜单树
  app.get('/api/getRoleTreePer/', SysRoleController.getRoleTreePer) // 获取当前角色下的权限
  app.post('/api/setRoleTreePer/', SysRoleController.setRoleTreePer) //修改角色权限
  app.get('/api/getAllRole', SysRoleController.getAllRole) // 获取所有的角色 
  app.post('/api/createRole', SysRoleController.createRole) // 新建角色 
  app.post('/api/updateRole', SysRoleController.updateRole) // 更新角色  
  app.get('/api/deleteRole', SysRoleController.deleteRole)  // 删除角色 
  app.get('/api/getAllUser', SysUserController.getAllUser) // 获取所有的用户
  app.post('/api/user/createUser', SysUserController.createUser) // 新增用户
  app.post('/api/user/updateUser', SysUserController.updateUser) // 更新用户
  app.post('/api/user/deleteUser', SysUserController.deleteUser) // 删除用户
  app.post('/api/menu/createMenu', SysMenuController.createMenu) // 新增菜单
  app.post('/api/menu/updatedMenu', SysMenuController.updatedMenu) // 更新菜单
  app.post('/api/menu/deleteMenu', SysMenuController.deleteMenu) // 更新菜单  
  app.get('/api/loginLogs/list', SysLoginLogsController.list) // logs列表  

  app.use(NotFind.notApi) // 访问的路由不存在  
}