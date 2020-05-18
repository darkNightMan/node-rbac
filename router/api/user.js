/**
 * @api {post} /api/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} phone 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "data": {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdGVfdGltZSI6IjIwMjAtMDUtMTEgMjI6MDQ6MjIiLCJ1c2VyX2lkIjo0NCwibmlja19uYW1lIjoi546L5biM5bmzIiwicGFzc3dvcmQiOiIxZDdmMzNmODIxNmVjYTEyIiwiZW1haWwiOiIzOTU2MDQxOTJAcXEuY29tIiwicGhvbmUiOiIxMTAiLCJzdGF0ZSI6MSwiYXZhdGFyIjoicHVibGljL3VwbG9hZHMvY3NkZV8xNTg5MTgzMjM4MDAwLmpwZWciLCJ1cGRhdGVfaWQiOjQ0fSwiYWRtaW4iOnRydWUsImlhdCI6MTU4OTc5OTIzNX0.lJdD_C_pbpcZk-oTveyuiOOwAropwuJiXZusWbmN2S8"
 *   },
 *  "msg": "成功",
 *  "code": 200
 * }
 * @apiSampleRequest http://localhost:10086/api/login
 * @apiVersion 1.0.0
 */

 /**
 * @api {get} /api/loginOut 退出登入
 * @apiDescription 退出登入
 * @apiName loginOut
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "data": null
 *  "msg": "成功",
 *  "code": 200
 * }
 * @apiSampleRequest http://localhost:10086/api/loginOut
 * @apiVersion 1.0.0
 */

