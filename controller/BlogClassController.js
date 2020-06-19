

const SysUserServer = require('../server/SysUserServer')
const BlogClassServer = require('../server/BlogClassServer')
const { formatDate } = require('../utils/format')
const CryptoAuth = require('../utils/crypto')
const { offsetPage } = require('../utils/offsetPage')
const { SALTKEY } = require('../conf')
class BlogClassController {
  // 列表
  async list (req, res){
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await BlogClassServer.list(pageParams, Object.assign({ user_id: userid}, conditions)) // 用户表  
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
   // 列表
  async listAll (req, res){
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    let _data = await BlogClassServer.listAll({ user_id: userid}) // 用户表  
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 创建
  async create (req, res) {
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    let classInfo = {
      class_name: req.body.class_name,
      user_id: userid
    }
    let _data = await BlogClassServer.create(classInfo) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新
  async update (req, res) {
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    let data = req.body
    let _data = await BlogClassServer.update(data) // 更新
    res.R.ok(_data)
  }
  // 删除
  async delete (req, res) {
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    let id = req.body.id
    let _data = await BlogClassServer.delete(id) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new BlogClassController()