const { v4: uuidv4 } = require('uuid')
const agents = require('../utils/getClinetInfo')
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
    logger.info(`traceId:${traceId}`)
    next()
  }
}
module.exports = new Log()