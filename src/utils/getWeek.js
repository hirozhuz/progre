/**
 * 获取指定日期 周一 至 周日的所有日期
 * @param target
 * @returns {Date[]}
 */
export default function getWeek(target) {
    const now = new Date(target)
    const now_day = now.getDay()
    const now_time = now.getTime()
    const result = [1, 2, 3, 4, 5, 6, 7]
    return result.map(i => (new Date(now_time + 24 * 60 * 60 * 1000 * (i - now_day))))
}
