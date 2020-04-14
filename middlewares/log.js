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
    var agent = req.headers['user-agent']
    const os = (ua) => {
      let $ = {}
      if (/mobile/i.test(ua)) { 
        $.Mobile = true
      }
      if (/like Mac OS X/.test(ua)) {  
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.')
        $.iPhone = /iPhone/.test(ua);  
        $.iPad = /iPad/.test(ua);  
      }        
      // if (/Android/.test(ua)) {
      //   $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];  
      // }
      // if (/webOS\//.test(ua)){
      //   $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1]; 
      // }
      // if (/(Intel|PPC) Mac OS X/.test(ua)){
      //   $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;  
      // }
      // if (/Windows NT/.test(ua)) {
      //   $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1]
      // }
      return $
    }
    const traceId = headers.traceId
    req.agent = os(agent)
    headers.remoteIP = getClientIp(req)
    logger.info(`traceId:${traceId}`)
   
    // if (req.url == '/api/login') {
    //   console.log('login11111111111111111111111111111111111111')
    // }
    next()
  }
}
module.exports = new Log()