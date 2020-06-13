
const SysRoleServer = require('../server/SysRoleServer.js')

class SysRoleController {
    // 获取当前角色下的权限
  async getRoleTreePer (req, res) {
    let role_id = req.query['role_id'] // 参数
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户 
    let _menu = await SysRoleServer.getRolePer(role_id)
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }   
    if (_menu) {
      let resIdarr = []
      _menu.map(it => {resIdarr.push(it.res_id)})
      res.R.ok({res_id: resIdarr})
    }
  }
  // 修改更新当前角色权限
  async setRoleTreePer (req, res) {
    let role_id = req.body.role_id // 参数
    let res_idArr = req.body.res_idArr // 参数
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户 
    let _data = await SysRoleServer.setRolePer(role_id, res_idArr)
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    if (_data) {
      res.R.ok('修改成功')
    }
  }
  //  列表
  async list (req, res){
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await SysRoleServer.list()
    if (_data) {
      res.R.ok({roleList: _data})
    }
  }
  // 创建
  async create (req, res) {
    let roleName = req.body.role_name
    let roleCode = req.body.role_code
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await SysRoleServer.createRole(roleName, roleCode)
    if (_data) {
      res.R.ok('新增成功')
    }
  }
  // 更新
  async update (req, res) {
    let roleName = req.body.role_name
    let roleCode = req.body.role_code
    let roleId = req.body.role_id
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await SysRoleServer.updateRole(roleId, roleName, roleCode)
    if (_data) {
      res.R.ok('修改成功')      
    }
  }
  // 删除
  async delete (req, res) {    
    // let role_id = req.query['role_id'] // 参数
    let role_id = req.body.role_id // 参数
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    if (!userid) {
      res.R.err('USER_ID_NULL')
    }
    let _data = await SysRoleServer.daleteRole(role_id)
    if (_data) {
      res.R.ok('删出成功')
    }
  }
}
module.exports = new SysRoleController()
