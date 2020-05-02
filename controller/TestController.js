

const SysMenuServer = require('../server/SysMenuServer')
const SysMenuController = require('../controller/SysMenuController')
const { offsetPage } = require('../utils/offsetPage')
class TestController {
  async test (req, res) {
    console.log()
    const {pageParams, conditions } = offsetPage()
  
    let data = await SysMenuServer.selectMenuList()    
    // let data = await SysMenuController.list()
    // let data = await SysMenuServer.list(pageParams, conditions)
    // res.R.ok({
    //   list: data.list,
    //   totalCount: data.total[0].count,
    //   totalPage: Math.ceil(data.total[0].count / query.pageSize),
    //   page: query.page,
    //   pageSize: query.pageSize
    // })
    res.R.ok(data)
  }
}
module.exports = new TestController()