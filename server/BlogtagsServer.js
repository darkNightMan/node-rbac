const {
  Op,
  BlogTagsModel
} = require('../models/TableBlogRelationModel')
const CryptoAuth = require('../utils/crypto')
// 用户
class BlogClassServer {
  // 获取
  async list(pageParmas, conditions) {
    let { user_id } = conditions
    let { pageSize, limitStart } = pageParmas
    let where = {}
    if (conditions) {
      if (user_id) {
        where['user_id']= conditions.user_id
      }
    }
    let _data = await BlogTagsModel.findAndCountAll({
      where: where,
      limit: pageSize,
      offset: limitStart
    })
    return {
      list: _data.rows,
      count: _data.count
    }
  }
  // 获取所有标签
  async listAll(conditions) {
    let { user_id } = conditions
    let where = {}
    if (conditions) {
      if (user_id) {
        where['user_id']= conditions.user_id
      }
    }
    let _data = await BlogTagsModel.findAll({ where: where})
    return {
      list:_data
    }
  }
  // 添加
  async create(data) {
    let tags = await BlogTagsModel.create({
      tags_name: data.tags_name,
      user_id: data.user_id,
    })
    return tags
  }
  // 更新用户
  async update(data) {
    let updateTags = await BlogTagsModel.update({
      tags_name: data.tags_name,
    }, {
      where: {
        tags_id: data.tags_id
      }
    })
    return updateTags
  }
  // 删除
  async delete(tags_id) {
    let row = await BlogTagsModel.destroy({
      where: {
        tags_id: tags_id
      }
    })
    return row
  }
}
module.exports = new BlogClassServer()