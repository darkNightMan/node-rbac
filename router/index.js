const userConlltoller = require('../controller/userController')
const interceptController = require('../controller/interceptController')
const testController = require('../controller/testController')

module.exports = function (app) {
    app.post('/api/login', userConlltoller.login) // 登入接口
    app.use(interceptController.checkUser) // 拦截器
    app.get('/api/test', testController.test) // 测试接口
    
}