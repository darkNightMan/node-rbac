

const SysServer = require('../server/SysServer')
class SysMenuController {
  async list (req, res) {
    let data = await SysServer.getResourceList()
    res.R.ok(data)
  }
}
module.exports = new SysMenuController()