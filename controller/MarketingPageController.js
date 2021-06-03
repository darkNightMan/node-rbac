

const SysUserServer = require('../server/SysUserServer')
const MarketingPageServer = require('../server/MarketingPageServer')
const { formatDate } = require('../utils/format')
const { offsetPage } = require('../utils/offsetPage')
const { SALTKEY } = require('../conf')
class MarketingPageController {
   // 列表
  async list (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await MarketingPageServer.list(pageParams, conditions, userid)
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
  // 查询一条
  async findOne(req, res) {
   let id = req.query.id
   let _data = await MarketingPageServer.findOne({id :id})
   if (_data) {
      res.R.ok(_data)
    }
  }
  // 创建
  async create (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let info = {
      mk_name: req.body.mk_name,
      mk_config: JSON.stringify(req.body.mk_config),
      user_id: userid
    }
    let _data = await MarketingPageServer.create(info) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新
  async update (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let data = req.body
    let info = {
      id: data.id,
      mk_name: data.mk_name,
      mk_config: JSON.stringify(data.mk_config),
      user_id: userid
    }
    let _data = await MarketingPageServer.update(info) // 更新
    res.R.ok(_data)
  }
  // 删除
  async delete (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let data = req.body
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await MarketingPageServer.delete({id: data.id})
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new MarketingPageController()