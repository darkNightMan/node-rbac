const { login } = require('../controller/user.js')
const { SuccessModel, ErrorModel }= require('../model/resModle')
const { JWT_COMF } = require('../conf/db')
const redisFn = require('../db/redis')
const jwt = require('jsonwebtoken')
const colors = require('colors')
const secret = 'wangxiping'
module.exports = function (app) {
  //------------------------------------------接口--------------------------------------------------------  
  app.post('/api/login', (req, res) => {
    let phone = req.body.phone
    let password = req.body.password
    login(phone, password).then(_data => {
      if (_data.phone !== phone) {
        res.json(new ErrorModel('账号错误!'))
      }
      if (_data.password !== password) {
        res.json(new ErrorModel('密码错误!'))
      }
      let payload = {
        id: _data.user_id,
        nickName: _data.nick_name,
        admin: true
       }
      let token = jwt.sign(payload, JWT_COMF.JWTKEY) //3分钟过期// 签发
      console.log(token, 'login')
      redisFn.set(token, _data.user_id, JWT_COMF.JWTEXP) //  同步到redis

      res.json(new SuccessModel({token : token, userid: _data.user_id}, '登入成功'))
    })
  })
  app.get('/api/test/', (req, res) => {
    res.json(new SuccessModel('test'))
  })
  // -------------------------------------页面--------------------------------------------------
  // 首页
  // app.get('/', (req, res) => {
  //   const vapidKeys = webpush.generateVAPIDKeys();    
  //   const privateKey = vapidKeys.privateKey  // 秘钥
  //   const publicKey = vapidKeys.publicKey  // 公钥
  //   // 更新公钥和秘钥
  //   updatekeys(privateKey, publicKey).then(() => {
  //     res.render('index',{ publicKey: vapidKeys.publicKey});
  //   })
  // })
  // // 客户端生成公钥和私钥
  //  app.get('/getKey', (req, res) => {
  //   res.render('getKey');
  // })
  //  // 订阅列表
  //  app.get('/listSub', (req, res) => {
  //   res.render('listsub');
  // })
  // // 发布消息
  // app.get('/listPub', (req, res) => {
  //   res.render('listpub');
  // })
}