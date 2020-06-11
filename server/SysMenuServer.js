const {
  SysResourceModel,
  Op,
  SysRoleModel,
  SysUserModel
} = require('../models/TableRelationModel')

// 菜单
class SysMenuServer {
  // 获取菜单列表
  async list(pageParmas, conditions) {
    let where = {}
    let listMenu = []
    if (conditions) {
      if (conditions.treeId) {
        where[Op.or] = [{
            parent_id: conditions.treeId
          },
          {
            res_id: conditions.treeId
          },
        ]
      }
    }
    let rescource = await SysResourceModel.findAndCountAll({
      where,
      order: [
        // [conditions.treeId ? 'parent_id' : 'sort', 'ASC']
        ['parent_id' , 'ASC']
      ],
      limit: pageParmas.pageSize,
      offset: pageParmas.limitStart
    })
    // 列表
    rescource.rows.map((row) => { 
      listMenu.push(
        {
          res_id: row.res_id,
          parent_id:row.parent_id,
          res_name:row.res_name,
          res_icon:row.res_icon,
          state: row.state,
          res_code:row.res_code,
          type:row.type,
          component:row.component,
          description:row.description,
          sort:row.sort,
          create_time: row.create_time,
          perms: row.perms
        }
      )
    })
    return {
      list: listMenu,
      count: rescource.count
    }
  }
  // 查询非按钮菜单
  async selectMenuList() {
    let _data = await SysResourceModel.findAll({
      where: {
        type: {
          [Op.lt]: 3
        }
      },
      attributes: ['res_id', 'parent_id', 'res_name', 'sort'],
      order: [
        ['sort', 'ASC']
      ]
    })
    let list = []
    // 需注意 sequezile 查出来的数据不能对其刷数据进行添加或者删除 需要的数据只能自己组装了
    _data.map((it) => {
      list.push({
        res_id: it.res_id,
        res_name: it.res_name,
        parent_id: it.parent_id
      })
    })
    return list
  }
  // 获取所有菜单树
  async getTreeMenu() {
    let _data = await SysResourceModel.findAll({
      attributes: ['res_id', 'parent_id', 'res_name'],
      order: [
        ['sort', 'ASC']
      ],
    })
    let list = []
    // 需注意 sequezile 查出来的数据不能对其刷数据进行添加或者删除 需要的数据只能自己组装了
    _data.map((it) => {
      list.push({
        res_id: it.res_id,
        res_name: it.res_name,
        parent_id: it.parent_id
      })
    })
    return list
  }
  // 当前用户的菜单
  async getUserMenu(userId) {
    // 查询角色
    let role = await SysUserModel.findOne({
      attributes: [],
      where: {
        user_id: userId
      },
      include: [{
        model: SysRoleModel,
        attributes: ['role_id'],
        through: {
          attributes: []
        }, // 排除中间表
      }]
    })
    let roleList = []
    role.toJSON().sys_roles.map((it) => roleList.push(it.role_id))
    // 查询权限
    let menu = await SysRoleModel.findAll({
      attributes: [],
      // distinct:true,
      where: {
        role_id: roleList
      },
      include: [{
        model: SysResourceModel,
        // attributes: [],
        where: {
          type: {
            [Op.lt]: 3
          },
        },
        through: {
          attributes: []
        }, // 排除中间表
        required: false,
      }],
      group: 'sys_resources.res_id', //  
      order: [
        [{
          model: SysResourceModel
        }, 'sort', 'ASC'] //  嵌套关联模型的 sys_resources sort联对象排序  
      ],
      plain: true
    })
    return menu.toJSON().sys_resources
  }
  // 获取用户权限标识
  async getUserPer(userId) {
    // 查询角色
    let role = await SysUserModel.findOne({
      attributes: [],
      where: {
        user_id: userId
      },
      include: [{
        model: SysRoleModel,
        attributes: ['role_id'],
        through: {
          attributes: []
        }, // 排除中间表
      }]
    })
    let roleList = []
    role.toJSON().sys_roles.map((it) => roleList.push(it.role_id))
    // 查询权限
    let perms = await SysRoleModel.findAll({
      attributes: [],
      where: {
        role_id: roleList
      },
      include: [{
        model: SysResourceModel,
        attributes: ['perms'],
        where: {
          perms: {
            [Op.ne]: null, // 不为null 
            [Op.ne]: '' // 不为空
          }
        },
        through: {
          attributes: []
        }, // 排除中间表
        required: false,
      }],
      group: 'perms',
      plain: true
    })
    return perms.toJSON().sys_resources
  }
  // 添加菜单
  async createMenu(data) {
    let row = await SysResourceModel.create({
      parent_id: data.parent_id,
      res_name: data.res_name,
      res_code: data.res_code,
      component: data.component,
      description: data.description,
      res_icon: data.res_icon,
      sort: data.sort,
      perms: data.perms,
      state: data.state,
      type: data.type
    })
    return row
  }
  // 更新菜单
  async updatedMenu(data) {
    let row = await SysResourceModel.update({
      parent_id: data.parent_id,
      res_name: data.res_name,
      res_code: data.res_code,
      component: data.component,
      description: data.description,
      res_icon: data.res_icon,
      sort: data.sort,
      perms: data.perms,
      state: data.state,
      type: data.type,
    }, {
      where: {
        res_id: data.res_id
      }
    })
    return row
  }
  // 删除菜单
  async deleteMenu(resId) {
    let row = await SysResourceModel.destroy({
      where: {
        [Op.or]: [{
            parent_id: resId
          },
          {
            res_id: resId
          },
        ]
      }
    })
    return row
  }
}
module.exports = new SysMenuServer()