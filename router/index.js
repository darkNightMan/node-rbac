
const blog = require('./blog.js') 
const admin = require('./admin.js') 
module.exports = function (app) {
  blog(app)
  admin(app)
}

