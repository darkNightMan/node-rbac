
const blog = require('./blog.js') 
const admin = require('./admin.js') 
const market = require('./market.js') 
const NotFind = require('../middlewares/notFind')
module.exports = function (app) {
  blog(app)
  market(app)
  admin(app)
  app.use(NotFind.notApi) // 访问的路由不存在  
}

