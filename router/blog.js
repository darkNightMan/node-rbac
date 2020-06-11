const BlogArticleController = require('../controller/BlogArticleController')
const BlogClassController = require('../controller/BlogClassController')
const BlogTagsController = require('../controller/BlogTagsController')
const BlogCommentsController = require('../controller/BlogCommentsController')
const BlogRelatedLinksController = require('../controller/BlogRelatedLinksController')
const BlogMsgCommentsController = require('../controller/BlogMsgCommentsController')
module.exports = function (app) {
  app.get('/api/articles/recommenda', BlogArticleController.articleRecommenda)
  app.get('/api/articles/articlesNew', BlogArticleController.articlesNew)
  app.get('/api/articles/list', BlogArticleController.list)
  app.get('/api/articles/filedList', BlogArticleController.filedList)
  app.get('/api/articlesClass/list', BlogClassController.list)
  app.get('/api/articlesTags/list', BlogTagsController.list)
  app.get('/api/articles/detail', BlogArticleController.findOne)
  app.post('/api/articlesComment/create', BlogCommentsController.create)
  app.get('/api/articlesComment/list', BlogCommentsController.findArticleComment)
  app.get('/api/relatedLink/allList',BlogRelatedLinksController.allList)
  app.get('/api/msgComments/treeLits',BlogMsgCommentsController.findMsgCommentTreeLits)
  app.post('/api/msgComments/createMsg',BlogMsgCommentsController.create)
 
}