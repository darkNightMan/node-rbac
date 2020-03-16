const UserController = require('../controller/UserController')
const InterceptAuth = require('../middlewares/intercept')
const TestController = require('../controller/TestController')

module.exports = function (app) {
    app.post('/api/login', UserController.login) // 登入接口
    app.use(InterceptAuth.auth) // 拦截器校验
    app.get('/api/test', TestController.test) // 测试接口
}