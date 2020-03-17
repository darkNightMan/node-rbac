
const { SuccessModel, ErrorModel }= require('../model/resModle')
const UserServer = require('../server/UserServer')
class TestController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.json(new SuccessModel(data))
  }
}
module.exports = new TestController()