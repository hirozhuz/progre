import Cookies from 'js-cookie'
import {TOKEN_KEY, TOKEN_TIME} from '@config'

/**
 * 获取token
 * @returns {*}
 */
export function getToken() {
    return Cookies.get(TOKEN_KEY)
}

/**
 * 设置token
 * @param token
 * @returns {*}
 */
export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token, {expires: TOKEN_TIME})
}

/**
 * 删除token
 * @returns {*}
 */
export function removeToken() {
    global.localStorage.removeItem('userInfo')
    return Cookies.remove(TOKEN_KEY)
}
