


const BlogMsgCommentServer = require('../server/BlogMsgCommentServer')
const { offsetPage } = require('../utils/offsetPage')
class BlogMsgCommentsController {
  // 获取
  async list (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    const { pageParams, conditions } = offsetPage(req.query)
    let _data = await BlogMsgCommentServer.list(pageParams, conditions) // 用户表  
    if (_data) {
      res.R.ok({
        list: _data.list,
        totalCount: _data.count,
        currentPage: pageParams.page,
        pageSize: pageParams.pageSize
      })
    }
  }
  // 查询留言评论
  async findMsgComment (req, res) {
    let comment_id = req.query.comment_id
    let data = await BlogMsgCommentServer.findMsgComment(comment_id)
    res.R.ok(data)
  }
  async findMsgCommentTreeLits (req, res) {
    // let comment_id = req.query.comment_id
    const { pageParams, conditions } = offsetPage(req.query)
    let data = await BlogMsgCommentServer.findMsgCommentTreeLits(pageParams, conditions)
    res.R.ok(data)
  }
  // 创建
  async create (req, res) {
    let commentsInfo = {
      parent_id: req.body.parent_id || 0,
      user_id: req.userInfo ? req.userInfo.user_id : '',
      comment_author_email: req.body.comment_author_email,
      comment_content: req.body.comment_content,
      comment_author: req.body.comment_author,
    }
    if (!req.body.comment_author_email || !req.body.comment_content || !req.body.comment_author) {
      res.R.err('MSGCOMMENT_IS_EMPTY')
    }
    let _data = await BlogMsgCommentServer.create(commentsInfo) // 用户表
    if (_data) {
      res.R.ok(_data)
    }
  }
  // 更新
  async update (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let data = req.body
    let _data = await BlogMsgCommentServer.update(data) // 更新
    res.R.ok(_data)
  }
  // 删除
  async delete (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let commentId = req.body.commentId
    let _data = await BlogMsgCommentServer.delete(commentId) // 删除
    if (_data) {
      res.R.ok(_data)
    }
  }
}
module.exports = new BlogMsgCommentsController()