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