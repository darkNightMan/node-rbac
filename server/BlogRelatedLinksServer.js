const {
  Op,
  SysUserModel,
  BlogRelatedLinksModel
} = require('../models/TableBlogRelationModel')

// 用户
class BlogRelatedLinksServer {
  // 获取
  async list(pageParmas, conditions) {
    let { user_id = '' } = conditions
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      if (user_id) {
        where['user_id']= user_id
      }
    }
    let _data = await BlogRelatedLinksModel.findAndCountAll({
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
    let classArticle = await BlogRelatedLinksModel.create({
      class_name: data.class_name,
      user_id: data.user_id
    })
    return classArticle
  }
  // 更新
  async update(data) {
    let classArticle = await BlogRelatedLinksModel.update({
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
    let row = await BlogRelatedLinksModel.destroy({
      where: {
        id: id
      }
    })
    return row
  }
}
module.exports = new BlogRelatedLinksServer()