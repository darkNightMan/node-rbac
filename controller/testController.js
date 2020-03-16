
const { SuccessModel, ErrorModel }= require('../model/resModle')
class TestController {
  test (req, res) {
    res.json(new SuccessModel('test'))
  }
}
module.exports = new TestController()