class NotFind {
  notApi (req, res, next) {
    res.R.err('NOT_FIND_ROUTE')
  }
}
module.exports = new NotFind()