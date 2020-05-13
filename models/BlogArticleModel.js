const Sequelize = require('sequelize')
const db = require('../db/mysql.db')
const { formatDate } = require('../utils/format')

// 文章表
let BlogArticleModel = db.define('b_article', {
  article_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false, // 不为空
    autoIncrement: true
  },
  title: Sequelize.CHAR(255),
  user_id: Sequelize.INTEGER,
  class_id:Sequelize.INTEGER,
  is_top: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0
  },
  read_count: Sequelize.INTEGER,
  poll_count: Sequelize.INTEGER,
  cover_url: Sequelize.CHAR(255),
  create_time: {
    type: Sequelize.DATE,
    get() {
      return formatDate(this.getDataValue('create_time'))
    }
  },
  update_time: {
    type: Sequelize.DATE,
    get() {
      return formatDate(this.getDataValue('update_time'))
    }
  }
}, {
  tableName: 'b_article',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: 'create_time', // 不需要createdAt字段
  updatedAt: 'update_time', //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})

module.exports = BlogArticleModel