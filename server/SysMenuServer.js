const {
  exec
} = require('../db/mysql.js')

const { SysResourceModel, SysRolePermmisionModel, SysUserRoleModel,Op, SysRoleModel, SysUserModel } = require('../models/TableRelationModel')

// 菜单
class SysMenuServer {
  // 获取菜单列表
  async list(pageParmas, conditions) {
    let sqlist = `SELECT * FROM sys_resource where 1=1 `
    let sqltotal = `SELECT COUNT(res_id) AS count FROM sys_resource where 1=1 `
    let sqlArr = [] 
    let sqltotalArr = []
    if (conditions) { // 如果存在条件查询
      if (conditions.treeId) {  //  树查询
        let tree = parseInt(conditions.treeId)        
        sqlist+= ` and parent_id = ? `
        sqlArr.push(tree)
        sqlist+= `or res_id = ?`
        sqlArr.push(tree)
       
        sqltotal+= ` and  parent_id = ?  `
        sqltotalArr.push(tree)
        sqltotal+= ` or res_id = ? `
        sqltotalArr.push(tree)
      }
    }
    sqlist+= ` LIMIT ?, ? `
    sqlArr.push(pageParmas.limitStart, pageParmas.pageSize)
    
    sqltotalArr.push(pageParmas.limitStart, pageParmas.pageSize)
    let list = await exec(sqlist, sqlArr)
    let total = await exec(sqltotal, sqlArr)
    return {   
      list,
      total
    }
  }
  async selectMenuList () {
    // let sql = `SELECT res_name, res_id, parent_id FROM sys_resource WHERE type < 3 ORDER BY sort ASC;`
    let _data = await SysResourceModel.findAll({ 
      where: {
        type: {
           [Op.lt]: 3
        }
      },
      attributes: ['res_id', 'parent_id', 'res_name'],
      order: [['sort', 'ASC']]
    })
    let list = []
     // 需注意 sequezile 查出来的数据不能对其刷数据进行添加或者删除 需要的数据只能自己组装了
    _data.map((it) => { list.push({res_id: it.res_id, res_name: it.res_name, parent_id: it.parent_id})})
    return list
  }
  // 获取所有菜单树
  async getTreeMenu() {
    let _data = await SysResourceModel.findAll({ 
      attributes: ['res_id', 'parent_id', 'res_name'],
      order: [['sort', 'ASC']]
    })
    let list = []
     // 需注意 sequezile 查出来的数据不能对其刷数据进行添加或者删除 需要的数据只能自己组装了
    _data.map((it) => { list.push({res_id: it.res_id, res_name: it.res_name, parent_id: it.parent_id})})
    return list
  }
  // 当前用户的菜单
  async getMenu(userId) {    
    let sql = `SELECT	sys_resource.*  FROM  sys_user_role
      INNER JOIN sys_role_permmision ON sys_user_role.role_id = sys_role_permmision.role_id
      INNER JOIN sys_resource ON sys_role_permmision.res_id = sys_resource.res_id
      WHERE user_id = ${userId} AND type < 3 GROUP BY res_id ORDER BY sort ASC`
      let row = await exec(sql)
    return row
  }
  async getUserPer(userId) {
    // 查询角色
    let role = await SysUserModel.findOne({
      attributes: [],
      where: {
        user_id: 33
      },
      include: [
        {
          model: SysRoleModel,   
          attributes: ['role_id'],
          through: { attributes: [] }, // 排除中间表
        }
      ],
      raw: false
    })
    let roleList = []
    role.toJSON().sys_roles.map((it) => roleList.push(it.role_id))
    // 查询权限
    let perms = await  SysRoleModel.findAll({ 
      attributes: [],
      where: {
        role_id: roleList
      },
      include: [
        {
          model: SysResourceModel,
          attributes: ['perms',],
          where: {
            perms: {
              [Op.ne]: null, // 不为null 
              [Op.ne]: '' // 不为空
            }
          },
          through: { attributes: [] }, // 排除中间表
          required: false,
        }
      ],
      group: 'perms'
    })
    return perms
  }
  async insertMenu (data) {
    let sql = `INSERT INTO sys_resource (parent_id, res_name, res_code, component, description, create_time, res_icon, sort, type, perms, state) 
    VALUES (${data.parent_id},'${data.res_name}','${data.res_code}','${data.component}','${data.description}',now(),'${data.res_icon}', ${data.sort}, ${data.type}, '${data.perms}', ${data.state}
    )`
    let row = await exec(sql)
    return row
  }
  async updatedMenu (data) {
    let sql = `UPDATE sys_resource SET sort = ${data.sort}, type = ${data.type}, state = ${data.state}, parent_id= ${data.parent_id}, res_name = '${data.res_name}', res_code= '${data.res_code}', res_icon= '${data.res_icon}', description = '${data.description}', component= '${data.component}', perms='${data.perms}' WHERE res_id = ${data.res_id}`
    let row = await exec(sql)
    return row
  }
  // 删除菜单
  async deleteMenu (res_id) {
    const del = async(resid) => {
      let row = await exec(`SELECT * FROM sys_resource WHERE parent_id = ${resid}`) // 查询是否有关联的子菜单
      if (row.length > 0) { // 如果存在子子菜单递归删除
        await exec(`DELETE FROM sys_resource WHERE parent_id = ${resid}`)
        return del(resid)
      } else { // 如果没有子菜单则删除当前菜单
        return await exec(`DELETE FROM sys_resource WHERE res_id = ${resid}`)
      }
    }   
    let row = await del(res_id)
    return row
  }
}
module.exports = new SysMenuServer()
