import '@service/intercept'
// import '@/background/getWaitExamineList'
import '@/background/remind'

global.browser = require('webextension-polyfill')
global.isBackground = true

// init()
// console.log(localStorage.getItem('hello'))
// chrome.notifications.create(
//     Math.random() + '',  // id
//
//     {
//
//         type: '',
//
//         iconUrl: 'icons/icon_48.png',
//
//         appIconMaskUrl: 'icons/icon_48.png',
//
//         title: '通知主标题',
//
//         message: '通知副标题',
//
//         contextMessage: '好开心呀，终于会使用谷歌扩展里面的API了！',
//
//         buttons: [{title: '按钮1的标题', iconUrl: 'icons/icon_48.png'}, {title: '按钮2的标题', iconUrl: 'icons/icon_48.png'}],
//
//         items: [{title: '消息1', message: '今天天气真好！'}, {title: '消息2', message: '明天天气估计也不错！'}],
//
//         eventTime: Date.now() + 2000
//
//     },
//
//     (id) => {
//
//         console.log(id);
//
//     }
// );
//
// setTimeout(() => {
//     chrome.notifications.create(
//         Math.random() + '',  // id
//
//         {
//
//             type: 'list',
//
//             iconUrl: 'icons/icon_48.png',
//
//             appIconMaskUrl: 'icons/icon_48.png',
//
//             title: '通知主标题',
//
//             message: '通知副标题',
//
//             contextMessage: '好开心呀，终于会使用谷歌扩展里面的API了！',
//
//             buttons: [{title: '按钮1的标题', iconUrl: 'icons/icon_48.png'}, {title: '按钮2的标题', iconUrl: 'icons/icon_48.png'}],
//
//             items: [{title: '消息1', message: '今天天气真好！'}, {title: '消息2', message: '明天天气估计也不错！'}],
//
//             eventTime: Date.now() + 2000
//
//         },
//
//         (id) => {
//
//             console.log(id);
//
//         }
//     );
// }, 10000)

// alert(`Hello ${store.getters.foo}!`)

