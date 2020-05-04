
const env = process.env.NODE_ENV  // 环境参数123
const settinspro = require('./settings.pro')
const settinsdev = require('./settings.dev')
module.exports = env === 'dev' ?  settinsdev : settinspro