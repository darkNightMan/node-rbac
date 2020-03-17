class Log {
  setLog (req, res, next) {
    res.a = 1
    next()
  }
}

module.exports = new Log()