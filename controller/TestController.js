

const SysMenuServer = require('../server/SysMenuServer')
const SysUserServer = require('../server/SysUserServer')
const SysMenuController = require('../controller/SysMenuController')
const { offsetPage } = require('../utils/offsetPage')
class TestController {
  async test (req, res) {
    const {pageParams, conditions } = offsetPage()
    let data = await SysUserServer.list(pageParams, conditions )  
    res.R.ok(data)
  }
}
module.exports = new TestController()