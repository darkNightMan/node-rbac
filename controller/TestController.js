

const SysMenuServer = require('../server/SysMenuServer')
const { offsetPage } = require('../utils/offsetPage')
class TestController {
  async test (req, res) {
    console.log()
    // const {pageParams, conditions } = offsetPage(req.query)
    let data = await SysMenuServer.getUserPer(1)
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