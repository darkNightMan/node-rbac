const {
  Op,
  MarketingPageModel
} = require('../models/TableRelationModel')
// 用户
class MarketingPageServer {
  // 列表
  async list(pageParmas, conditions, userid) {
    let _data = await MarketingPageModel.findAndCountAll({
      where: {
        user_id: userid
      },
      limit: pageParmas.pageSize,
      offset: pageParmas.limitStart
    })
    return {
      list: _data.rows,
      count: _data.count
    }
  }
  // 添加
  async create(info) {
    let Marketing = await MarketingPageModel.create({
      mk_name: info.mk_name,
      mk_config: info.mk_config,
      user_id: info.user_id,
    })
    return true
  }
  // 更新
  async update(data) {
    console.log(data)
    // let user = await MarketingPageModel.findByPk(data.user_id) //  通过主键查询
    let row = await MarketingPageModel.update({
      mk_name: data.mk_name,
      mk_config: data.mk_config,
      user_id: data.user_id,
    },{
      where:{
        id: data.id
      }
    })
    return true
  }
  // 删除
  async delete(data) {
    let row = await MarketingPageModel.destroy({
      where: {
        id: data.id
      }
    })
    return row
  }
  // 查询一条
  async findOne(data) {
    let row = await MarketingPageModel.findOne({
      where: {
        id: data.id
      }
    })
    return row
  }
}
module.exports = new MarketingPageServer()