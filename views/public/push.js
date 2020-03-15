var vue = new Vue({
  el: '#app',
  data: {
    dialogVisible: false,
    registration: null,
    isSubscribed: false, // 是否订阅
    publicKey: document.getElementById('publicKey').value   // 服务端渲染初始化公钥
  },
  created () {
      this.registered()
  },
  methods: {
    handleClose() {
      // ....
    },
    urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }, 
    // 取消订阅
    unsubscribe () {
      this.registration.pushManager.getSubscription().then(subscription => {
        return subscription.unsubscribe()
      }).then(() => {
        debugger
        this.isSubscribed = false
      }).catch(err => {
        this.isSubscribed = false
      })
    },   
    // 注册serverworker
    registered () {
      if('serviceWorker' in navigator  && 'PushManager' in window) { // 检测当前运行环境时候支持 serversworker 和 PushMannage
        navigator.serviceWorker.register('./sw.js').then(registration => {  // 注册成功获取 registration
          this.registration = registration //  挂载vue对象下 方便全局使用
          // 初始化对话框  
          this.initDialog()

        }).catch(function(error) {
          console.error( error);
        });
      } else {
        //  不支持
        console.log('Push Not Supported')
      }
    },
    // 订阅推送
    subscribePush() {
      const applicationServerKey = this.urlB64ToUint8Array(this.publicKey);
      this.registration.pushManager.subscribe({
        userVisibleOnly: true,  // 必须要将其设置为true，否则浏览器就会在控制台报错：
        applicationServerKey: applicationServerKey  // 客户端的公钥 由服务端生成
      }).then(subscription => {
        console.log(subscription); // endpoint 每个客户端随机生成一个不同的值.
        debugger
        // 讲订阅信息存储在服务端 然后由服务端推送
        this.saveScription(subscription)
        // 当前已经订阅
        this.isSubscribed = true
      }).catch(err => {
        debugger
        console.log('订阅失败', err)
        this.isSubscribed = false
      })
    },
    // 保存订阅信息
    saveScription (subscription) {
      this.dialogVisible = false
      if (subscription) {
          axios.request({
            url: '/api/saveSubscription',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'  
            },
            data: subscription
          }).then(res => {
            console.log(res)
          })
      } else {
          // TODO: 用户拒绝推送 删除调订阅信息
      }
    },  
    // 初始化对话     
    initDialog () {
      let that = this
      // 询问前用户端是否允许消息推送
      Notification.requestPermission().then(function(result) {
        debugger
        if (result === 'denied') { // 拒绝
          that.dialogVisible = false                        
          that.saveScription(null) 
          return;
        }
        if (result === 'default') {  // 默认    
          return;
        }
        // 当前是否已经订阅过
        that.registration.pushManager.getSubscription().then(subscription => {  
          if (subscription) {  // 是否已经有订阅如果有的话就不显示弹窗了
            that.dialogVisible = false   
            that.isSubscribed = true     
          } else {
            that.isSubscribed = false    
            that.dialogVisible = true        
          } 
        })
      });     
    }
  }
})