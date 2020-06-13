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
const UploadImageController = require('../controller/UploadImageController')
const upload = require('../utils/upload')

const BlogArticleController = require('../controller/BlogArticleController')
const BlogClassController = require('../controller/BlogClassController')
const BlogTagsController = require('../controller/BlogTagsController')
const BlogCommentsController = require('../controller/BlogCommentsController')
const BlogMsgCommentsController = require('../controller/BlogMsgCommentsController')
const BlogRelatedLinksController = require('../controller/BlogRelatedLinksController')

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
  app.post('/api/role/createRole', permissions.hasPerms('sys:role:create'), SysRoleController.create) // 新建角色 
  app.put('/api/role/updateRole', permissions.hasPerms('sys:role:update'), SysRoleController.update) // 更新角色名  
  app.delete('/api/role/deleteRole', permissions.hasPerms('sys:role:delete'), SysRoleController.delete)  // 删除角色 
// 用户
  app.get('/api/user/list', permissions.hasPerms('sys:user:list'), SysUserController.list) // 获取所有的用户
  app.post('/api/user/createUser', permissions.hasPerms('sys:user:create'), SysUserController.create) // 新增用户
  app.put('/api/user/updateUser', permissions.hasPerms('sys:user:update'), SysUserController.update) // 更新用户
  app.delete('/api/user/deleteUser', permissions.hasPerms('sys:user:delete'), SysUserController.delete) // 删除用户
// 菜单
  app.get('/api/menu/selectMenuList', SysMenuController.selectMenuList)
  app.get('/api/menu/sysMenutree/', SysMenuController.treeMenu) // 获取菜单树
  app.get('/api/menu/list/', permissions.hasPerms('sys:menu:list'), SysMenuController.list) // 获取菜单列表  
  app.post('/api/menu/createMenu', permissions.hasPerms('sys:menu:create'), SysMenuController.create) // 新增菜单 
  app.put('/api/menu/updatedMenu', permissions.hasPerms('sys:menu:update'), SysMenuController.updated) // 更新菜单 
  app.delete('/api/menu/deleteMenu', permissions.hasPerms('sys:menu:delete'), SysMenuController.delete) // 删除菜单  
  app.get('/api/loginLogs/list', permissions.hasPerms('sys:logs:list'), SysLoginLogsController.list) // logs列表    
  app.get('/api/operationLos/list', SysOperationController.list) // logs列表  
  app.post('/api/single/uploadImage/', upload.single('images'), UploadImageController.uploadImage)

// ------------------------------------------blog-------------------------------------------------------
  app.get('/api/blogs/articleList', BlogArticleController.list) // 列表  
  app.get('/api/blogs/articleDetail', BlogArticleController.findOne) // 获取一条  
  app.post('/api/blogs/createArticle', BlogArticleController.create) // 新增列表    
  app.put('/api/blogs/updateArticle', BlogArticleController.update) // 列表
  app.delete('/api/blogs/deleteArticle', BlogArticleController.delete) // 删除列表   

  app.get('/api/blogs/articleClassList', BlogClassController.list) // 列表  
  app.post('/api/blogs/createClassList', BlogClassController.create) // 新增  
  app.put('/api/blogs/updateClassList', BlogClassController.update) // 更新 
  app.delete('/api/blogs/deleteClassList', BlogClassController.delete) // 更新 

  app.get('/api/blogs/articleTagsList', BlogTagsController.list) // 列表  
  app.post('/api/blogs/createTagsList', BlogTagsController.create) // 添加
  app.put('/api/blogs/updateTagsList', BlogTagsController.update) // 更新
  app.delete('/api/blogs/deleteTagsList', BlogTagsController.delete) // 更新

  app.get('/api/blogs/commentsList', BlogCommentsController.list) // 列表  
  app.get('/api/blogs/articleCommentsList', BlogCommentsController.findArticleComment) // 列表 
  app.post('/api/blogs/createCommentsList', BlogCommentsController.create) // 添加
  app.put('/api/blogs/updateCommentsList', BlogCommentsController.update) // 更新
  app.delete('/api/blogs/deleteCommentsList', BlogCommentsController.delete) // 更新

  app.get('/api/blogs/relatedLinksList', BlogRelatedLinksController.list) // 列表  
  app.post('/api/blogs/createRelatedLinksList', BlogRelatedLinksController.create) // 添加
  app.put('/api/blogs/updateRelatedLinksList', BlogRelatedLinksController.update) // 更新
  app.delete('/api/blogs/deleteRelatedLinksList', BlogRelatedLinksController.delete) // 更新

  app.get('/api/blogs/msgCommentsList', BlogMsgCommentsController.list) // 列表  
  app.get('/api/blogs/msgCommentDetail', BlogMsgCommentsController.findMsgComment) // 列表 
  app.get('/api/blogs/msgTreeCommentList', BlogMsgCommentsController.findMsgCommentTreeLits) // 列表 
  app.post('/api/blogs/createMsgCommentsList', BlogMsgCommentsController.create) // 添加
  app.put('/api/blogs/updateMsgCommentsList', BlogMsgCommentsController.update) // 更新
  app.delete('/api/blogs/deleteMsgCommentsList', BlogMsgCommentsController.delete) // 更新

  app.use(NotFind.notApi) // 访问的路由不存在  
}