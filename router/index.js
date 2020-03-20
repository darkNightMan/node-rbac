const UserController = require('../controller/UserController')
const SysMenuController = require('../controller/SysMenuController')
const InterceptAuth = require('../middlewares/intercept')
const log = require('../middlewares/log')
const TestController = require('../controller/TestController')

module.exports = function (app) {
    app.use(log.setLog) // 日志
    app.post('/api/login', UserController.login) // 登入接口
    app.use(InterceptAuth.auth) // 拦截器校验
    app.get('api/loginOut', UserController.loginOut) // 登入接口
    app.route('/api/test', TestController.test) // 测试接口  
    app.get('/api/getUserMenuList', UserController.getUserMenuList) // 获取用户信息和菜单
    app.route('/api/sysMenu/')
        .get(SysMenuController.list)
}