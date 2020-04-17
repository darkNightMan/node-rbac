module.exports = {
  offsetPage: (query) => {
      let queryForMat = {
        condition: {},
        limitStart: query.page && query.pageSize ? (query.page - 1) * parseInt(query.pageSize) : 0,
        pege: 1,
        pageSize: 10
      }
      Object.keys(query).map((it) => {
        if (it == 'page' || it == 'pageSize') {
          queryForMat[it] = parseInt(query[it])
        } else {
          queryForMat.condition[it]= query[it]
        }
      })
    return queryForMat
  }
}
