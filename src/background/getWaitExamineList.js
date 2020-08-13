import {getWaitExamineList} from '@/service'
import notification from '@utils/notification'
import {getToken} from '@/utils/auth'
import {HTTP_401_ERR} from '@config/error_message'
import {getSetting} from '@/utils/setting'
import {onMessage, getAppId} from '@/utils/communication'
import {DEFAULT_CONFIG} from '@/config'

const INTERVAL_TIME = 30000
let noAuditWeekNum = 0
let noSendOrRegectNum = 0
const appId = getAppId()
let timer = null


function getConfig() {
    const setting = getSetting()
    let {managementSystemNotification} = setting || {}
    return typeof managementSystemNotification === 'undefined' ? DEFAULT_CONFIG.managementSystemNotification : managementSystemNotification
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

function sendNotification(newNoAuditWeekNum, newNoSendOrRegectNum) {
    if (newNoAuditWeekNum > 0 && newNoAuditWeekNum !== noAuditWeekNum) {
        notification(null, {message: `您有${newNoAuditWeekNum}条待审核的工时审核任务，请及时审核。`})
    }
    if (newNoSendOrRegectNum > 0 && newNoSendOrRegectNum !== noSendOrRegectNum) {
        notification(null, {message: `您有${ newNoSendOrRegectNum }条待发送/待审核的工时记录，请及时填报并发送。`})
    }

    noAuditWeekNum = newNoAuditWeekNum || 0
    noSendOrRegectNum = newNoSendOrRegectNum || 0
}


async function getData(callback) {
    try {
        const {data = {}} = await getWaitExamineList({})
        const {noAuditWeekNum, noSendOrRegectNum} = data
        sendNotification(noAuditWeekNum, noSendOrRegectNum)
    } catch (e) {
        if (e === HTTP_401_ERR) {
            notification(null, {message: '账户授权已过期，请重新登录'})
        } else {
            console.error(e)
        }

    } finally {
        callback && callback()
    }
}

async function poll() {
    if (getToken()) {
        await getData()
    } else {
        noAuditWeekNum = 0
        noSendOrRegectNum = 0
    }
    timer = setTimeout(() => {
        poll()
    }, INTERVAL_TIME)
}


function init() {
    clearTimeout(timer)
    if (getConfig()) {
        poll()
    }
}

init()


