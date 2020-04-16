

const SysMenuServer = require('../server/SysMenuServer')
const { offset } = require('../utils/offsetPage')
class TestController {
  async test (req, res) {
    let query = offset(req.query)
    console.log(query)
    let data = await SysMenuServer.list(query)
    res.R.ok(data)
  }
}
module.exports = new TestController()