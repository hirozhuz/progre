import {getTodoList} from '@/utils/todoList'
import notification from '@/utils/notification'
import getDayStartAndEnd from '@/utils/getDayStartAndEnd'
import {getAppId, onMessage} from '@/utils/communication'
import {getSetting} from '@/utils/setting'
import {DEFAULT_CONFIG} from '@/config'


let timer = null

let isSendFirst = false

let isSendWeeklyNotify = false

let remindList = {}


// 循环间隔 默认40秒执行一次
let INTERVAL = 40 * 1000

let config = null

const appId = getAppId()


function getConfig() {
    const setting = getSetting()
    let {
        // 任务开始提醒
        itemStartReminder = DEFAULT_CONFIG.itemStartReminder,
        //  任务开始前多少分钟提醒（分钟）
        itemStartReminderTime = DEFAULT_CONFIG.itemStartReminderTime,
        // 任务开始前提醒间隔（分钟）
        itemStartReminderInterval = DEFAULT_CONFIG.itemStartReminderInterval,
        // 任务到期提醒
        itemEndReminder = DEFAULT_CONFIG.itemEndReminder,
        // 任务结束前多少分钟提醒
        itemEndReminderTime = DEFAULT_CONFIG.itemEndReminderTime,
        // 任务结束前提醒间隔（分钟）
        itemEndReminderInterval = DEFAULT_CONFIG.itemEndReminderInterval,
        // 工时填报提醒
        timeFillingReminder = DEFAULT_CONFIG.timeFillingReminder,
        // 工时填报提醒日
        timeFillingReminderDay = DEFAULT_CONFIG.timeFillingReminderDay,
        // 工时填报提醒时间
        timeFillingReminderTime = DEFAULT_CONFIG.timeFillingReminderTime
    } = setting || {}

    return setting
}


onMessage((request, sender) => {
    if (typeof request === 'object') {
        if (request.updateSetting) {
            if (sender && sender.id === appId) {
                init()
            }
        }
    }
})


