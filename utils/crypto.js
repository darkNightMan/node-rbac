class Crypto {
   // 密码加密
  static encrypted (password, saltKey) {
    const cipher = crypto.createCipher('bf', saltKey)
    let newPsd = ''
    newPsd += cipher.update(password, 'utf8', 'hex')
    newPsd += cipher.final('hex')
    return newPsd
  }
  // 密码解密
  static decrypted (password, saltKey) {
    const decipher = crypto.createDecipher('bf', saltKey)
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