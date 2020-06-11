const Sequelize = require('sequelize')
const db = require('../db/mysql.db')
const { formatDate } = require('../utils/format')
let BlogCommentModel = db.define('b_comments', {
  comment_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false, // 不为空
    autoIncrement: true
  },
  article_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  parent_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  comment_author: Sequelize.CHAR(255),
  comment_author_email: Sequelize.CHAR(255),
  comment_content: Sequelize.TEXT,
  comment_time: {
    type: Sequelize.DATE,
    get() {
      return formatDate(this.getDataValue('comment_time'))
    }
  }
}, {
  tableName: 'b_comments',
  timestamps: true, // 是否需要增加createdAt、updatedAt字段
  createdAt: 'comment_time', // 不需要createdAt字段
  updatedAt: false, //修改updatedAt字段名称为endtime
  freezeTableName: true, // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
})
// db.sync({  
//   force: true // 强制同步
// });
module.exports = BlogCommentModel