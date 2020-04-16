const env = process.env.NODE_ENV  // 环境参数123

if (env === 'dev') {
  MYSQL_CONF = { // 服务器
    host: "106.54.63.174", //数据库的地址
    user: "root", // 用户的名字
    password: "wang", // 用户密码 ，
    database: "blog", //数据库名字,
    useConnectionPooling: true
  } 
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
  JWT_COMF = {
    JWTKEY: 'wangxiping',
    JWTEXP: 3600 // token 过期时间
  }
} else {
  MYSQL_CONF = { // 服务器
    host: "127.0.0.1", //数据库的地址
    user: "root", // 用户的名字
    password: "root", // 用户密码 ， win root mac csdewanng  lin root
    database: "blog", //数据库名字,
    useConnectionPooling: true
  } 
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
  JWT_COMF = {
    JWTKEY: 'wangxiping',
    JWTEXP: 3600 // token 过期时间
  }
}
// console.log(MYSQL_CONF,  REDIS_CONF,  JWT_COMF)
module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  JWT_COMF
}