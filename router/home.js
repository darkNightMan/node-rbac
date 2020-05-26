const BlogArticleController = require('../controller/BlogArticleController')
const BlogClassController = require('../controller/BlogClassController')
const BlogTagsController = require('../controller/BlogTagsController')
const BlogCommentsController = require('../controller/BlogCommentsController')

module.exports = function (app) {
  app.get('/api/articles/recommenda', BlogArticleController.articleRecommenda)
  app.get('/api/articles/articlesNew', BlogArticleController.articlesNew)
}