const { v4: uuidv4 } = require('uuid')
class Log {
  setLog (req, res, next) {
    const headers = req.headers
    if (!headers.traceId) {
      headers.traceId = uuidv4()
    }
    const traceId = headers.traceId
    logger.info(`traceId:${traceId}`)
    next()
  }
}
module.exports = new Log()