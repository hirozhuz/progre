import axios from 'axios'
import * as config from './config'
import * as API_STATUS from '@config/api_status'
import {SERVICE_ERR} from '@config/error_message'


/**
 * 登录接口
 * @param loginInfo
 * @returns {Promise<*>}
 */
export async function loginByUserName(loginInfo) {
    try {
        // const url = window.location.host
        // todo 登录地址域名
        const url = 'operation.enesys.cn'
        let param = config.loginByUserName
        let result
        let returnValue
        loginInfo.url = url
        param.data = {
            data: loginInfo
        }
        result = await axios(param)
        returnValue = result.data
        console.log(returnValue.code === API_STATUS.SUCCESS)
        // http 响应成功
        if (returnValue.code === API_STATUS.SUCCESS) {
            return {status: 'success', data: returnValue.data}
        } else {
            return {status: 'error', data: returnValue}
        }
    } catch (e) {
        throw e
    }
}
/**
 * 获取用户信息
 * @param authorize
 * @returns {Promise<void>}
 */
export async function getUserInfo(authorize) {
    try {
        // const url = window.location.host
        // todo 登录地址域名
        const url = 'operation.enesys.cn'
        let param = config.getUserInfo
        let result = null
        let retrunValue = null

        param.data = {
            data: {
                authorize,
                url
            }
        }
        result = await axios(param)
        retrunValue = result.data
        if (retrunValue.code === API_STATUS.SUCCESS) {
            return retrunValue.data
        } else {
            throw new Error(SERVICE_ERR)
        }
    } catch (e) {
        throw e
    }
}
/**
 * 查询待审核记录
 * @param query
 * @returns {Promise<{data: *, message: string}>}
 */
export async function getWaitExamineList(query) {
    try {
        let param = config.getWaitExamineList
        param.data = {
            data: query
        }

        let {data} = await axios(param)

        if (data.code === API_STATUS.SUCCESS) {
            return {data: data.data, message: '成功'}
        } else {
            throw new Error(data.msg)
        }
    } catch (e) {
        throw e
    }
}
