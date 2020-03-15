const user = require('./user')
const checkout = require('./chckoutLogin')

module.exports = function (app) {
    checkout(app)
    user(app)
}