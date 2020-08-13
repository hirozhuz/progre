export const BASE_URL = 'http://10.201.4.19:8880'
// 系统token key 名称
export const TOKEN_KEY = 'Admin-Token'
// token 有效期 （天）
export const TOKEN_TIME = 30
// 登录密码加密公钥
export const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsyRDOOfGIUBKA+BMu3qOwS3m6WW8x6ehVV4QWgq4xDCAJAFhOG1jpKTOrZIfCXaDL9rj5mPypbI3LCIZ9BS6NaC6/Y+M6oprS9iKOn1B9EkxrnR71AmRYQjacOEss+xvXVLso3O5B6tJBU23RdC28ML8yo7e/gWoR0YB20I+0uQIDAQAB'
// 未授权http响应码
export const UNAUTHORIZED_STATUS = 401

// 招呼
export const callList = ['Hello', '嗨', 'Welcome', '欢迎', 'Hey', '你好呀']
// 鸡汤
export const chickenSoupList = ['追求卓越', '不论成功还是失败，都是系于自己', '自信是成功的第一诀窍', '所有的努力，最终都会绕个大圈回报给你自己', '每一件自己觉得值得的事都要不留余力的去做', '知人者智，自知者明。胜人者有力，自胜者强', '一切节省，归根到底都归结为时间的节省', '自己的饭量自己知道', '天下之事常成于困约，而败于奢靡', '唯书籍不朽', '问渠哪得清如许，为有源头活水来', '少而好学，如日出之阳；壮而好学，如日中之光；志而好学，如炳烛之光', '路漫漫其修道远，吾将上下而求索', '今日事，今日毕', '👈左边是我画的，哈哈']
// 周报鸡汤
export const weeklyChickenSoupList = ["士不可以不弘毅,任重而道远。", "契而舍之，朽木不折；锲而不舍，金石可镂。", "古之立大事者，不惟有超世之才，亦必有坚韧不拔之志。", "积土而为山，积水而为海。", "不登高山，不知天之高也；不临深溪，不知地之厚也。", "博观而约取，厚积而薄发。", "吾生也有涯,而知也无涯."]


// 默认设置
export const DEFAULT_CONFIG = {
    // 项目管理系统 通知
    managementSystemNotification: true,
    // 工时填报提醒
    timeFillingReminder         : true,
    // 工时填报提醒日
    timeFillingReminderDay      : 5,
    // 工时填报提醒时间
    timeFillingReminderTime     : [17, 0, 0],
    // 任务开始提醒
    itemStartReminder           : true,
    // 任务开始前多少分钟提醒（分钟）
    itemStartReminderTime       : 10,
    // 任务开始前提醒间隔（分钟）
    itemStartReminderInterval   : 30,
    // 任务结束提醒
    itemEndReminder             : true,
    // 任务结束前多少分钟提醒
    itemEndReminderTime         : 10,
    // 任务结束前提醒间隔（分钟）
    itemEndReminderInterval     : 30,
    // 周报生成
    weeklyCreate                : true,
    // 周报生成日期
    weeklyCreateDay             : 5,
    // 周报生成时间
    weeklyCreateTime            : [17, 0, 0],
    // 周报显示方式
    weeklyType                  : 'tag'
}
