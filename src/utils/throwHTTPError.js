/**
 * Created by zhuzheng on 2018/11/14.
 * HTTP 请求异常捕获
 */

import {
    HTTP_400_ERR, HTTP_401_ERR, HTTP_403_ERR, HTTP_404_ERR, HTTP_408_ERR, HTTP_417_ERR, HTTP_500_ERR, HTTP_501_ERR,
    HTTP_502_ERR, HTTP_503_ERR, HTTP_504_ERR, HTTP_505_ERR,SERVICE_ERR
} from '@config/error_message'

/**
 * http请求异常捕获
 * @param code
 * @param response
 * @return {*}
 */
export function throwHTTPError(error) {

    let code = -1
    let message = SERVICE_ERR

    if (error && error.response) {
        let response = error.response
        code = response.status
        switch (code) {
            case 400:
                message = HTTP_400_ERR
                break
            case 401:
                message = HTTP_401_ERR
                break
            case 403:
                message = HTTP_403_ERR
                break
            case 404:
                message = HTTP_404_ERR
                break
            case 408:
                message = HTTP_408_ERR
                break
            case 417:
                message = HTTP_417_ERR
                break
            case 500:
                message = HTTP_500_ERR
                break
            case 501:
                message = HTTP_501_ERR
                break
            case 502:
                message = HTTP_502_ERR
                break
            case 503:
                message = HTTP_503_ERR
                break
            case 504:
                message = HTTP_504_ERR
                break
            case 505:
                message = HTTP_505_ERR
                break
            default:
        }
    }

    return message
}
