
const redis = require('../db/redis')
class Permissions {
  hasPerms (authName) {
    return async function (req, res, next) {
      let userid = req.userInfo.user_id
      let perms = await redis.get(`user_perms_${userid}`)
      let hasPows = perms.split(',').every(it => it === authName)
      if (!hasPows) {
        return res.R.err('USER_PERMS_EXITS')
      }
      next()
    }
  }
}

module.exports = new Permissions()