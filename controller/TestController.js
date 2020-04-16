

const SysMenuServer = require('../server/SysMenuServer')
const { offsetPage } = require('../utils/offsetPage')
class TestController {
  async test (req, res) {
    // let query = offsetPage(req.query)
    let query = {
      condition: req.query,
      limitStart: offsetPage(req.query).limitStart
    }
    console.log(query)
    // let data = await SysMenuServer.list(query)
    // Query = { page: '3', pageSize: '3', res_id: '1', res_name: '管理' }
    // function formatQuery (query) {
    //   let queryForMat = {
    //     condition: {},
    //   }
    //   Object.keys(query).map((it) => {
    //     if (it == 'page' || it ==  'pageSize') {
    //       queryForMat[it] = query[it]
    //     } else {
    //       queryForMat.condition[it]= query[it]
    //     }
    //   })
    //   return queryForMat
    // }
    // console.log(formatQuery(Query))
    res.R.ok(data)
  }
}
module.exports = new TestController()