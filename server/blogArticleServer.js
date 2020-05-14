const {
  Op,
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
  // 更新
  async updateUser(data) {
    let roles = await SysRoleModel.findAll({
      where: {
        role_id: data.role_id
      }
    })
    let user = await SysUserModel.findByPk(data.user_id) //  通过主键查询
    await user.update({
      nick_name: data.nick_name,
      password: CryptoAuth.encrypted(data.password), // 密码加密data.password,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      create_time: data.create_time,
      update_id: data.update_id,
    })
    let row = await user.setSys_roles(roles)
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