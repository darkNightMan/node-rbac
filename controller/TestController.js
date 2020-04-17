

const SysMenuServer = require('../server/SysMenuServer')
const { offsetPage } = require('../utils/offsetPage')
class TestController {
  async test (req, res) {
    const {pageParams, conditions } = offsetPage(req.query)
   
    console.log(pageParams, conditions)
    // let data = await SysMenuServer.list(pageParams, conditions)
    // res.R.ok({
    //   list: data.list,
    //   totalCount: data.total[0].count,
    //   totalPage: Math.ceil(data.total[0].count / query.pageSize),
    //   page: query.page,
    //   pageSize: query.pageSize
    // })
  }
}
module.exports = new TestController()