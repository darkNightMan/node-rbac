let LOG_CONFIG = {
  appenders:  {
    request: {
      type: 'stderr', // 大量日志写入控制台可能会使应用占用大量内存，可以考虑使用stdout
      filename: './logs/access',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      category: 'http'
    },
    application: {
      type: 'DateFile',
      filename: './logs/application',
      pattern: '-yyyy-MM-dd.log',
      maxLogSize: 10485760, // 10mb,日志文件大小,超过该size则自动创建新的日志文件
      backups: 20,  // 仅保留最新的20个日志文件
      compress: true,    //  超过maxLogSize,压缩代码
      alwaysIncludePattern: true
    },
    err: {
      type: 'stderr',
      filename: './logs/errors',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ['application', 'request'], level: 'info' }
  }
}
module.exports = LOG_CONFIG
