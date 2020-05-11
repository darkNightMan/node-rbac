'use strict'
/*
所有接口的status均为200；
code规则：当code为0时表示接口访问成功并且无抛错；不为零时，code共计五位，
第一位表示错误级别，
1开头的为系统级别错误，
2开头为系统功能模块对应的错误，
*/
module.exports = {
  // 系统级别错误
  NOT_FIND_ROUTE: {
    code: 10000,
    msg: '访问的路由不存在'
  },
  SERVER_ERROR: {
    code: 10001,
    msg: '服务器开小差去了'
  },
  LIST_QUERY_FAILDE: {
    code: 10002,
    msg: '列表查询失败'
  },
  // token认证模块错误
  TOKEN_IS_MISSING: {
    code: 401,
    msg: 'token缺失'
  },
  TOKEN_IS_INVALID: {
    code: 401,
    msg: '登录失效'
  },
  TOKEN_HAS_EXPIRED: {
    code: 403,
    msg: 'token已经过期'
  },
  USER_ID_NULL: {
    code: 20101,
    msg: 'user_id不能为空'
  },
  // 用户管理模块错误
  USER_PERMS_EXITS: {
    code: 20000,
    msg: '您无此权限！请联系管理员'
  },
  USER_HAS_EXITS: {
    code: 20100,
    msg: '该用户已经存在'
  },
  USER_NOT_EXITS: {
    code: 20101,
    msg: '该用户不存在'
  },
  USER_NOT_DISABLE: {
    code: 20102,
    msg: '该用户已经被禁用请联系管理员!'
  },
  USER_PHONE_NULL: {
    code: 21333,
    msg: '账号不能为空'
  },
  USER_CAPTCHA_ERR: {
    code: 21534,
    msg: '验证码错误'
  },
  USER_PASSWORD_NULL: {
    code: 21535,
    msg: '密码不能为空'
  },
  USER_PASSWORD_WRONG: {
    code: 20102,
    msg: '用户密码错误'
  },
  USER_LOGIN_FAILED: {
    code: 20103,
    msg: '用户登录失败'
  },
  USER_ADD_FAILED: {
    code: 20104,
    msg: '用户创建失败'
  },
  USER_DELETE_FAILED: {
   
    code: 20105,
    msg: '用户删除失败'
  },
  USER_UPDATE_FAILED: {
    code: 20106,
    msg: '用户更新失败'
  },
  USER_QUERY_FAILED: {
    code: 20107,
    msg: '用户查询失败'
  },
  USERLIST_FIND_FAILDE: {
    code: 20108,
    msg: '用户列表查询失败'
  },
  MENU_INSERT_FAILED: {
    code: 20108,
    msg: '菜单新增失败'
  },
  MENU_UPDATE_FAILED: {
    code: 20108,
    msg: '菜单更新失败'
  },
  MENU_DELETE_FAILED: {
    code: 20108,
    msg: '菜单删除失败'
  },
  // 路由管理模块错误
  ROUTER_HAS_EXITS: {
    code: 20200,
    msg: '该路由已经存在'
  },
  ROUTER_NOT_EXITS: {
    code: 20201,
    msg: '该路由不存在'
  },
  CATEGORY_HAS_EXITS: {
    code: 20301,
    msg: '该分类已经存在'
  },
  CATEGORY_NOT_EXITS: {
    code: 20302,
    msg: '该分类不存在'
  },
  CATEGORYNAME_IS_EMPTY: {
    code: 20303,
    msg: '文章类别的名字不能为空'
  },
  ARTICLE_HAS_EXITS: {
    code: 20401,
    msg: '该文章已经存在'
  },
  ARTICLE_NOT_EXITS: {
    code: 20402,
    msg: '该文章不存在'
  },
  TITLE_IS_EMPTY: {
    code: 20403,
    msg: '文章标题不能为空'
  },
  CONTENT_IS_EMPTY: {
    code: 20404,
    msg: '文章内容不能为空'
  }
}
// 其中，第二三位表示功能模块编号，第四五位表示具体错误编号。