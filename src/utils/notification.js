const DEFAULT_OPTION = {type: 'basic', iconUrl: 'icons/icon_48.png', title: '通知', message: ''}

export default function notification(id, options) {
    options = {...DEFAULT_OPTION, ...options}
    if (!id) {
        id = Math.random() + ''
    }
    chrome.notifications.create(id, options)
}
