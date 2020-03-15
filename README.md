


## PWA web Push 消息推送



##### web push 可以用来做什么？
就是用户订阅了一个站点的 Web Push 服务后 可以做一些跨平台的消息推送，即使用户关闭了浏览器，一旦站点主动发送推送消息，用户都能收到，只要你的电脑是开着的。


**PS:在使用webpush的时候 由于受GCM服务的问题，所以在国内使用webpush 基本上无法订阅到推送消息，用户必须翻墙才能发送订阅。**

###### [链接 什么是GCM？](https://firebase.google.com/docs/cloud-messaging) 
----

#### webpush 推送图解：

![image](https://note.youdao.com/yws/res/1407/EE42977C3CE04DDEB8D174857F187F1F)

![image](https://note.youdao.com/yws/res/1409/F1EB138231F84D2A9C1AD127DD094BFB)


```
---
大致意思就是 先询问用户是否允许发送消息通知用户同意后又客户端发起订阅
不同的浏览器返回不同PushSubscription对象叫做endpoint每个发起订阅的
浏览器生成一个唯一的URL，然后将PushSubscription信息存储在自己的数据库中
最后在发送消息的时候会刚获取到PushSubscription推送给GCM服务端 然后推送给指定客户端浏览器。
---
```
### Push的安全性

```
在Web Push中服务端会有一对公钥与私钥。客户端持有公钥用来订阅，
而服务端持有私钥。客户端在订阅时，会将公钥发送给 Push Service
之后会在代码中演示
```

#### 实现此功能的的主要2个 API

- Notifications  (**客户端弹框提示**)

```
语法：
let myNotification = new Notification(title, options);
```
options 可选 options对象包含应用于通知的任何自定义设置选项

```
dir: 显示通知的方向。默认是auto，跟随浏览器语言设置行为，你也可以通过设置ltr和rtl的值来覆盖该行为（虽然大多数浏览器似乎忽略这些设置）
lang: 通知的语言，如使用代表一个BCP 47语言标签的  DOMString 指定的。请参阅Sitepoint ISO 2字母语言代码页面，以获得简单的参考。
badge: 一个 USVString 包含用于表示通知的图像的URL, 当没有足够的空间来显示通知本身时。
body: 一个 DOMString 表示通知的正文，将显示在标题下方。
tag:  一个 DOMString 代表通知的 一个识别标签。
icon:  一个 USVString 包含要在通知中显示的图标的URL。
image: 一个 USVSTring包含要在通知中显示的图像的URL。
data: 您想要与通知相关联的任意数据。这可以是任何数据类型。
vibrate: 一个振动模式 vibration pattern 设备的振动硬件在通知触发时发出。
renotify: 一个 Boolean 指定在新通知替换旧通知后是否应通知用户。默认值为false，这意味着它们不会被通知。
requireInteraction: 表示通知应保持有效，直到用户点击或关闭它，而不是自动关闭。默认值为false。
```


##### https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification

---
- Push  (**监听服务端推送事件**)
    - PushManager // 接口用于操作推送订阅第三方服务器接收通知以及推送通知的请求URL的方法
    - PushEvent   // ...
    - PushMessageData // ...
    - PushSubscription // ...
    - PushSubscriptionOptions // ...

 ##### https://developer.mozilla.org/en-US/docs/Web/API/Push_API 具体用法可以参考 MDN

    

subscribe() 
用于订阅推送服务。返回一个 Promise 形式的 PushSubscription 对象，
该对象包含了推送订阅详情。如果当前serviceworker没有已存在的订阅，
则会创建一个新的推送订阅。

```
语法：
PushManager.subscribe(options).then(function(pushSubscription) { ... } );

```


options 参数设置

userVisibleOnly：布尔值，表示返回的推送订阅将只能被用于对用户可见的消息。在订阅时必须把此项设置为 true，这样当有消息推送给用户时，浏览器会展示一个消息通知，也就是说不存在静默推送。为了让用户可知

applicationServerKey：推送服务器用来向客户端应用发送消息的公钥。该值是应用程序服务器生成的签名密钥对的一部分，可使用在 P-256 曲线上实现的椭圆曲线数字签名（ECDSA）。这里使用的是 VAPID 协议，VAPID 是 Voluntary Application Server Identification （自主应用服务器标识） 的简称。所以需要将 Base64 的公钥转为 Uint8 的数组

---

#### 接下来以实际项目案例来做一个前后端完整的webpush 消息推送开发流程实现细节

项目结构：

```
.
├── README.md
├── app.js      // 程序入口
├── conf        // 数据配置
│   └── db.js   
├── controller  // 控制器
│   └── saveSub.js  
├── db
│   └── mysql.js   //  mysql 连接池
├── package-lock.json
├── package.json 
├── router    //  路由
│   └── index.js
└── views    // 前端页面
    ├── getKey.html
    ├── index.html
    ├── listpub.html
    ├── listsub.html
    ├── public
    │   └── push.js  // 推送逻辑
    └── sw.js        //  serverce worker 
```
---
首先去firebase 上注册一个开发账号 https://console.firebase.google.com/
到时候发送推送消息的时候需要一个APP key
![image](https://note.youdao.com/yws/res/1501/CEBFA77FCF254686B6A4E08A99CEE90B)


##### 创建成功以后打开项目设置选项
![image](https://note.youdao.com/yws/res/1506/FA8673F2C02645D88D9391FE43B98677)
##### 点击tabs云消息传递 红色的就是你的app Key 到时候会用到
![image](https://note.youdao.com/yws/res/1515/14D946287F19462D87E1555A3ECADCE0)


### 前端部分

---
 一个是订阅 

![image](http://note.youdao.com/yws/res/1619/713ADACE26A74B97A20E4DAF131C267D)
---
一个是发布
![image](http://note.youdao.com/yws/res/1621/FA10AD6B67674CEC9AE8D1DC3FB60E86)

---
首先注册sw 
![image](http://note.youdao.com/yws/res/1626/42BE764C6AF64C75915895B7C1382F07)

检查当前检测当前运行环境时候支持 serversworker 和 PushMannage
PushMannage是检测当前浏览器是否支持第三方服务器接收消息通知的能力。
注册成功以后询问客户消息通知权限
---
- 初始化对话框
![image](http://note.youdao.com/yws/res/1639/9C97EF2FEE8B4CCAAABB9C26FDF46F0B)



```
Notification.requestPermission().then(function(result) { ... });
```
![image](http://note.youdao.com/yws/res/1675/B25F527A71F741BF9ED4BDE94E0D4604)
- 此方法请求用户当前来源的权限以显示通知 返回的result
    - denied：用户拒绝了通知的显示
    - granted：用户允许了通知的显示
    - default：因为不知道用户的选择，所以浏览器的行为与denied时相同

![image](http://note.youdao.com/yws/res/1662/3A05EA000B4B445D95685EE6040C04C5)


- 授权成功以后调用pushManager.getSubscription() 用于获取已经存在的push订阅。返回一个Promise，这个Promise包装着push订阅信息的PushSubscription对象。如果没有已经存在的订阅，则返回null
```
pushManager.getSubscription()
```

- 当用户点击允许后才能订阅消息推送
![image](http://note.youdao.com/yws/res/1619/713ADACE26A74B97A20E4DAF131C267D)

- 点击同意发起订阅
![image](http://note.youdao.com/yws/res/1671/6923356936594FBCB7B98031EBE0E693)

- 这里的this.registration是前面注册 sw 已经挂载到vue对象下所以直接调用this
```
pushManager.subscribe()
```
这个方法中的两个配置参数：userVisibleOnly 和applicationServerKey。
- userVisibleOnly表明该推送是否需要显性地展示给用户，即推送时是否会有消息提醒。如果没有消息提醒就表明是进行“静默”推送。在Chrome中，必须要将其设置为true，否则浏览器就会在控制台报错
![image](http://note.youdao.com/yws/res/1703/78EAD692D10747A1A1906C2FE96BC550)
- applicationServerKey该参数需要Unit8Array类型。因此定义了一个urlBase64ToUint8Array方法将base64的公钥字符串转为Unit8Array这个方法一般都是固定的写法
- ![image](http://note.youdao.com/yws/res/1712/88B4E7538BD7498AB3C78FB9F077CCF5)

- 向push服务器（即第三方push server）发起订阅。返回一个Promise，这个Promise包装着push订阅信息的PushSubscription对象。如果当前的service worke没有已经存在的订阅，则会创建一个新的push订阅。

- 这里的applicationServerKey  是服务端生成的公钥一般在页面初始化的时候会获取到可以通过后端web-push库来生成稍后会介绍

- 还有一点当调用pushManager.subscribe()这个方法的时候一定要确保当前自己的网络是否已经翻墙否则无法订阅推送
- 对于消息推送如何在浏览器上调试查看
Chrome 环境下，地址栏输入chrome://gcm-internals/
---
- 未翻墙的情况 details 是没有响应的
![image](http://note.youdao.com/yws/res/1723/66258AFA07C74FF7944D7C10EB726590)

- 翻墙以后
![image](http://note.youdao.com/yws/res/1728/41D260E27E714DBFA9D92905C50336B6)

- 所以这也是为何在国内webpush 使用的比较少的原因之一
---

当订阅成功以后promise在then中我们可以得到订阅的相关信息——一个PushSubscription对象 
![image](http://note.youdao.com/yws/res/1739/6B8C06E8FCA14413BA6DE46ECB59F27C)

- 拿到这个endpoint 之后将发送到服务端进行存储接下来后然后拿到这个订阅信息推送到不同的用户浏览器
- ![image](http://note.youdao.com/yws/res/1782/7008FB97325040F2873D216CE360C2F2)

在sw中 监听服务端的push事件

![image](http://note.youdao.com/yws/res/1756/63C72F78BE1446B4A1D2AB492E9E06BF)

![image](http://note.youdao.com/yws/res/1758/51E5CB067560421D8CEEFAE8D9817AE1)

### 后端部分

后端开发逻辑
首先生成公钥和私钥  使用 web-push
![image](http://note.youdao.com/yws/res/1789/DC4525368DB9410C97B67A2A18E62943)
![image](http://note.youdao.com/yws/res/1761/D28F5C1D769D4CB491E0C509263751A9)

- 当访问首页服务端生成公钥和私钥 公钥放到客户端 私钥放在服务端
这里每次访问的时候去生成同步到数据库当中以保证每次订阅的时候私钥和公钥匹配我将公钥直接输显示出来便于查看
![image](http://note.youdao.com/yws/res/1770/D4C8B27C262845F7A0B3B5583DA78607)
- 因为假定当前只有一个用户 所以在每次刷新页面的时候都会更新 公钥和秘钥

- 前面提到的当用户同意订阅之后保存当前的的Subscription存储在服务端
![image](http://note.youdao.com/yws/res/1775/5E69AC9B15214249A6C3B6A604213EAB)

- 这个是数据库中endpint 到时候推送的时候就是这个来识别用户浏览器的
![image](http://note.youdao.com/yws/res/1801/A2AC37CB26E14E35B6CCCCB76C044F88)


- 最后是推送部分了提交到这个接口

![image](http://note.youdao.com/yws/res/1806/C07AFB5DE47E4EF58AAA9BDA0054B959)

这里直接使用web-push 提供的接口方法发起推送值得注意的是 这里需要你的谷歌api key  就是前面提到 firebase 申请到的GCMApiKey

![image](https://note.youdao.com/yws/res/1515/14D946287F19462D87E1555A3ECADCE0)
```
webpush.setGCMAPIKey('<Your GCM API Key Here>');
```
- 配置完成后使用web-push的sendNotification接口进行推送了
- 
![image](http://note.youdao.com/yws/res/1822/A33F9CFF26C24BE290395D89D681BCC0)

此时就会收到服务端的推送了
![image](http://note.youdao.com/yws/res/1824/5527AF99D63D4016981DB7AFFEA4075D)

- 最后兼容性

![image](http://note.youdao.com/yws/res/1830/DFB19AF86AFC4A6B8F9F9F610395E191)

目前大部分pc浏览器能支持该功能而移动端浏览器普遍还不支持该特性。但是在MacOS上的safari里面是支持该特性的 但是推送方式 苹果有自己的 apple push 但是要实现这个功能必须要去注册成为开发者用户才能使用这个api权限 但是申请苹果的开发个人账号都要98美元 差不多人民币 600-700 快 呵呵！