/**
 * @api {post} /api/getUserMenuList 获取用户信息
 * @apiDescription 获取用户信息和菜单
 * @apiName getUserMenuList
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 * {
    "data": {
        "menuList": [
            {
                "res_id": 2,
                "parent_id": 0,
                "res_name": "系统管理",
                "res_icon": "el-icon-setting",
                "state": 1,
                "res_code": "xt",
                "type": 1,
                "component": "/",
                "description": "目录",
                "sort": 1,
                "perms": "",
                "create_time": "2020-03-19T10:05:20.000Z",
                "children": [
                    {
                        "res_id": 9,
                        "parent_id": 2,
                        "res_name": "资源管理",
                        "res_icon": "fa fa-reorder",
                        "state": 1,
                        "res_code": "",
                        "type": 2,
                        "component": "menuList",
                        "description": "null",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-03-20T05:57:01.000Z"
                    },
                    {
                        "res_id": 10,
                        "parent_id": 2,
                        "res_name": "角色管理",
                        "res_icon": "fa fa-user",
                        "state": 1,
                        "res_code": "xt",
                        "type": 2,
                        "component": "roleList",
                        "description": "null",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-03-25T06:02:28.000Z"
                    },
                    {
                        "res_id": 7,
                        "parent_id": 2,
                        "res_name": "用户管理",
                        "res_icon": "el-icon-user-solid",
                        "state": 1,
                        "res_code": "",
                        "type": 2,
                        "component": "userList",
                        "description": "null",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-03-11T07:33:43.000Z"
                    }
                ]
            },
            {
                "res_id": 4,
                "parent_id": 0,
                "res_name": "日志管理",
                "res_icon": "el-icon-user ",
                "state": 1,
                "res_code": "rz",
                "type": 1,
                "component": "/",
                "description": "目录",
                "sort": 2,
                "perms": "",
                "create_time": "2020-03-16T07:46:18.000Z",
                "children": [
                    {
                        "res_id": 38,
                        "parent_id": 4,
                        "res_name": "请求日志",
                        "res_icon": "fa fa-send-o",
                        "state": 1,
                        "res_code": "action",
                        "type": 2,
                        "component": "operationLogs",
                        "description": "",
                        "sort": 0,
                        "perms": null,
                        "create_time": "2020-04-17T10:02:20.000Z"
                    },
                    {
                        "res_id": 8,
                        "parent_id": 4,
                        "res_name": "登录日志",
                        "res_icon": "el-icon-tickets",
                        "state": 1,
                        "res_code": "Logs",
                        "type": 2,
                        "component": "loginLogs",
                        "description": "登录记录",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-03-03T07:46:06.000Z"
                    }
                ]
            },
            {
                "res_id": 1,
                "parent_id": 0,
                "res_name": "博客管理",
                "res_icon": "el-icon-document",
                "state": 1,
                "res_code": "wz",
                "type": 1,
                "component": "/",
                "description": "目录",
                "sort": 3,
                "perms": "",
                "create_time": "2020-03-10T09:51:37.000Z",
                "children": [
                    {
                        "res_id": 5,
                        "parent_id": 1,
                        "res_name": "文章列表",
                        "res_icon": "fa fa-file-o",
                        "state": 1,
                        "res_code": null,
                        "type": 2,
                        "component": "blogArticleList",
                        "description": null,
                        "sort": 0,
                        "perms": null,
                        "create_time": "2020-03-17T07:46:21.000Z"
                    },
                    {
                        "res_id": 99,
                        "parent_id": 1,
                        "res_name": "文章标签",
                        "res_icon": "fa fa-tag",
                        "state": 1,
                        "res_code": "",
                        "type": 2,
                        "component": "blogTagsList",
                        "description": "标签",
                        "sort": 1,
                        "perms": "",
                        "create_time": "2020-05-12T07:33:07.000Z"
                    },
                    {
                        "res_id": 40,
                        "parent_id": 1,
                        "res_name": "文章分类",
                        "res_icon": "fa fa-file-o",
                        "state": 1,
                        "res_code": "hazw",
                        "type": 2,
                        "component": "blogClassList",
                        "description": "",
                        "sort": 1,
                        "perms": null,
                        "create_time": "2020-04-18T08:24:58.000Z"
                    }
                ]
            },
            {
                "res_id": 101,
                "parent_id": 0,
                "res_name": "网站功能",
                "res_icon": "el-icon-coin",
                "state": 1,
                "res_code": "",
                "type": 1,
                "component": "",
                "description": "",
                "sort": 4,
                "perms": "",
                "create_time": "2020-05-13T11:04:04.000Z",
                "children": [
                    {
                        "res_id": 102,
                        "parent_id": 101,
                        "res_name": "友情链接",
                        "res_icon": "fa fa-chain",
                        "state": 1,
                        "res_code": "",
                        "type": 2,
                        "component": "",
                        "description": "",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-05-13T11:04:46.000Z"
                    },
                    {
                        "res_id": 103,
                        "parent_id": 101,
                        "res_name": "留言管理",
                        "res_icon": "",
                        "state": 1,
                        "res_code": "",
                        "type": 2,
                        "component": "",
                        "description": "",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-05-13T11:09:14.000Z"
                    },
                    {
                        "res_id": 104,
                        "parent_id": 101,
                        "res_name": "广告管理",
                        "res_icon": "",
                        "state": 1,
                        "res_code": "",
                        "type": 2,
                        "component": "",
                        "description": "",
                        "sort": 0,
                        "perms": "",
                        "create_time": "2020-05-13T11:09:39.000Z"
                    }
                ]
            },
            {
                "res_id": 35,
                "parent_id": 0,
                "res_name": "测试菜单",
                "res_icon": "el-icon-eleme",
                "state": 1,
                "res_code": "cs",
                "type": 1,
                "component": "/",
                "description": "目录",
                "sort": 4,
                "perms": "",
                "create_time": "2020-04-15T13:25:56.000Z",
                "children": [
                    {
                        "res_id": 41,
                        "parent_id": 35,
                        "res_name": "测试列表",
                        "res_icon": "el-icon-loading",
                        "state": 1,
                        "res_code": "test",
                        "type": 2,
                        "component": "test",
                        "description": "",
                        "sort": 111,
                        "perms": "",
                        "create_time": "2020-04-19T14:14:19.000Z"
                    }
                ]
            }
        ],
        "userInfo": {
            "user_id": 44,
            "nick_name": "王希平",
            "phone": "110",
            "email": "395604192@qq.com",
            "avatar": "public/uploads/csde_1589183238000.jpeg",
            "role_id": [
                1
            ]
        },
        "perms": [
            "sys:logs:create",
            "sys:logs:list",
            "sys:logs:update",
            "sys:menu:create",
            "sys:menu:delete",
            "sys:menu:list",
            "sys:menu:update",
            "sys:role:create",
            "sys:role:delete",
            "sys:role:editPerms",
            "sys:role:list",
            "sys:role:lookPerms",
            "sys:role:update",
            "sys:user:create",
            "sys:user:delete",
            "sys:user:list",
            "sys:user:update"
        ]
    },
    "msg": "成功",
    "code": 200
}
 * @apiParam {string} token 令牌
 * @apiSampleRequest http://localhost:10086/api/getUserMenuList 
 * @apiVersion 1.0.0
 */

 /**
 * @api {post} /api/getCaptcha 获取验证码
 * @apiDescription 验证码
 * @apiName getCaptcha
 * @apiGroup User
 * @apiSuccess {json} result
 * @apiSampleRequest http://localhost:10086/api/getCaptcha
 * @apiVersion 1.0.0
 */