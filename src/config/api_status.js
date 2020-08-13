/**
 * web程序与 接口的 响应码枚举
 */
/**================ 01 请求响应码====================**/
// 操作成功
export const SUCCESS = 0
// 系统未知异常
export const SYSTEM_ERROR = '9999'
// 请传入Token
export const TOKEN_IS_NULL = '01001'
// Token 失效
export const TOKEN_IS_INVALID = '01002'
// 参数必填
export const FIELD_MISSING = '02002'
/**================ 02 账户响应码====================**/

// 帐号已经被注册,请修改后重试！
export const ACCOUNT_ALREADY_EXISTS = '02003'
// 密码不一致
export const PASSWORDS_INCONSISTENT = '02004'
// 新旧密码不一致
export const ACCOUNT_PASSWORDS_ERROR = '02005'
// 账号异常
export const ACCOUNT_ABNORMAL = '02006'
// 旧密码输入错误
export const PASSWORDS_INCORRECT = '02007'
