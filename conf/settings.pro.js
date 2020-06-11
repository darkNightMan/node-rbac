

 module.exports = {
  // 密码盐
  SALTKEY: 'wangxiping_express_dev',
  // 程序启动端口
  APP_PORT: 10086,
  // mysql
  MYSQL_CONF: { // 服务器
    host: "127.0.0.1", //数据库的地址 127.0.0.1 106.54.63.174
    user: "root", // 用户的名字
    password: "csdewang", // 用户密码 ，  win root mac csdewang  lin root
    database: "blog", //数据库名字,
    useConnectionPooling: true
  },
  // redis
  REDIS_CONF: {
    port: 6379,
    host: '127.0.0.1'
  },
  // jwt
  JWT_COMF: {
    JWTKEY: 'wangxiping',
    JWTEXP: 3600 // token 过期时间
  },
  // logs4
  LOG_CONFIG: {
    appenders:  {
      request: {
        type: 'stderr', // 大量日志写入控制台可能会使应用占用大量内存，可以考虑使用stdout
        filename: './syslogs/access',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        category: 'http'
      },
      application: {
        type: 'dateFile',
        filename: './syslogs/application',
        pattern: '-yyyy-MM-dd.log',
        maxLogSize: 10485760, // 10mb,日志文件大小,超过该size则自动创建新的日志文件
        backups: 20,  // 仅保留最新的20个日志文件
        compress: true,    //  超过maxLogSize,压缩代码
        alwaysIncludePattern: true
      },
      err: {
        type: 'stderr',
        filename: './syslogs/error',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
      }
    },
    categories: {
      default: { appenders: ['application', 'request'], level: 'info' }
    }
  }
}