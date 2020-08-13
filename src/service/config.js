import {BASE_URL} from '@config'

const TIMESTAMP = new Date().getTime()
// 登陆请求接口
export const loginByUserName = {
    url     : `${BASE_URL}/gateway/project/gateway.do?method=user.login&version=1.0.0&t=${TIMESTAMP}&w_appid=pg_web_1.0.0`,
    method  : 'post',
    dataType: 'json',
    headers : {
        'Content-Type': 'application/json'
    },
    timeout : 30000
}
// 获取用户信息相关接口
export const getUserInfo = {
    url     : `${BASE_URL}/gateway/project/gateway.do?method=user.getBaseModel&version=1.0.0&t=${TIMESTAMP}&w_appid=pg_web_1.0.0`,
    method  : 'post',
    dataType: 'json',
    headers : {
        'Content-Type': 'application/json'
    },
    timeout : 30000
}
// 查询待审核列表
export const getWaitExamineList = {
    url     : `${BASE_URL}/gateway/operation/gateway.do?method=timeSheets.queryAuditWeek&version=1.0.0&w_appid=pg_web_1.0.0&t=${TIMESTAMP}`,
    method  : 'post',
    dataType: 'json',
    headers : {
        'Content-Type': 'application/json'
    },
    timeout : 30000
}
