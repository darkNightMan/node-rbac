const {
  Op,
  Sequelize,
  SysUserModel,
  BlogArticleModel,
  BlogCommentModel
} = require('../models/TableBlogRelationModel')
const CryptoAuth = require('../utils/crypto')
// 用户
class BlogCommentsServer {
  // 获取
  async list(pageParmas, conditions) {
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      
    }
    let _data = await BlogCommentModel.findAndCountAll({
      where: where,
      attributes: [[Sequelize.col('title'), 'title'],'comment_author','comment_author_email','comment_content', 'comment_time', 'article_id', 'comment_id', 'user_id'],
      include: [{
        model: BlogArticleModel,
        as: 'articles'
      }],
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
  async findArticleComment(article_id) {
    let parentComment = []
    let _dataParentComment = await BlogCommentModel.findAll({ 
      where: { article_id: article_id, parent_id: 0}, 
      include:[{
        model:SysUserModel, 
        as: 'userInfo',
        attributes: ['avatar']
      }],
      order: [
        ['comment_time', 'DESC']
      ]
    }) // 获取所有根级评论 
    let _dataAllComment = await BlogCommentModel.findAll({
       where: { article_id: article_id},
       include:[{
        model:SysUserModel, 
        as: 'userInfo',
        attributes: ['avatar']
      }]
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
            article_id: it.article_id,
            user_id: it.user_id,
            parent_id: it.parent_id,
            comment_author: it.comment_author,
            comment_author_email:it.comment_author_email,
            comment_content:it.comment_content,
            userInfo: it.userInfo
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
    let comments = await BlogCommentModel.create({
      parent_id: data.parent_id,
      user_id: data.user_id,
      article_id: data.article_id,
      comment_author_email: data.comment_author_email,
      comment_content: data.comment_content,
      comment_author: data.comment_author,
    })
    return comments
  }
  // 更新
  async update(data) {
    let classArticle = await BlogCommentModel.update({
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
    let row = await BlogCommentModel.destroy({
      where: {
        comment_id: commentId
      }
    })
    return row
  }
}
module.exports = new BlogCommentsServer()