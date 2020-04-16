module.exports = {
  offsetPage: (query) => {
    return  {
      pageSize: (query.pageSize !== undefined) ? parseInt(query.pageSize) : 10,
      page: (query.page !== undefined) ? parseInt(query.page) : 1,
      sort: (query.sortRule !== undefined) ? parseInt(query.sortRule) : parseInt(-1),
      limitStart: (query.pageSize !== undefined) ? (query.page -1) * query.pageSize : 0 
    }
  }
}
