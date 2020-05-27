const {
  Op,
  BlogClassModel,
  BlogArticleModel
} = require('../models/TableBlogRelationModel')
const CryptoAuth = require('../utils/crypto')
// 用户
class BlogClassServer {
  // 获取的用户
  async list(pageParmas, conditions) {
    let { user_id = '' } = conditions
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      if (user_id) {
        where['user_id']= user_id
      }
    }
    let _data = await BlogClassModel.findAndCountAll({
      where: where,
      distinct: true,  // 关联数据去重
      include:[{
        model: BlogArticleModel,
        as: 'article'
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
    let classArticle = await BlogClassModel.create({
      class_name: data.class_name,
      user_id: data.user_id
    })
    return classArticle
  }
  // 更新
  async update(data) {
    let classArticle = await BlogClassModel.update({
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
    let row = await BlogClassModel.destroy({
      where: {
        id: id
      }
    })
    return row
  }
}
module.exports = new BlogClassServer()