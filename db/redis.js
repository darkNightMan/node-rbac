const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')
const colors = require('colors') // https://github.com/Marak/colors.js
class Redis {
  constructor (redis) {
    this.redisClinet = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
    this.redisClinet.on('error', err => {
      console.log(err)
    })
  }
  set (key, val, expTime) {
    console.log(colors.magenta('set redis：=>', 'key:', key))
    console.log(colors.magenta('set redis：=>', 'val:', val))
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
    console.log(colors.magenta('get redis：=>', 'key:', key))
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