/**
 * @api {post} /api/single/uploadImage/ 上传图片
 * @apiDescription 上传单张图片
 * @apiName upload
 * @apiGroup upload
 * @apiHeader token= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJjcmVhdG 
 * @apiParam {string} images 图片key
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *  "data": {
 *      "path"": "url"
 *   },
 *  "msg": "成功",
 *  "code": 200
 * }
 * @apiSampleRequest http://localhost:10086/api/single/uploadImage/
 * @apiVersion 1.0.0
 */