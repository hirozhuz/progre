/**
 * 用时格式化
 * @param timestamp
 * @return {string}
 */
export default function formatDuring(timestamp) {
    let days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0,
        content = '',
        arr = ['天', '小时', '分钟', '秒']

    if (timestamp > 86400000) {
        days = parseInt(timestamp / 86400000)
    }

    if (timestamp > 3600000) {
        hours = parseInt((timestamp - (days * 86400000)) / 3600000)
    }

    if (timestamp > 60000) {
        minutes = parseInt((timestamp - (days * 86400000) - (hours * 3600000)) / 60000)
    }

    if (timestamp > 1000) {
        seconds = parseInt((timestamp - (days * 86400000) - (hours * 3600000) - (minutes * 60000)) / 1000)
    } else {
        seconds = 1
    }

    let arrTime = [days, hours, minutes, seconds]

    for (let i = 0; i < arrTime.length; i++) {
        if (arrTime[i]) {
            content += arrTime[i] + arr[i]
        }
    }
    return content
}
