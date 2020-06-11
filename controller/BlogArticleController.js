

const BlogArticleServer = require('../server/BlogArticleServer')
const { formatDate } = require('../utils/format')
const CryptoAuth = require('../utils/crypto')
const { offsetPage } = require('../utils/offsetPage')
const { SALTKEY } = require('../conf')
class BlogArticleController {
   // 获取所有用户列表
  async list (req, res){
    let userid = req.userInfo ? req.userInfo.user_id : ''// 获取存在通过token校验的用户
    // if (!req.userInfo) {
    //   res.R.err('USER_ID_NULL')
    // }
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
      return res.R.err('USER_ID_NULL')
    }
    if (!post.title) {
      return res.R.err('TITLE_IS_EMPTY')
    }
    //     
    let _data = await BlogArticleServer.create(post) // 用户表
    if (_data) {
      return res.R.ok(_data)
    }
  }
  // 查询一篇博客
  async findOne (req, res) {
    let articleId = req.query.article_id
    if (!articleId) {
      return res.R.err('ARTICLE_IS_EMPTY')
    }
    await BlogArticleServer.lookArticle(articleId)
    let data = await BlogArticleServer.findOne(articleId)
    return res.R.ok(data)
  }
  // 更新用户
  async update (req, res) {
    let data = req.body
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let _data = await BlogArticleServer.update(Object.assign(data, {user_id: userid})) // 更新
    return res.R.ok(_data)
  }
  async delete (req, res) {
    let articleId = req.body.article_id
    let _data = await BlogArticleServer.delete(articleId) // 删除
    if (_data) {
      res.R.ok()
    }
  }
  async articleRecommenda (req, res) {
    let data = await BlogArticleServer.articleRecommenda()
    res.R.ok(data)
  }
  async articlesNew (req, res) {
    let data = await BlogArticleServer.articlesNew()
    res.R.ok(data)
  }
  async filedList (req, res) {
    let  _data = await BlogArticleServer.filedList()
    res.R.ok(_data) 
  }
}
module.exports = new BlogArticleController()