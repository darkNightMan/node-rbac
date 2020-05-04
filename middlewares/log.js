const { v4: uuidv4 } = require('uuid')
const URL = require('url');
const agents = require('../utils/getClinetInfo')
const colors = require('colors') 
const SysOperationServer = require('../server/SysOperationServer.js')
const getClientIp = require('../utils/getClinetIp')
class Log {
  setLog (req, res, next) {
    const headers = req.headers
    if (!headers.traceId) {
      headers.traceId = uuidv4()
    }
    const traceId = headers.traceId
    req.agent = agents(req.headers['user-agent'])
    headers.remoteIP = getClientIp(req, 'nginx')
    logger.info(colors.magenta(`traceId:${traceId}`))  
    logger.info(colors.magenta(`host:${req.hostname}`))
    logger.info(colors.magenta(`method: [${req.method}] URL: ${req.url}`))
    logger.info(colors.magenta(`req-query: ${JSON.stringify(req.query)}`))
    logger.info(colors.magenta(`req-body:${JSON.stringify(req.body)}`)) 
    next()
  }
   async operatioLogs (req, res, next) {
    let operatioObject = {
      user_id: req.userInfo.user_id,
      nick_name: req.userInfo.nick_name,
      action_ip: req.headers.remoteIP,
      action_method: `[${req.method}] ${URL.parse(req.url, true).pathname}`,
      action_params: (`${JSON.stringify(req.query) === '{}' ? '':JSON.stringify(req.query)}${JSON.stringify(req.body) === '{}' ? '' : JSON.stringify(req.body)}`).replace(/\s+/g, '')
    }
    await SysOperationServer.insert(operatioObject)
    next()
  }
}
module.exports = new Log()