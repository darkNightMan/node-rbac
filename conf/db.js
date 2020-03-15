//mysql配置文件
mysqlConf = {
  host: "127.0.0.1", //数据库的地址
  user: "root", // 用户的名字
  password: "csdewang", // 用户密码 ，
  database: "blog" //数据库名字
} 
REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}
JWT_COMF = {
  JWTKEY: 'wangxiping',
  JWTEXP : 60*60  // token 过期时间
}
module.exports = { mysqlConf, REDIS_CONF, JWT_COMF }; //用module.exports暴露出这个接口，