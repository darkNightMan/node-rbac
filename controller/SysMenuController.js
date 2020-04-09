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
      let root = menu.filter((it, index) => it.parent_id == null) //  获取根级
      let parentMenu = menu.filter((it, index) => !it.parent_id)  //  获取根父级
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
      return root
    }
    res.R.ok(menuEach(_data)[0].children)
  }
  async createMenu (req, res) {    
    let data = req.body
    let _data = await SysServer.insertMenu(data)
    if(_data) {
      res.R.ok(_data)
    } else {
      res.R.err('MENU_INSERT_FAILED')
    }
  }
  async updatedMenu (req, res) {
    let data = req.body
    let _data = await SysServer.updatedMenu(data)
    if(_data) {
      res.R.ok()
    } else {
      res.R.err('MENU_UPDATE_FAILED')
    }
  }

  async deleteMenu (req, res) {
    let res_id = req.body.res_id
    let _data = await SysServer.deleteMenu(res_id)
    if(_data) {
      res.R.ok()
    } else {
      res.R.err('MENU_DELETE_FAILED')
    }
  }
}
module.exports = new SysMenuController()