const BlogArticleController = require('../controller/BlogArticleController')
const BlogClassController = require('../controller/BlogClassController')
const BlogTagsController = require('../controller/BlogTagsController')
const BlogCommentsController = require('../controller/BlogCommentsController')

module.exports = function (app) {
  app.get('/api/articles/recommenda', BlogArticleController.articleRecommenda)
  app.get('/api/articles/articlesNew', BlogArticleController.articlesNew)
  app.get('/api/articles/list', BlogArticleController.list)
  app.get('/api/articlesClass/list', BlogClassController.list)
  app.get('/api/articlesTags/list', BlogTagsController.list)
  app.get('/api/articles/detail', BlogArticleController.findOne)
  app.get('/api/articlesComment/list', BlogCommentsController.findArticleComment)
  app.post('/api/articlesComment/create', BlogCommentsController.create)
}