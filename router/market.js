const MarketingPageController = require('../controller/MarketingPageController')
module.exports = function (app) {
  app.get('/api/marketing/getMarketPage', MarketingPageController.findOne)
}