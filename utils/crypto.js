const crypto = require('crypto')
const { SALTKEY } = require('../conf')
class CryptoAuth {
   // 加密
  static encrypted (password) {
    const cipher = crypto.createCipher('bf', SALTKEY)
    let newPsd = ''
    newPsd += cipher.update(password, 'utf8', 'hex')
    newPsd += cipher.final('hex')
    return newPsd
  }
  // 解密
  static decrypted (password) {
    const decipher = crypto.createDecipher('bf', SALTKEY)
    let oldPsd = ''
    oldPsd += decipher.update(password, 'hex', 'utf8')
    oldPsd += decipher.final('utf8')
    return oldPsd
  }
  // 密码对比
  static checkPasswd (inputPasswd, userPasswd) {
    let result
    if (inputPasswd === userPasswd) {
      result = true
    } else {
      result = false
    }
    return result
  }
}

module.exports = CryptoAuth