const SysMenuServer = require('../server/SysMenuServer')
const { formatDate } = require('../utils/format')
const { offsetPage } = require('../utils/offsetPage')
class SysMenuController {
  async list(req, res) {
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await SysMenuServer.list(pageParams, conditions)
    _data.list.map((it) => {
      it.create_time = formatDate(it.create_time)
    })
    res.R.ok({
      list: _data.list,
      totalCount: _data.total[0].count,
      currentPage: pageParams.page,
      pageSize: pageParams.pageSize
    })
  }
  async selectMenuList (req, res) {
    let data = await SysMenuServer.selectMenuList()
    res.R.ok(data)
  }
  async treeMenu(req, res) {
    let _data = await SysMenuServer.getTreeMenu()
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
    let _data = await SysMenuServer.insertMenu(data)
    if(_data) {
      res.R.ok(_data)
    } else {
      res.R.err('MENU_INSERT_FAILED')
    }
  }
  async updatedMenu (req, res) {
    let data = req.body
    let _data = await SysMenuServer.updatedMenu(data)
    if(_data) {
      res.R.ok()
    } else {
      res.R.err('MENU_UPDATE_FAILED')
    }
  }

  async deleteMenu (req, res) {
    let res_id = req.body.res_id
    let _data = await SysMenuServer.deleteMenu(res_id)
    if(_data) {
      res.R.ok()
    } else {
      res.R.err('MENU_DELETE_FAILED')
    }
  }
}
module.exports = new SysMenuController()