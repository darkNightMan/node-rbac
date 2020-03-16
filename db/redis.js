const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')
class Redis {
  constructor (redis) {
    this.redisClinet = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
    this.redisClinet.on('error', err => {
      console.log(err)
    })
  }
  set (key, val, expTime) {
    if (typeof val === 'object') {
      let val = JSON.stringify(val)
    }
    if (expTime) {
      this.redisClinet.setex(key, expTime, val)
    } else {
      this.redisClinet.set(key, val, redis.print)
    }
  }
  get (key) {
    const promise = new Promise((resolve, reject) => {
      this.redisClinet.get(key, (err, val) => {
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
module.exports = new Redis(redis)