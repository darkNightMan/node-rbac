const express = require('express');
const path = require('path');
const routers = require('./router/')
const app = express()
const R = require('./middlewares/r')
const log4js = require('log4js')
const logConfig = require('./conf/log')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');  
require("body-parser-xml")(bodyParser);
var ejs = require('ejs');


// 日志配置
log4js.configure(logConfig)
let logger = log4js.getLogger()
console.log(logger)
global.logger = logger
//  application/json  
app.use(bodyParser.json());
// cookies
app.use(cookieParser());  
//  application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false }))  

// 扩展req
app.use(R.resExtend)

// 这里是静态文件夹，不走路由的
app.use('/public', express.static(path.join(__dirname, '/views/public')));

// 设置server-worker 路径
app.use('/sw.js', express.static(path.join(__dirname, '/views/sw.js')));

// 设置模板引擎
app.set("views", path.join(__dirname, './views'))
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 注册路由
routers(app)

const server = app.listen(10086, (e) => {
  console.log(`http://127.0.0.1:10086`)
})