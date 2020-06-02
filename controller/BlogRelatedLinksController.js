


const BlogRelatedLinksServer = require('../server/BlogRelatedLinksServer')

const { offsetPage } = require('../utils/offsetPage')

class BlogRelatedLinksController {
   // 列表
  async list (req, res){
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await BlogRelatedLinksServer.list(pageParams, Object.assign({ user_id: userid}, conditions)) // 用户表  
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
  // 创建
  async create (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let data = {
      tags_name: req.body.tags_name,
      user_id: userid
    } 
    let _data = await BlogRelatedLinksServer.create(data) 
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新
  async update (req, res) {
    let data = req.body
    let _data = await BlogRelatedLinksServer.update(data) // 更新
    return res.R.ok(_data)
  }
  async delete (req, res) {
    let tags_id = req.body.tags_id
    let _data = await BlogRelatedLinksServer.delete(tags_id) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new BlogRelatedLinksController()