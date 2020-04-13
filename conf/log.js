let LOG_CONFIG = {
  appenders:  {
    request: {
      type: 'console',
      filename: './logs/access',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      category: 'http'
    },
    application: {
      type: 'DateFile',
      filename: './logs/application',
      pattern: '-yyyy-MM-dd.log',
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
