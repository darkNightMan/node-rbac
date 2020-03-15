

'use strict';
// 监听服务端推送事件
self.addEventListener('push', function(event) {
  debugger
  const title = 'web push';
  // const options = {
  //   body: `${event.data.text()}`,
  //   icon: '',
  //   badge: ''
  // };
  const options = {
    body: `${event.data.text()}`,
    icon: '',
    actions: [{
        action: 'show-book',
        title: '去看看'
    }, {
        action: 'contact-me',
        title: '联系我'
    }],
    tag: 'pwa-starter',
    renotify: true
  }

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

// 监听notification 弹窗的事件
self.addEventListener('notificationclick', function(e) {
  console.log(e)
  console.log(self.fetch)
  console.log(this)
  debugger
  let action = e.action;
  console.log(`action tag: ${e.notification.tag}`, `action: ${action}`);
  
  switch (action) {
      case 'show-book':
          // 监听用户点击事件
          self.fetch('/api/getKeys/').then(res =>{
            console.log(res)
          })
          break;
      case 'contact-me':
          console.log('contact-me');
          break;
      default:
          console.log(`未处理的action: ${e.action}`);
          action = 'default';
          break;
  }
  
  e.notification.close();
  // event.waitUntil(
  //   clients.openWindow('https://www.yoins.com')
  // );  
});