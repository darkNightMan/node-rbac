const MarketingPageController = require('../controller/MarketingPageController')
const InterceptAuth = require('../middlewares/intercept')
module.exports = function (app) {
  app.get('/api/marketing/getMarketPage', MarketingPageController.findOne)
  app.use(InterceptAuth.authToken) // 校验token
  app.get('/api/marketing/list', MarketingPageController.list) // 列表  
  app.post('/api/marketing/create', MarketingPageController.create) // 添加
  app.put('/api/marketing/update', MarketingPageController.update) // 更新
  app.delete('/api/marketing/delete', MarketingPageController.delete) // 更新 
}