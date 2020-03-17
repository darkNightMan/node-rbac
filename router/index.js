const UserController = require('../controller/UserController')
const InterceptAuth = require('../middlewares/intercept')
const log = require('../middlewares/log')
const TestController = require('../controller/TestController')

module.exports = function (app) {
    app.use(log.setLog) // 日志
    app.post('/api/login', UserController.login) // 登入接口
    app.use(InterceptAuth.auth) // 拦截器校验
    app.get('/api/test', TestController.test) // 测试接口
}