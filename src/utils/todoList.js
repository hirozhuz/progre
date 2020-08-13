export function getTodoList() {
    const data = localStorage.getItem('todoList')
    if (data) {
        try {
            return JSON.parse(data)
        } catch (e) {
            console.error(e)
            return []
        }
    } else {
        return []
    }
}

export function setTodoList(list = []) {
    try {
        localStorage.setItem('todoList', JSON.stringify(list))
    } catch (e) {
        console.error(e)
    }
}

export function setFinishTodoList(list) {
    try {
        localStorage.setItem('finishTodoList', JSON.stringify(list))
    } catch (e) {
        console.error(e)
    }
}

export function getFinishTodoList() {
    const data = localStorage.getItem('finishTodoList')
    if (data) {
        try {
            return JSON.parse(data)
        } catch (e) {
            console.error(e)
            return []
        }
    } else {
        return []
    }
}

