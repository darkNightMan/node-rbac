

const BlogArticleServer = require('../server/BlogArticleServer')
const { formatDate } = require('../utils/format')
const CryptoAuth = require('../utils/crypto')
const { offsetPage } = require('../utils/offsetPage')
const { SALTKEY } = require('../conf')
class BlogArticleController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.R.ok(data)
  }
   // 获取所有用户列表
  async list (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await BlogArticleServer.list(pageParams, Object.assign({ user_id: userid}, conditions)) // 用户表  
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
  // 新建文章
  async create (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let data = req.body
    let post = {
      title: data.title,
      user_id: userid,
      cover_url: data.cover_url,
      class_id: data.class_id,
      tagsArr: data.tagsArr,
      is_top: data.is_top,
      content: data.content,
    } 
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    //     
    let _data = await BlogArticleServer.create(post) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新用户
  async update (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let data = req.body
    data.update_id = userid
    let _data = await SysUserServer.updateUser(data) // 更新
    res.R.ok(_data)
  }
  async delete (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let user_id = req.body.user_id
    let _data = await SysUserServer.deleteUser(user_id) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new BlogArticleController()