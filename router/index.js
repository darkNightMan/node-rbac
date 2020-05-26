
const home = require('./home.js') 
const admin = require('./admin.js') 
module.exports = function (app) {
  home(app)
  admin(app)
}

