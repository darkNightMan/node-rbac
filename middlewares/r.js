

class BaseModel {
  constructor (data, msg) {
    if (typeof data === 'string') {
      this.data = null
      this.msg = data
    } else {
      this.data =data
      this.msg = msg
    }
    return this
  }
}
class R {
  constructor (res) {
    this.res = res
  }
  static resExtend(req, res, next){
    res.R = new R(res)
    next()
  }
  ok (data, msg) {
    let r = new BaseModel(data, msg)
    r.code = 200
    this.res.send(r)
  }
  err (data, msg){
    let r = new BaseModel(data, msg)
    r.code = -1
    this.res.send(r)
  }
}

module.exports = R