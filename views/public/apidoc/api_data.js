define({ "api": [
  {
    "type": "post",
    "url": "/api/getCaptcha",
    "title": "获取验证码",
    "description": "<p>验证码</p>",
    "name": "getCaptcha",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/getCaptcha"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/getUserMenuList",
    "title": "获取用户信息",
    "description": "<p>获取用户信息和菜单</p>",
    "name": "getUserMenuList",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"data\": {\n        \"menuList\": [\n            {\n                \"res_id\": 2,\n                \"parent_id\": 0,\n                \"res_name\": \"系统管理\",\n                \"res_icon\": \"el-icon-setting\",\n                \"state\": 1,\n                \"res_code\": \"xt\",\n                \"type\": 1,\n                \"component\": \"/\",\n                \"description\": \"目录\",\n                \"sort\": 1,\n                \"perms\": \"\",\n                \"create_time\": \"2020-03-19T10:05:20.000Z\",\n                \"children\": [\n                    {\n                        \"res_id\": 9,\n                        \"parent_id\": 2,\n                        \"res_name\": \"资源管理\",\n                        \"res_icon\": \"fa fa-reorder\",\n                        \"state\": 1,\n                        \"res_code\": \"\",\n                        \"type\": 2,\n                        \"component\": \"menuList\",\n                        \"description\": \"null\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-03-20T05:57:01.000Z\"\n                    },\n                    {\n                        \"res_id\": 10,\n                        \"parent_id\": 2,\n                        \"res_name\": \"角色管理\",\n                        \"res_icon\": \"fa fa-user\",\n                        \"state\": 1,\n                        \"res_code\": \"xt\",\n                        \"type\": 2,\n                        \"component\": \"roleList\",\n                        \"description\": \"null\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-03-25T06:02:28.000Z\"\n                    },\n                    {\n                        \"res_id\": 7,\n                        \"parent_id\": 2,\n                        \"res_name\": \"用户管理\",\n                        \"res_icon\": \"el-icon-user-solid\",\n                        \"state\": 1,\n                        \"res_code\": \"\",\n                        \"type\": 2,\n                        \"component\": \"userList\",\n                        \"description\": \"null\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-03-11T07:33:43.000Z\"\n                    }\n                ]\n            },\n            {\n                \"res_id\": 4,\n                \"parent_id\": 0,\n                \"res_name\": \"日志管理\",\n                \"res_icon\": \"el-icon-user \",\n                \"state\": 1,\n                \"res_code\": \"rz\",\n                \"type\": 1,\n                \"component\": \"/\",\n                \"description\": \"目录\",\n                \"sort\": 2,\n                \"perms\": \"\",\n                \"create_time\": \"2020-03-16T07:46:18.000Z\",\n                \"children\": [\n                    {\n                        \"res_id\": 38,\n                        \"parent_id\": 4,\n                        \"res_name\": \"请求日志\",\n                        \"res_icon\": \"fa fa-send-o\",\n                        \"state\": 1,\n                        \"res_code\": \"action\",\n                        \"type\": 2,\n                        \"component\": \"operationLogs\",\n                        \"description\": \"\",\n                        \"sort\": 0,\n                        \"perms\": null,\n                        \"create_time\": \"2020-04-17T10:02:20.000Z\"\n                    },\n                    {\n                        \"res_id\": 8,\n                        \"parent_id\": 4,\n                        \"res_name\": \"登录日志\",\n                        \"res_icon\": \"el-icon-tickets\",\n                        \"state\": 1,\n                        \"res_code\": \"Logs\",\n                        \"type\": 2,\n                        \"component\": \"loginLogs\",\n                        \"description\": \"登录记录\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-03-03T07:46:06.000Z\"\n                    }\n                ]\n            },\n            {\n                \"res_id\": 1,\n                \"parent_id\": 0,\n                \"res_name\": \"博客管理\",\n                \"res_icon\": \"el-icon-document\",\n                \"state\": 1,\n                \"res_code\": \"wz\",\n                \"type\": 1,\n                \"component\": \"/\",\n                \"description\": \"目录\",\n                \"sort\": 3,\n                \"perms\": \"\",\n                \"create_time\": \"2020-03-10T09:51:37.000Z\",\n                \"children\": [\n                    {\n                        \"res_id\": 5,\n                        \"parent_id\": 1,\n                        \"res_name\": \"文章列表\",\n                        \"res_icon\": \"fa fa-file-o\",\n                        \"state\": 1,\n                        \"res_code\": null,\n                        \"type\": 2,\n                        \"component\": \"blogArticleList\",\n                        \"description\": null,\n                        \"sort\": 0,\n                        \"perms\": null,\n                        \"create_time\": \"2020-03-17T07:46:21.000Z\"\n                    },\n                    {\n                        \"res_id\": 99,\n                        \"parent_id\": 1,\n                        \"res_name\": \"文章标签\",\n                        \"res_icon\": \"fa fa-tag\",\n                        \"state\": 1,\n                        \"res_code\": \"\",\n                        \"type\": 2,\n                        \"component\": \"blogTagsList\",\n                        \"description\": \"标签\",\n                        \"sort\": 1,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-05-12T07:33:07.000Z\"\n                    },\n                    {\n                        \"res_id\": 40,\n                        \"parent_id\": 1,\n                        \"res_name\": \"文章分类\",\n                        \"res_icon\": \"fa fa-file-o\",\n                        \"state\": 1,\n                        \"res_code\": \"hazw\",\n                        \"type\": 2,\n                        \"component\": \"blogClassList\",\n                        \"description\": \"\",\n                        \"sort\": 1,\n                        \"perms\": null,\n                        \"create_time\": \"2020-04-18T08:24:58.000Z\"\n                    }\n                ]\n            },\n            {\n                \"res_id\": 101,\n                \"parent_id\": 0,\n                \"res_name\": \"网站功能\",\n                \"res_icon\": \"el-icon-coin\",\n                \"state\": 1,\n                \"res_code\": \"\",\n                \"type\": 1,\n                \"component\": \"\",\n                \"description\": \"\",\n                \"sort\": 4,\n                \"perms\": \"\",\n                \"create_time\": \"2020-05-13T11:04:04.000Z\",\n                \"children\": [\n                    {\n                        \"res_id\": 102,\n                        \"parent_id\": 101,\n                        \"res_name\": \"友情链接\",\n                        \"res_icon\": \"fa fa-chain\",\n                        \"state\": 1,\n                        \"res_code\": \"\",\n                        \"type\": 2,\n                        \"component\": \"\",\n                        \"description\": \"\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-05-13T11:04:46.000Z\"\n                    },\n                    {\n                        \"res_id\": 103,\n                        \"parent_id\": 101,\n                        \"res_name\": \"留言管理\",\n                        \"res_icon\": \"\",\n                        \"state\": 1,\n                        \"res_code\": \"\",\n                        \"type\": 2,\n                        \"component\": \"\",\n                        \"description\": \"\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-05-13T11:09:14.000Z\"\n                    },\n                    {\n                        \"res_id\": 104,\n                        \"parent_id\": 101,\n                        \"res_name\": \"广告管理\",\n                        \"res_icon\": \"\",\n                        \"state\": 1,\n                        \"res_code\": \"\",\n                        \"type\": 2,\n                        \"component\": \"\",\n                        \"description\": \"\",\n                        \"sort\": 0,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-05-13T11:09:39.000Z\"\n                    }\n                ]\n            },\n            {\n                \"res_id\": 35,\n                \"parent_id\": 0,\n                \"res_name\": \"测试菜单\",\n                \"res_icon\": \"el-icon-eleme\",\n                \"state\": 1,\n                \"res_code\": \"cs\",\n                \"type\": 1,\n                \"component\": \"/\",\n                \"description\": \"目录\",\n                \"sort\": 4,\n                \"perms\": \"\",\n                \"create_time\": \"2020-04-15T13:25:56.000Z\",\n                \"children\": [\n                    {\n                        \"res_id\": 41,\n                        \"parent_id\": 35,\n                        \"res_name\": \"测试列表\",\n                        \"res_icon\": \"el-icon-loading\",\n                        \"state\": 1,\n                        \"res_code\": \"test\",\n                        \"type\": 2,\n                        \"component\": \"test\",\n                        \"description\": \"\",\n                        \"sort\": 111,\n                        \"perms\": \"\",\n                        \"create_time\": \"2020-04-19T14:14:19.000Z\"\n                    }\n                ]\n            }\n        ],\n        \"userInfo\": {\n            \"user_id\": 44,\n            \"nick_name\": \"王希平\",\n            \"phone\": \"110\",\n            \"email\": \"395604192@qq.com\",\n            \"avatar\": \"public/uploads/csde_1589183238000.jpeg\",\n            \"role_id\": [\n                1\n            ]\n        },\n        \"perms\": [\n            \"sys:logs:create\",\n            \"sys:logs:list\",\n            \"sys:logs:update\",\n            \"sys:menu:create\",\n            \"sys:menu:delete\",\n            \"sys:menu:list\",\n            \"sys:menu:update\",\n            \"sys:role:create\",\n            \"sys:role:delete\",\n            \"sys:role:editPerms\",\n            \"sys:role:list\",\n            \"sys:role:lookPerms\",\n            \"sys:role:update\",\n            \"sys:user:create\",\n            \"sys:user:delete\",\n            \"sys:user:list\",\n            \"sys:user:update\"\n        ]\n    },\n    \"msg\": \"成功\",\n    \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>令牌</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/getUserMenuList"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "用户登录",
    "description": "<p>用户登录</p>",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n \"data\": {\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdGVfdGltZSI6IjIwMjAtMDUtMTEgMjI6MDQ6MjIiLCJ1c2VyX2lkIjo0NCwibmlja19uYW1lIjoi546L5biM5bmzIiwicGFzc3dvcmQiOiIxZDdmMzNmODIxNmVjYTEyIiwiZW1haWwiOiIzOTU2MDQxOTJAcXEuY29tIiwicGhvbmUiOiIxMTAiLCJzdGF0ZSI6MSwiYXZhdGFyIjoicHVibGljL3VwbG9hZHMvY3NkZV8xNTg5MTgzMjM4MDAwLmpwZWciLCJ1cGRhdGVfaWQiOjQ0fSwiYWRtaW4iOnRydWUsImlhdCI6MTU4OTc5OTIzNX0.lJdD_C_pbpcZk-oTveyuiOOwAropwuJiXZusWbmN2S8\"\n  },\n \"msg\": \"成功\",\n \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/login"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/loginOut",
    "title": "退出登入",
    "description": "<p>退出登入</p>",
    "name": "loginOut",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n \"data\": null\n \"msg\": \"成功\",\n \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/loginOut"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/user/createUser",
    "title": "新增用户",
    "description": "<p>用户新增的接口</p>",
    "name": "create_a_user",
    "group": "sysUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>令牌</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick_name",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>账号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/user/createUser"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/sysUser.js",
    "groupTitle": "sysUser"
  },
  {
    "type": "DELETE",
    "url": "/api/user/deleteUser",
    "title": "删除用户",
    "description": "<p>用户删除的接口</p>",
    "name": "delete_a_user",
    "group": "sysUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>令牌</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/user/deleteUser"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/sysUser.js",
    "groupTitle": "sysUser"
  },
  {
    "type": "GET",
    "url": "/api/user/list",
    "title": "用户列表",
    "description": "<p>查看用户列表的接口</p>",
    "name": "get_userList",
    "group": "sysUser",
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/user/list"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>令牌</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "router/api/sysUser.js",
    "groupTitle": "sysUser"
  },
  {
    "type": "PUT",
    "url": "/api/user/updateUser",
    "title": "更新用户",
    "description": "<p>更新用户信息的接口</p>",
    "name": "update_a_user",
    "group": "sysUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>令牌</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "nick_name",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>账号</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:10086/api/user/updateUser"
      }
    ],
    "version": "1.0.0",
    "filename": "router/api/sysUser.js",
    "groupTitle": "sysUser"
  }
] });
