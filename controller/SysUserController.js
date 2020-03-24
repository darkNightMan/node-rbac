

const sysUserServer = require('../server/sysUserServer')
class SysUserController {
  async test (req, res) {
    let data = await UserServer.testSql()
    res.R.ok(data)
  }
   // 获取所有用户
  async getAllUser (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await sysUserServer.getAllUser()
    if (_data) {
      res.R.ok({userList: _data})
    }
  }
}
module.exports = new SysUserController()