/**
 * @api {GET} /api/user/list 用户列表
 * @apiDescription 查看用户列表的接口
 * @apiName get userList
 * @apiGroup sysUser
 * @apiHeader token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdG 
 * @apiSampleRequest http://localhost:10086/api/user/list  
 * @apiParam {string} token 令牌
 * @apiSuccess {json} result
 * @apiVersion 1.0.0
*/


/**
 * @api {PUT} /api/user/updateUser 更新用户
 * @apiDescription 更新用户信息的接口
 * @apiName update a user
 * @apiGroup sysUser
 * @apiHeader token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdG 
 * @apiParam {string} nick_name 用户名
 * @apiParam {string} phone 账号
 * @apiParam {string} email 邮箱
 * @apiParam {string} avatar 头像
 * @apiParam {array} role_id 角色id
 * @apiSampleRequest http://localhost:10086/api/user/updateUser 
 * @apiVersion 1.0.0
*/

/**
 * @api {DELETE} /api/user/deleteUser 删除用户
 * @apiDescription 用户删除的接口
 * @apiHeader token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdG 
 * @apiName delete a user
 * @apiGroup sysUser
 * @apiParam {string} user_id 用户id
 * @apiSampleRequest http://localhost:10086/api/user/deleteUser
 * @apiVersion 1.0.0
*/

/**
 * @api {POST} /api/user/createUser 新增用户
 * @apiDescription 用户新增的接口
 * @apiName create a user
 * @apiGroup sysUser
 * @apiHeader token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdG 
 * @apiParam {string} token 令牌 
 * @apiParam {string} nick_name 用户名
 * @apiParam {string} phone 账号
 * @apiParam {string} email 邮箱
 * @apiParam {string} avatar 头像
 * @apiParam {array} role_id 角色id
 * @apiSampleRequest http://localhost:10086/api/user/createUser
 * @apiVersion 1.0.0
*/