// 校验提醒列表
function matchList() {
    const {
        // 任务开始前提醒
        itemStartReminder,
        // 任务到期前提醒
        itemEndReminder,
        //  任务开始前多少分钟提醒（分钟）
        itemStartReminderTime,
        // 任务结束前提醒间隔（分钟）
        itemStartReminderInterval,
        // 任务结束前多少分钟提醒
        itemEndReminderTime,
        // 任务结束前提醒间隔（分钟）
        itemEndReminderInterval
    } = config || {}
    // // 默认的记录
    // let defaultList = []
    let total = 0
    // 超期的记录
    let expiredList = []
    // 将要超期的记录
    let willExpireList = []

    if (itemStartReminder || itemEndReminder) {
        const todoList = getTodoList()
        const now = new Date().getTime()
        // 即将超期的
        todoList.forEach((item) => {
            const {doDate, dueDate, actualStartTime} = item
            if (doDate || dueDate) {
                const [dayStart, dayEnd] = getDayStartAndEnd(new Date())
                // 判断开始时间 计划执行时间
                if ((doDate >= dayStart && doDate <= dayEnd) ||
                    (dueDate >= dayStart || dayEnd <= dayEnd)) {
                    total += 1
                }
                // 如果有开始时间 则证明 当前任务已经开始
                // 则校验是否超出预计结束日期
                if (actualStartTime) {
                    // if (dueDate) {
                    const surplus = dueDate - now
                    // 如果剩余时间小于0 则说明超期
                    if (surplus < 0) {
                        const {id} = item

                        // 如果有推送记录
                        if (remindList[id]) {
                            const {sendTime, type} = remindList[id]
                            // 如果 推送类型 不为结束时间超期  或者  距离上次推送时间 大于 设定的推送间隔时间 并且类型
                            if (type !== 'endExpired' || now - sendTime >= itemStartReminderTime * 1000 * 60) {
                                expiredList.push(item)
                                remindList[id] = {
                                    sendTime: now,
                                    type    : 'endExpired'
                                }
                            }
                        } else {
                            expiredList.push(item)
                            remindList[id] = {
                                sendTime: now,
                                type    : 'endExpired'
                            }
                        }
                    } else {

                        // 如果剩余时间 小于等于 默认提醒时间
                        if (surplus <= itemEndReminderTime * 1000 * 60) {
                            const {id} = item
                            if (remindList[id]) {
                                const {sendTime, type} = remindList[id]
                                if (type !== 'endWillExpired' || now - sendTime >= itemEndReminderInterval * 1000 * 60) {
                                    willExpireList.push(item)
                                    remindList[id] = {
                                        sendTime: now,
                                        type    : 'endWillExpired'
                                    }
                                }
                            } else {
                                willExpireList.push(item)
                                remindList[id] = {
                                    sendTime: now,
                                    type    : 'endWillExpired'
                                }
                            }
                        }
                    }
                    // }
                } else {
                    const surplus = doDate - now
                    if (surplus < 0) {
                        const {id} = item

                        // 如果有推送记录
                        if (remindList[id]) {
                            const {sendTime, type} = remindList[id]
                            // 如果 推送类型 不为开始时间超期  或者  距离上次推送时间 大于 设定的推送间隔时间 并且类型
                            if (type !== 'startExpired' || now - sendTime >= itemStartReminderTime * 1000 * 60) {
                                expiredList.push(item)
                                remindList[id] = {
                                    sendTime: now,
                                    type    : 'startExpired'
                                }
                            }
                        } else {
                            expiredList.push(item)
                            remindList[id] = {
                                sendTime: now,
                                type    : 'startExpired'
                            }
                        }

                    } else {
                        // 如果剩余时间 小于等于 默认提醒时间
                        if (surplus <= itemStartReminderTime * 1000 * 60) {
                            const {id} = item
                            if (remindList[id]) {
                                const {sendTime, type} = remindList[id]
                                // 如果 推送类型 不为开始时间超期  或者  距离上次推送时间 大于 设定的推送间隔时间 并且类型
                                if (type !== 'startWillExpired' || now - sendTime >= itemStartReminderInterval * 1000 * 60) {
                                    willExpireList.push(item)
                                    remindList[id] = {
                                        sendTime: now,
                                        type    : 'startWillExpired'
                                    }
                                }
                            } else {
                                willExpireList.push(item)
                                remindList[id] = {
                                    sendTime: now,
                                    type    : 'startWillExpired'
                                }
                            }
                        }
                    }
                }
                // if (doDate){
                //
                // }
            } else {
                total += 1
            }
        })
    }


    return {
        expiredList,
        willExpireList,
        total
    }

}

// matchList

function matchWeeklyNotify() {
    const {timeFillingReminder, timeFillingReminderDay, timeFillingReminderTime} = config || {}

    if (!isSendWeeklyNotify && timeFillingReminder) {
        const now = new Date()
        const day = now.getDay()
        if (day === timeFillingReminderDay) {
            const hours = now.getHours()
            const seconds = now.getSeconds()
            const minutes = now.getMinutes()

            if (hours >= timeFillingReminderTime[0] &&
                seconds >= timeFillingReminderTime[1] &&
                minutes >= timeFillingReminderTime[2]) {
                isSendWeeklyNotify = true
                return '请注意本周工时填报'
            }
        }
        return null
    }
}

function sendNotification() {
    const weeklyNotify = matchWeeklyNotify()
    const {total, willExpireList = [], expiredList = []} = matchList()
    let messageList = []

    if (weeklyNotify) {
        messageList.push({title: '周报提醒', message: weeklyNotify})
    }

    if (total && !isSendFirst) {
        isSendFirst = true
        messageList.push({title: '提醒', message: `今天你有${total}条代办事项需要完成,加油！`})
    }


    expiredList.forEach((item) => {
        messageList.push({title: '任务超期提醒', message: `${item.title}已超期`})
    })

    // 将要超期
    willExpireList.forEach((item) => {
        messageList.push({title: '任务即将超期提醒', message: `${item.title}即将超期`})
    })
    if (messageList.length) {
        const {title, message} = messageList[0]
        notification(null, {type: 'list', title, message, items: messageList})
    }
}

function loop() {

    sendNotification()
    timer = setTimeout(loop, INTERVAL)
}


function init() {
    config = getConfig()
    clearTimeout(timer)
    loop()
}

init()


