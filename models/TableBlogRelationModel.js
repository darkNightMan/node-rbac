const db = require('../db/mysql.db')
// const SysUserModel = require('./SysUserModel') // 用户表
const BlogArticleModel = require('./BlogArticleModel') // 文章表
const BlogArticleDetailModel = require('./BlogArticleDetailModel') // 博客详情表
const BlogArticleTagsModel = require('./BlogArticleTagsModel') // 博客标签文章关联
const BlogClassModel = require('./BlogClassModel') // 博客分类
const BlogTagsModel = require('./BlogTagsModel') // 博客标签
const BlogCommentModel = require('./BlogCommentModel') // 博客标签 
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// // 一对多 用户表对关联文章
// SysUserModel.hasMany(BlogArticleModel, {
//   foreignKey: 'user_id', //  外键约束
//   as: 'roleLits'
// }) 
BlogClassModel.hasMany(BlogArticleModel, {
  foreignKey: 'class_id', //  外键约束
}) 
//多对一  分类表对关联文章 belongsTo暴露出的是BlogArticleModel表的‘class_id’字段作为外键去查询BlogClassModel表 
BlogArticleModel.belongsTo(BlogClassModel, {
  foreignKey: 'class_id', //  外键约束
}) 
// 一对一 博客对博客详情 而hasOne方法暴露的是BlogArticleDetailModel表的‘article_id’作为外键查询
BlogArticleModel.hasOne(BlogArticleDetailModel,  { foreignKey: 'article_id', as: 'detail' })
// BlogArticleDetailModel.belongsTo(BlogArticleModel,  { foreignKey: 'acticle_id'})
// -----------文章评论一对多--------------------
BlogArticleModel.hasMany(BlogCommentModel, { foreignKey: 'article_id', as: 'comments'} )//  外键约束)
BlogCommentModel.belongsTo(BlogArticleModel, {  foreignKey: 'article_id', as: 'articles' }) 

BlogArticleModel.hasMany(BlogArticleTagsModel, { foreignKey: 'article_id', as: 'tagsList'} )//  外键约束)
BlogTagsModel.hasMany(BlogArticleTagsModel, { foreignKey: 'tags_id', as: 'articleList'} )//  外键约束)

// 文章-标签 多对多
BlogArticleModel.belongsToMany(BlogTagsModel, {
  through: {
    model: BlogArticleTagsModel,   
    unique: false // 取消联合主键的约定
  },
  as: 'tagsArr',
  foreignKey: 'article_id', //id
  constraints: false
})
// 文章-标签 多对多
BlogTagsModel.belongsToMany(BlogArticleModel, {
  through: {
    model: BlogArticleTagsModel,    
    unique: false // 取消联合主键的约定
  },
  foreignKey: 'tags_id', //id
  constraints: false
})

// db.sync({  
//   force: true // 强制同步
// });
module.exports = {
  BlogArticleModel,
  BlogArticleDetailModel,
  BlogArticleTagsModel,
  BlogClassModel,
  BlogTagsModel,
  BlogCommentModel,
  Sequelize,
  Op
}