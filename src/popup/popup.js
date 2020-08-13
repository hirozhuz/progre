import '@styles/element-variables.scss'
// import 'nprogress/nprogress.css'
import Vue from 'vue'
import App from './App'
import store from '../store'
// import NProgress from 'nprogress' // progress bar
import '@service/intercept'
import {Input, Form, FormItem, Button, Loading} from 'element-ui'


global.browser = require('webextension-polyfill')
// global.NProgress = NProgress
Vue.prototype.$browser = global.browser
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Loading)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,

    render: h => h(App)
})
