


const BlogCommentsServer = require('../server/BlogCommentsServer')
const { offsetPage } = require('../utils/offsetPage')
class BlogCommentsController {
  // 获取
  async list (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await BlogCommentsServer.list(pageParams, conditions) // 用户表  
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
  async findArticleComment (req, res) {
    let articleId = req.query.article_id
    let data = await BlogCommentsServer.findArticleComment(articleId)
    res.R.ok(data)
  }
  // 创建
  async create (req, res) {
    let commentsInfo = {
      parent_id: req.body.parent_id || 0,
      user_id: req.userInfo.user_id,
      article_id: req.body.article_id,
      comment_author_email: req.body.comment_author_email,
      comment_content: req.body.comment_content,
      comment_author: req.body.comment_author,
    }
    let _data = await BlogCommentsServer.create(commentsInfo) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新
  async update (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let data = req.body
    let _data = await BlogCommentsServer.update(data) // 更新
    res.R.ok(_data)
  }
  // 删除
  async delete (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let commentId = req.body.commentId
    let _data = await BlogCommentsServer.delete(commentId) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new BlogCommentsController()