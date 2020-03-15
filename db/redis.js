const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端 
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.log(err)
})

let redisFn = {
  set: function(key, val, expTime) {
    if (typeof val === 'object') {
      var val = JSON.stringify(val)
    }
   if (expTime) {
      redisClient.setex(key, expTime, val)
   } else {
      redisClient.set(key, val, redis.print)
   }
  },
  get: function (key) {
    const promise = new Promise((resolve, reject) => {
      redisClient.get(key, (err, val) => {
        if (err) {
          reject(err)
          return
        }
        if (val === null) {
          resolve(null)  
          return    
        }
        try {
          resolve(JSON.parse(val))
        }catch (ex) {
          resolve(val)     
        }
      })
    })
    return promise
  }
}

module.exports = redisFn