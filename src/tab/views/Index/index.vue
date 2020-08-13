<template>
    <div class="progress-view">
        <welcome/>
        <add-more-task-button @add="handleToDoAdd"/>
        <div class="progress-view__row">
            <div class="progress-view__column">
                <todo-item v-for="todo in todoList.even"
                           :key="todo.id"
                           :data="todo"
                           @delete="handleToDoDelete"
                           @change="handleToDoChange"
                           @finish="handleToDoFinish"
                           @click="handleToDoItemClick"
                />
            </div>
            <div class="progress-view__column">
                <todo-item v-for="todo in todoList.odd"
                           :key="todo.id"
                           :data="todo"
                           @delete="handleToDoDelete"
                           @change="handleToDoChange"
                           @finish="handleToDoFinish"
                           @click="handleToDoItemClick"
                />
            </div>
        </div>
        <!-- 系统设置-->
        <progre-button class="progress-view__setting-button" @click="handleSettingClick">
            <i class="iconfont icon-setting"></i>
        </progre-button>
        <!-- 历史记录-->
        <progre-button class="progress-view__history-button" @click="handleHistoryClick">
            <i class="iconfont icon-history"></i>
        </progre-button>
        <!-- 周报-->
        <progre-button class="progress-view__weekly-button" @click="handleWeeklyClick">
            <i class="el-icon-s-management"></i>
        </progre-button>
        <popup v-if="showPopup" @close="handlePopupClose">
            <todo-editor v-if="componentName==='todoEditor'"
                         :data="currentItem"
                         @change="handleToDoChange"
            />
            <setting ref="setting" v-if="componentName==='setting'"/>
            <weekly v-if="componentName==='weekly'"/>
        </popup>
        <history v-if="showHistory" @close="handleHistoryClose"/>

    </div>

</template>

