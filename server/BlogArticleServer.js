const {
  Op,
  SysUserModel,
  Sequelize,
  BlogArticleModel,
  BlogArticleDetailModel,
  BlogTagsModel,
  BlogClassModel,
  BlogCommentModel,
} = require('../models/TableBlogRelationModel')
const CryptoAuth = require('../utils/crypto')
// 用户
class BlogArticleServer {
  // 列表
  async list(pageParmas, conditions) {
    let { user_id = '', class_id, tags_id } = conditions
    let {pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      if (user_id) {
        where['user_id']= user_id
      }
      if(class_id) {
        where['class_id'] = class_id
      }
    }
    let _data = await BlogArticleModel.findAndCountAll({
      where: where,
      distinct: true,  // 关联数据去重
      attributes: [ 'title', 'cover_url', 'class_id', 'is_top', 'create_time', 'read_count', 'poll_count', 'update_time', 'article_id'],
      include: [{
        model: BlogClassModel,
        attributes: ['class_name'],
        as: 'article_class'
      },
      {
        model: BlogTagsModel,
        as: 'tagsArr',
        through: {
          attributes: [] // 排除中间表
        }, 
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
      attributes: [[Sequelize.col('content'), 'content'], [Sequelize.col('nick_name'), 'authorName'],  [Sequelize.col('class_name'), 'class_name'], 'title', 'cover_url', 'class_id', 'is_top', 'create_time', 'read_count', 'poll_count', 'update_time'],
      include: [
        {
          model:BlogArticleDetailModel,
          as: 'detail',
          attributes: []
        },
        {
          model: BlogClassModel,
          as: 'article_class',
          attributes: []
        },
        {
          model:SysUserModel,
          as: 'userInfo',
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
  async articleRecommenda () {
    let data = await BlogArticleModel.findAll({
      where: {
        is_top: 1,
      },
      attributes: [[Sequelize.col('class_name'), 'class_name'], 'article_id', 'title', 'cover_url', 'class_id', 'is_top', 'create_time', 'read_count', 'poll_count', 'update_time'],
      include: [
        {
          model: BlogClassModel,
          attributes: [],
          as: 'article_class'
        },
      ],
      // order: [['update_time']],
      limit: 5,
    })
    return data
  }
  async articlesNew () {
    let data = await BlogArticleModel.findAll({
      attributes: [[Sequelize.col('class_name'), 'class_name'],'article_id', 'title', 'cover_url', 'class_id', 'is_top', 'create_time', 'read_count', 'poll_count', 'update_time'],
      include: [
        {
          model: BlogClassModel,
          attributes: [],
          as: 'article_class'
        },
      ],
      order: [['create_time']],
      limit: 8,
    })
    return data
  }
  // 归档
  async filedList () {
    let years = await BlogArticleModel.findAll({
      raw: true,
      attributes: [[Sequelize.fn('date_format',Sequelize.col('update_time'), '%Y'),'year']],
      group: [[Sequelize.fn('date_format',Sequelize.col('update_time'), '%Y'),'year']],
      order: [['update_time', 'DESC']]
    })
    const getyearsList = async() => {
       return years.map(async (it) => {
        let data = await BlogArticleModel.findAll({where: {update_time: Sequelize.where(Sequelize.fn('date_format',Sequelize.col('update_time'), '%Y'), it.year)},raw: true,})
        return {year:it.year, data}
      }) 
    }
    let fn = await getyearsList() 
    let data = Promise.all(fn)   
    return data
  }
  // 查看
  async lookArticle (article_id) {
    let articles = await BlogArticleModel.findByPk(article_id)
    articles.update(
      {
        read_count: articles.read_count + 1
      },
      {
        where:{
          article_id: article_id
        }
      }
    )
    return true
  }
}
module.exports = new BlogArticleServer()