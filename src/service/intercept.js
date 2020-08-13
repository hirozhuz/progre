/**
 * Created by zhuzheng on 2018/11/14.
 * axios 数据拦截
 */

import axios from 'axios'
import {UNAUTHORIZED_STATUS} from '@config'
import {throwHTTPError} from '@utils/throwHTTPError'
import {getToken, removeToken} from '@utils/auth'


axios.interceptors.request.use(function (config) {
    // 获取token
    const TOKEN = getToken()
    if (TOKEN) {
        config.headers.common['Authorization'] = TOKEN
    }
    global.NProgress && global.NProgress.start() // 进度条开始
    return config
})
// 劫持响应数据
axios.interceptors.response.use(function (response) {
    global.NProgress && global.NProgress.done()
    // 对响应数据做点什么
    return response
}, function (error) {
    global.NProgress && global.NProgress.done()

    // 如果响应状态为未授权 则 提示异常后跳转至 首页
    if (error.response.status === UNAUTHORIZED_STATUS) {
        removeToken()
        if (!global.isBackground) {
            global.location.reload()
        }
    }
    let errMsg = throwHTTPError(error)
    // 对响应错误做点什么
    return Promise.reject(errMsg)
})