<script>
    import TodoItem from '@components/TodoItem'
    import Welcome from '@components/Welcome'
    import AddMoreTaskButton from '@components/AddMoreTaskButton'
    import ProgreButton from '@components/Button'
    import Popup from '@components/Popup'
    import TodoEditor from '@components/TodoEditor'
    import History from '@components/History'
    import Setting from '@components/Setting'
    import Weekly from '@/components/Weekly/index'

    import {getTodoList, setTodoList, setFinishTodoList, getFinishTodoList} from '@utils/todoList'
    import {sendMessage, onMessage, getAppId} from '@/utils/communication'

    export default {
        name      : "Index",
        data() {
            return {
                data         : [],
                showPopup    : false,
                componentName: '',
                currentItemId: '',
                showHistory  : false,
                appId        : null
            }
        },
        mounted() {
            this.initTodoList()
            this.getAppId()
            this.onMessage()
        },
        computed  : {
            todoList() {
                const {data = []} = this
                // 双
                let odd = []
                // 单
                let even = []

                data.forEach((item, index) => {
                    if ((index + 1) % 2 === 0) {
                        odd.push(item)
                    } else {
                        even.push(item)
                    }
                })

                return {
                    odd,
                    even
                }
            },
            currentItem() {
                const {currentItemId, data = []} = this
                if (currentItemId) {
                    const index = data.findIndex((item) => {
                        return item.id === currentItemId
                    })
                    return data[index]
                } else {
                    return {}
                }
            }
        },
        methods   : {
            getAppId() {
                this.appId = getAppId()
            },
            // 初始化todo list
            initTodoList() {
                this.data = this.sortTodoList(this.getTodoList())
            },
            // 获取todo list
            getTodoList() {
                return getTodoList()
            },
            // 存入todo list
            setTodoList(list = []) {
                setTodoList(list)
            },
            getFinishTodoList() {
                return getFinishTodoList()
            },
            setFinishTodoList(list = []) {
                setFinishTodoList(list)
            },
            // 新增todo
            addTodo(todo) {
                let oldTodoList = this.getTodoList()
                const now = new Date().getTime()
                todo.id = now
                todo.createTime = now

                oldTodoList.push(todo)
                this.setTodoList(oldTodoList)
                this.update()
            },
            // 删除todo
            deleteTodo(todo) {
                let oldTodoList = this.getTodoList()
                const index = oldTodoList.findIndex((item) => {
                    return item.id === todo.id
                })

                if (index > -1) {
                    oldTodoList.splice(index, 1)
                    this.setTodoList(oldTodoList)
                }
                this.update()
            },
            // 修改todo
            changeTodo(id, params = {}) {
                let oldTodoList = this.getTodoList()
                const index = oldTodoList.findIndex((item) => {
                    return item.id === id
                })
                if (index > -1) {
                    const newItem = {...oldTodoList[index], ...params}
                    oldTodoList.splice(index, 1, newItem)
                    this.setTodoList(oldTodoList)
                }
                this.update()
            },
            // 结束todo
            finishTodo(id, params = {}) {
                let oldTodoList = this.getTodoList()
                const index = oldTodoList.findIndex((item) => {
                    return item.id === id
                })
                if (index > -1) {
                    const newItem = {...oldTodoList[index], ...params}
                    const finishTodoList = this.getFinishTodoList()

                    finishTodoList.push(newItem)
                    oldTodoList.splice(index, 1)
                    this.setFinishTodoList(finishTodoList)
                    this.setTodoList(oldTodoList)
                }
                this.initTodoList()
            },
            // 任务列表排序
            sortTodoList(list = []) {
                let starList = []
                let noStarList = []
                let executeList = []
                // let
                list = list.sort((prev, now) => {
                    const prevCreateTime = prev.createTime
                    const prevActualStartTime = prev.actualStartTime
                    const prevDueDate = prev.dueDate
                    const prevDoDate = prev.doDate
                    const {createTime, actualStartTime, dueDate, doDate} = now

                    let prevCompareTime = prevCreateTime
                    let compareTime = createTime

                    // 结束时间
                    //  如果有执行时间
                    if (prevActualStartTime) {
                        prevCompareTime = prevActualStartTime || prevDueDate || prevDoDate
                    } else {
                        prevCompareTime = prevDoDate || prevDueDate || prevCreateTime
                    }

                    if (actualStartTime) {
                        compareTime = actualStartTime || dueDate || doDate
                    } else {
                        compareTime = doDate || dueDate || createTime
                    }


                    return prevCompareTime < compareTime ? -1 : 1
                })
                list.forEach((item) => {
                    if (item.actualStartTime) {
                        executeList.push(item)
                    } else if (item.star) {
                        starList.push(item)
                    } else {
                        noStarList.push(item)
                    }
                })
                // 已执行的优先级最高，其次为star 最后为默认
                return executeList.concat(starList.concat(noStarList))
            },
            // 响应todo新增事件
            handleToDoAdd(todo) {
                this.addTodo(todo)
            },
            // 响应todo删除事件
            handleToDoDelete(todo) {
                this.deleteTodo(todo)
            },
            // 响应todo修改事件
            handleToDoChange(data = {}) {
                const {id, params = {}} = data
                this.changeTodo(id, params)
            },
            handleToDoFinish(data = {}) {
                const {id, params = {}} = data
                this.finishTodo(id, params)

            },
            handleToDoItemClick(item) {
                this.currentItemId = item.id
                this.showPopup = true
                this.componentName = 'todoEditor'
            },
            handleSettingClick() {
                this.componentName = 'setting'
                this.showPopup = true
            },
            handleHistoryClick() {
                this.showHistory = true
            },
            handleWeeklyClick() {
                this.componentName = 'weekly'
                this.showPopup = true
            },
            handleHistoryClose() {
                this.showHistory = false
            },
            handlePopupClose() {
                this.showPopup = false
                this.componentName = ''
                this.currentItemId = ''
            },
            update() {
                this.initTodoList()
                this.sendMessage()
            },
            onMessage() {
                onMessage((request, sender) => {
                    if (typeof request === 'object') {
                        const {appId} = this
                        if (request.update) {
                            if (sender && sender.id === appId) {
                                this.initTodoList()
                            }
                        }
                        if (request.updateSetting) {
                            if (sender && sender.id === appId) {
                                this.initSetting()
                            }
                        }
                    }
                })
            },
            initSetting() {
                if (this.$refs.setting) {
                    this.$refs.setting.init()
                }
            },
            sendMessage() {
                sendMessage({update: true})
            }
        },
        components: {
            Weekly,
            Welcome,
            AddMoreTaskButton,
            TodoItem,
            ProgreButton,
            Popup,
            TodoEditor,
            History,
            Setting
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .progress-view
        position relative
        width 80%
        padding 120px 56px $space-base* 2
        margin 0 auto
        box-sizing border-box
        .progress-view__row
            display flex
            flex-direction row
            margin-left - $space-base* 2
            margin-right - $space-base* 2
        .progress-view__column
            width 50%
            box-sizing border-box
            padding 0 $space-base* 2
        .progress-view__setting-button
            position fixed
            right $space-base* 2
            bottom $space-base* 2
            color $accent-font-color
        .progress-view__history-button
            position fixed
            left $space-base* 2
            bottom $space-base* 2
            color $accent-font-color
        .progress-view__weekly-button
            position fixed
            right $space-base* 2
            bottom $space-base* 8
            font-size 16px
            color $accent-font-color
</style>
