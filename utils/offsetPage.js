module.exports = {
  offsetPage: (query = {}) => {
    const pageParams = { 
      page: query.page ? parseInt(query.page) : 1,
      pageSize: query.pageSize ? parseInt(query.pageSize) : 10, 
      limitStart: query.page && query.pageSize ? (query.page - 1) * parseInt(query.pageSize) : 0,
    }
    delete query.page
    delete query.pageSize
    return {
      conditions: query,
      pageParams: pageParams
    }
  }
}
