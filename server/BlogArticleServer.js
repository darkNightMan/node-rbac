const {
  Op,
  Sequelize,
  BlogArticleModel,
  BlogArticleDetailModel,
  BlogTagsModel,
  BlogClassModel
} = require('../models/TableBlogRelationModel')
const CryptoAuth = require('../utils/crypto')
// 用户
class BlogArticleServer {
  // 列表
  async list(pageParmas, conditions) {
    let { user_id } = conditions
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      if (user_id) {
        where['user_id']= conditions.user_id
      }
    }
    let _data = await BlogArticleModel.findAndCountAll({
      where: where,
      include: [{
        model: BlogClassModel,
        // as: 'detail'
        // through: {
        //   attributes: [] // 排除中间表
        // }, 
      }],
      // order: [
      //   ['create_time', 'DESC']
      // ],
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
    let articles = await BlogArticleModel.create({
      title: data.title,
      cover_url: data.cover_url,
      is_top: data.is_top,
      class_id: data.class_id,
      user_id: data.user_id
    })
    await articles.addTagsArr(data.tagsArr)
    await articles.createDetail({article_id: articles.article_id, content: data.content})
    return true
  }
  // 查询一篇博客
  async findOne(article_id) {
    let data = await BlogArticleModel.findOne({
      where: {
        article_id: article_id
      },
      attributes: [[Sequelize.col('content'), 'content'], 'title', 'cover_url', 'class_id', 'is_top'],
      include: [
        {
          model:BlogArticleDetailModel,
          as: 'detail',
          attributes: []
        },
        {
          model: BlogTagsModel,
          attributes: ['tags_id'],
          as: 'tagsArr',
          through: {
            attributes: [] // 排除中间表
          }, 
        }
      ]
    })
    return data.toJSON()
  }
  // 更新
  async update(data) {
    let tags = await BlogTagsModel.findAll({
      where: {
        tags_id: data.tagsArr
      }
    })
    let articles = await BlogArticleModel.findByPk(data.article_id) //  通过主键查询
    await articles.update({
      title: data.title,
      cover_url: data.cover_url,
      is_top: data.is_top,
      class_id: data.class_id,
      user_id: data.user_id
    },{
      where: {
        article_id: data.article_id
      }
    }
    )
    let row = await articles.setTagsArr(tags)
    let constent = await BlogArticleDetailModel.update({content: data.content}, { where: {article_id: data.article_id}})
    return true
  }
  // 删除
  async delete(article_id) {
    let row = await BlogArticleModel.destroy({
      where: {
        article_id: article_id
      }
    })
    return true
  }
}
module.exports = new BlogArticleServer()