const SysServer = require('../server/SysMenuServer')
class SysMenuController {
  async list(req, res) {
    let _data = await SysServer.getResourceList()
    res.R.ok(_data)
  }
  async treeMenu(req, res) {
    let _data = await SysServer.getTreeMenu()
    // 遍历菜单
    function menuEach(menu) {
      let parentMenu = menu.filter((it, index) => !it.parent_id) //  获取父级  
      parentMenu.map((p, i1) => {
        menu.map((c, i2) => {
          if (p.res_id == c.parent_id) {
            if (Object.prototype.toString.call(p.children) == '[object Array]') {
              p.children.push(c)
            } else {
              p.children = new Array()
              p.children.push(c)
            }
          }
        })
      })
      return parentMenu
    }
    res.R.ok({
      treeMenu: menuEach(_data)
    })
  }
}
module.exports = new SysMenuController()