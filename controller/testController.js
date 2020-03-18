

const UserServer = require('../server/UserServer')
class TestController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.R.ok(data)
  }
}
module.exports = new TestController()