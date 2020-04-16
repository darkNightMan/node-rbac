module.exports = {
  offset: (query) => {
    let result = {
      pageSize: (query.pageSize !== undefined) ? parseInt(query.pageSize) : 10,
      page: (query.page !== undefined) ? parseInt(query.page) : 1,
      sort: (query.sortRule !== undefined) ? parseInt(query.sortRule) : parseInt(-1)
    }
    return result
  }
}
