export function sendMessage(message, callback, id) {
    if (id) {
        chrome.tabs.sendMessage(id, message, callback)

    } else {
        chrome.runtime.sendMessage(message, callback)
    }
}

export function onMessage(callback) {
    chrome.runtime.onMessage.addListener(callback)
}

export function getAppId() {
    return chrome.runtime.id
}
