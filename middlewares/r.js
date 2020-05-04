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
    this.res.send(r)
  }
  err(msg) {
    let r = new BaseModel(this.errMsg[msg], 'error')   
    this.res.send(r)
  }
}
module.exports = R