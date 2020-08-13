export function getSetting() {
    const data = localStorage.getItem('setting')
    if (data) {
        try {
            return JSON.parse(data)
        } catch (e) {
            console.error(e)
            return {}
        }
    } else {
        return {}
    }
}

export function setSetting(setting = {}) {
    try {
        localStorage.setItem('setting', JSON.stringify(setting))
    } catch (e) {
        console.error(e)
    }
}
