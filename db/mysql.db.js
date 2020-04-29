let Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/index')
let db = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, {
  host: MYSQL_CONF.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
})

db.authenticate().then((p) => {
  console.log('数据链接成功');
}).catch(err => {
  console.error('mysql connection error:', err);
})

module.exports = db;