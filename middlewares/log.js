const { v4: uuidv4 } = require('uuid')
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
    headers.remoteIP = getClientIp(req)
    logger.info(`traceId:${traceId}`)
   
    // if (req.url == '/api/login') {
    //   console.log('login11111111111111111111111111111111111111')
    // }
    // let userData = await UserServer.getUserInfo(_data.user_id)
    // let roleList = await SysRoleServer.findRoles(userData.user_id) // 用户角色关联
    // let dataLog = {
    //   user_log_id: userData.user_id,
    //   user_name: userData.nick_name,
    //   login_ip: env === 'dev'? req.hostname : req.headers.remoteIP,
    //   login_address: env === 'dev' ? '本地登入' : '未知',
    // }
    // console.log(dataLog)
    // let logrow = await SysLogServer.insert(dataLog)
    next()
  }
}
module.exports = new Log()