export default function getDayStartAndEnd(day) {
    let date = new Date(day)
    date.setHours(0, 0, 0, 0)
    const start = date.getTime()
    const end = start + 1000 * 60 * 60 * 24 - 1
    return [start, end]
}
