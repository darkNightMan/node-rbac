

const SysLogServer = require('../server/SysLogServer')
const SysRoleServer = require('../server/SysRoleServer')
const { formatDate } = require('../utils/format')
const { offsetPage } = require('../utils/offsetPage')
class SysLoginLogsController {
  async list (req, res) {
    let userid = req.userInfo.user_id // 获取存在通过token校验的用户
    let { pageParams, conditions } = offsetPage(req.query)

    let roleList = await SysRoleServer.findRoles() // 用户角色关联
    let roleName = await SysRoleServer.list() // 角色名
    let isSuperManage = roleList.some(it =>  it.role_id === 1) // 超级管理员 
    // let isSuperManage = false
    let _data = await SysLogServer.list(pageParams,  Object.assign({ user_id: isSuperManage ? '' : userid }, conditions))
   
    // _data.list.map((it1) => {
    //   roleList.map((it2) => {
    //     if (it1.user_id === it2.user_id ){ // 匹配表关联的数据        
    //       if(Object.prototype.toString.call(it1.roleList) == '[object Array]') {
    //         it1.roleList.push(getName(roleName,  it2.role_id))
    //       } else {
    //         it1.roleList  = new Array()
    //         // it1.roleList.push(roleName.filter((r) => r.role_id === it2.role_id))
    //         it1.roleList.push(getName(roleName,  it2.role_id))
    //       }
    //     }
    //     it1.login_time = formatDate(it1.login_time)
    //   })
    // })
    // function getName(roleName, role_id) {
    //   let nameObj = {}
    //   roleName.forEach((r) =>{
    //     if (r.role_id === role_id) {
    //       nameObj = r
    //     }
    //   })
    //   return nameObj
    // }
   res.R.ok({
      list: _data.list,
      totalCount: _data.count,
      currentPage: pageParams.page,
      pageSize: pageParams.pageSize
    })
  }
}
module.exports = new SysLoginLogsController()