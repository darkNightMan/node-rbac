const { v4: uuidv4 } = require('uuid')
const agents = require('../utils/getClinetInfo')
const colors = require('colors') 
class Log {
  setLog (req, res, next) {
    const headers = req.headers
    if (!headers.traceId) {
      headers.traceId = uuidv4()
    }
    const getClientIp = (req) => {
      return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    }
    const traceId = headers.traceId
    req.agent = agents(req.headers['user-agent'])
    headers.remoteIP = getClientIp(req)
    logger.info(colors.magenta(`traceId:${traceId}`))  
    logger.info(colors.magenta(`host:${req.hostname}`))
    logger.info(colors.magenta(`method: [${req.method}] URL: ${req.url}`))
    logger.info(colors.magenta(`req-query: ${JSON.stringify(req.query)}`))
    logger.info( colors.magenta(`req-params:${JSON.stringify(req.params)}`))
    logger.info(colors.magenta(`req-body:${JSON.stringify(req.body)}`))  
    console.log(colors.magenta(req))
    next()
  }
}
module.exports = new Log()