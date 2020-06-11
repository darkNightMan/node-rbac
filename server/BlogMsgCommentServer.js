const BlogMsgCommentModel = require('../models/BlogMsgCommentModel')
// 用户
class BlogMsgCommentsServer {
  // 获取
  async list(pageParmas, conditions) {
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      
    }
    let _data = await BlogMsgCommentModel.findAndCountAll({
      order: [
        ['comment_time', 'DESC']
      ],
      limit: pageSize,
      offset: limitStart
    })
    return {
      list: _data.rows,
      count: _data.count
    }
  }
  async findMsgComment(comment_id) {
    let parentComment = []
    // 根级
    let _dataParentComment = await BlogMsgCommentModel.findAll({ 
      where: { comment_id: comment_id},
      order: [
        ['comment_time', 'DESC']
      ]
    }) // 获取子集根级评论 
    let _dataAllComment = await BlogMsgCommentModel.findAll({
      where: {  parent_id: comment_id}, 
    }) // 获取所有根级评论
    let findChild = async(item, childComments) => {
      _dataAllComment.map(it => {
         if (item.comment_id === it.parent_id ) {
            childComments.push(it)
            findChild(it, childComments)
         }
      })
    }
    _dataParentComment.map((it) => { 
        parentComment.push(
          {
            comment_time: it.comment_time,
            comment_id: it.comment_id,
            user_id: it.user_id,
            parent_id: it.parent_id,
            comment_author: it.comment_author,
            comment_author_email:it.comment_author_email,
            comment_content:it.comment_content,
          }
        ) 
      parentComment.map(it => {
         findChild(it, it.childComments = new Array())
      })
    })
    return {
      comments: parentComment,
      count: _dataAllComment.length + _dataParentComment.length
    }
  }

  async findMsgCommentTreeLits(pageParmas, conditions) {
    let {pageSize, limitStart } = pageParmas
    let parentComment = []
    // 获取所有根级评论 
    let _dataParentComment = await BlogMsgCommentModel.findAndCountAll({ 
      where: { parent_id: 0}, 
      order: [
        ['comment_time', 'DESC']
      ],
      limit: pageSize,
      offset: limitStart
    }) 
    // 子集
    let _dataAllComment = await BlogMsgCommentModel.findAll({
      //  where: { parent_id: comment_id},
    }) // 组装评论
    let findChild = async(item, childComments) => {
      _dataAllComment.map(it => {
         if (item.comment_id === it.parent_id ) {
            childComments.push(it)
            findChild(it, childComments)
         }
      })
    }
    _dataParentComment.rows.map((it) => { 
        parentComment.push(
          {
            comment_time: it.comment_time,
            comment_id: it.comment_id,
            user_id: it.user_id,
            parent_id: it.parent_id,
            comment_author: it.comment_author,
            comment_author_email:it.comment_author_email,
            comment_content:it.comment_content,
          }
        ) 
      parentComment.map(it => {
         findChild(it, it.childComments = new Array())
      })
    })
    return {
      comments: parentComment,
      count: _dataAllComment.length
    }
  }
  // 添加
  async create(data) {
    let comments = await BlogMsgCommentModel.create({
      parent_id: data.parent_id,
      user_id: data.user_id,
      comment_author_email: data.comment_author_email,
      comment_content: data.comment_content,
      comment_author: data.comment_author,
    })
    return comments
  }
  // 更新
  async update(data) {
    let classArticle = await BlogMsgCommentModel.update({
      comment_content: data.comment_content
    },{
      where: {
        comment_id: data.parent_id
      }
    })
    return classArticle
  }
  // 删除
  async delete(commentId) {
    let row = await BlogMsgCommentModel.destroy({
      where: {
        comment_id: commentId
      }
    })
    return row
  }
}
module.exports = new BlogMsgCommentsServer()