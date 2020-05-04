const SysMenuServer = require('../server/SysMenuServer')
const { formatDate } = require('../utils/format')
const { offsetPage } = require('../utils/offsetPage')
class SysMenuController {
  async list(req, res) {
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await SysMenuServer.list(pageParams, conditions)
    let allList = await SysMenuServer.selectMenuList()
    _data.list.map((it) => {
      it.create_time = formatDate(it.create_time)
      allList.map((p) => {
        if (it.parent_id == p.res_id ) {
          it.parent_name = p.res_name
        }
      })
    })
    res.R.ok({
      list: _data.list,
      totalCount: _data.count,
      currentPage: pageParams.page,
      pageSize: pageParams.pageSize
    })
  }
  async selectMenuList (req, res) {
    let _data = await SysMenuServer.selectMenuList()
      // 递归遍历菜单
      function recursionMenu(menu) {
        let root = menu.filter((it, index) => it.parent_id == null) //  获取根级
        function recursion (children) {
          children.map((p, i1) => {
            menu.map((c, i2) => {
              if (p.res_id == c.parent_id) {              
                if (Object.prototype.toString.call(p.children) == '[object Array]') { 
                  if (p.children.indexOf(c) === -1) {
                    p.children.push(c)
                  }
                  recursion(p.children)
                } else {
                  p.children = new Array()
                  if (p.children.indexOf(c) === -1) {
                    p.children.push(c)
                  }
                  recursion(p.children)
                }
              }
            })
          })
        }
        recursion(root)
        return root
      }
    res.R.ok({
      tree: recursionMenu(_data),
      list: _data
    })
  }
  async treeMenu(req, res) {
    let _data = await SysMenuServer.getTreeMenu()
    // 递归遍历菜单
    function recursionMenu(menu) {
      let root = menu.filter((it, index) => it.parent_id == null) //  获取根级
      function recursion (children) {
        children.map((p, i1) => {
          menu.map((c, i2) => {
            if (p.res_id == c.parent_id) {              
              if (Object.prototype.toString.call(p.children) == '[object Array]') { 
                if (p.children.indexOf(c) === -1) {
                  p.children.push(c)
                }
                recursion(p.children)
              } else {
                p.children = new Array()
                if (p.children.indexOf(c) === -1) {
                  p.children.push(c)
                }
                recursion(p.children)
              }
            }
          })
        })
      }
      recursion(root)
      return root
    }
    res.R.ok(recursionMenu(_data)[0].children)
  }
  async createMenu (req, res) {    
    let data = req.body
    let _data = await SysMenuServer.createMenu(data)
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