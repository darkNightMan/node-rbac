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
  // 获取的用户
  async list(pageParmas, conditions) {
    let where = {}
    if (conditions) {
      if (conditions.user_id) {
        where: {
          user_id: conditions.user_id
        }
      }
    }
    let _data = await BlogArticleModel.findAndCountAll({
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
      limit: pageParmas.pageSize,
      offset: pageParmas.limitStart
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
    await articles.addB_tags(data.tagsArr)
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
          as: 'tagsArr',
          through: {
            attributes: [] // 排除中间表
          }, 
        }
      ]
    })
    return data
  }
  // 更新
  async update(data) {
    let tags = await BlogTagsModel.findAll({
      where: {
        tags_id: data.tagsArr
      }
    })
    console.log(tags)
    // let articles = await BlogArticleModel.findByPk(data.article_id) //  通过主键查询
    // await articles.update({
    //   title: data.title,
    //   cover_url: data.cover_url,
    //   is_top: data.is_top,
    //   class_id: data.class_id,
    //   user_id: data.user_id
    // })
    // let row = await articles.setTags(roles)
    return true
  }
  // 删除
  async deleteUser(user_id) {
    let row = await SysUserModel.destroy({
      where: {
        user_id: user_id
      }
    })
    return true
  }
}
module.exports = new BlogArticleServer()