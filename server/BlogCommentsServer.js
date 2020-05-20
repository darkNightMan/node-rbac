const {
  Op,
  Sequelize,
  BlogArticleModel,
  BlogCommentModel
} = require('../models/TableBlogRelationModel')
const CryptoAuth = require('../utils/crypto')
// 用户
class BlogCommentsServer {
  // 获取的用户
  async list(pageParmas, conditions) {
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      
    }
    let _data = await BlogCommentModel.findAndCountAll({
      where: where,
      attributes: [[Sequelize.col('title'), 'title'],'comment_authot','comment_authot_email','comment_content', 'comment_time', 'article_id', 'comment_id', 'user_id'],
      include: [{
        model: BlogArticleModel,
        as: 'articles'
      }],
      limit: pageSize,
      offset: limitStart
    })
    return {
      list: _data.rows,
      count: _data.count
    }
  }
  // 添加
  async create(data) {
    let classArticle = await BlogCommentModel.create({
      class_name: data.class_name,
      user_id: data.user_id
    })
    return classArticle
  }
  // 更新
  async update(data) {
    let classArticle = await BlogCommentModel.update({
      class_name: data.class_name
    },{
      where: {
        id: data.id
      }
    })
    return classArticle
  }
  // 删除
  async delete(id) {
    let row = await BlogCommentModel.destroy({
      where: {
        id: id
      }
    })
    return row
  }
}
module.exports = new BlogCommentsServer()