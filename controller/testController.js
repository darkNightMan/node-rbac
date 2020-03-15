
const { SuccessModel, ErrorModel }= require('../model/resModle')
class testController {
  test (req, res) {
    res.json(new SuccessModel('test'))
  }
}

module.exports = new testController()