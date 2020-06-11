


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
  async allList (req, res){
    let _data = await BlogRelatedLinksServer.allList() // 用户表  
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 创建
  async create (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let data = {
      tags_name: req.body.tags_name,
      nick_name: req.body.nick_name,
      icon: req.body.icon,
      url: req.body.url,
      description: req.body.description,
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
    let id = req.body.id
    let _data = await BlogRelatedLinksServer.delete(id) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new BlogRelatedLinksController()