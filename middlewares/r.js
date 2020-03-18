const errMsg = require('../utils/err-msg')

class BaseModel {
  constructor (data, type) {
    if (type === 'success') {
      this.data = data
    } else {
     return Object.assign(data, {data: null})
    }
  }
}
class R {
  constructor (res) {
    this.res = res
    this.errMsg = errMsg
    this.successMsg
  }
  static resExtend(req, res, next){
    res.R = new R(res)
    next()
  }
  ok (data) {
    let r = new BaseModel(data, 'success')
    r.msg = '成功'
    r.code = 200
    this.res.send(r)
  }
  err (msg){
    let r = new BaseModel(this.errMsg[msg], 'error')
    this.res.send(r)
  }
}

module.exports = R