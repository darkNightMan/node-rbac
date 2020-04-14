const errMsg = require('../utils/err-msg')

class BaseModel {
  constructor(data, type) {
    if (type === 'success') {
      this.data = data
    } else {
      return Object.assign(data, {
        data: null
      })
    }
  }
}
class R {
  constructor(res, req) {
    this.res = res
    this.req = req
    this.errMsg = errMsg
    this.successMsg
  }
  static initR(req, res, next) {
    res.R = new R(res, req)
    next()
  }
  ok(data) {
    let r = new BaseModel(data, 'success')
    r.msg = '成功'
    r.code = 200
    logger.info(`traceId:${this.req.headers.traceId}`)
    logger.info(`method: [${this.req.method}] URL: ${this.req.url}`)
    logger.info(`req-query:${JSON.stringify(this.req.query)}`)
    logger.info(`req-params:${JSON.stringify(this.req.params)}`)
    logger.info(`req-body:${JSON.stringify(this.req.body)}`)
    logger.info(`ok:${JSON.stringify(r)}`)
    this.res.send(r)
  }
  err(msg) {
    let r = new BaseModel(this.errMsg[msg], 'error')
    logger.info(`traceId:${this.req.headers.traceId}`)
    logger.error(`method: [${this.req.method}] URL: ${this.req.url}`)
    logger.error(`req-query:${JSON.stringify(this.req.query)}`)
    logger.error(`req-params:${JSON.stringify(this.req.params)}`)
    logger.error(`req-body:${JSON.stringify(this.req.body)}`)
    logger.error(`err:${JSON.stringify(r)}`)
    this.res.send(r)
  }
}
module.exports = R