<template>
    <div class="weekly-container">
        <h2 class="weekly-title">{{format(weekStart)}} - {{format(weekEnd)}}</h2>
        <P class="weekly-row">
            <span class="weekly-row__label">本周完成率</span>
            <span class="weekly-row__content"><span class="weekly-row__count">{{completionRate}}</span>%</span>
        </P>

        <P class="weekly-row">
            <span class="weekly-row__label">本周创建</span>
            <span class="weekly-row__content"><span class="weekly-row__count">{{thisWeekCreateLength}}</span>项</span>
        </P>

        <P class="weekly-row">
            <span class="weekly-row__label">本周共需完成</span>
            <span class="weekly-row__content"><span
                    class="weekly-row__count">{{thisWeekShouldDoneLength}}</span>项</span>
        </P>
        <P class="weekly-row weekly-row--sub">
            <span class="weekly-row__label">计划本周执行</span>
            <span class="weekly-row__content"><span
                    class="weekly-row__count">{{planDoInThisWeekCreateLength}}</span>项</span>
        </P>
        <P class="weekly-row weekly-row--sub">
            <span class="weekly-row__label">上周结转</span>
            <span class="weekly-row__content"><span
                    class="weekly-row__count">{{lastWeekForwardLength}}</span>项</span>
        </P>

        <P class="weekly-row">
            <span class="weekly-row__label">剩余</span>
            <span class="weekly-row__content"><span class="weekly-row__count">{{thisWeekTodoLength}}</span>项</span>
        </P>

        <P class="weekly-row">
            <span class="weekly-row__label">本周共完成</span>
            <span class="weekly-row__content"><span class="weekly-row__count">{{thisWeekFinishLength}}</span>项</span>
        </P>


        <P class="weekly-row weekly-row--sub">
            <span class="weekly-row__label">超时</span>
            <span class="weekly-row__content"><span
                    class="weekly-row__count">{{overtimeInThisWeekFinish}}</span>项</span>
        </P>


        <P class="weekly-row weekly-row--sub">
            <span class="weekly-row__label">提前完成</span>
            <span class="weekly-row__content"><span class="weekly-row__count">{{advanceInThisWeekFinish}}</span>项</span>
        </P>


        <template>
            <P class="weekly-row">本周完成事项：</P>
            <p class="weekly-row">周一:</p>
            <p class="weekly-row">杭燃可视化项目，用时1小时20分01秒</p>
            <p class="weekly-row">重燃接口对接</p>
        </template>
        <template>
            <p class="weekly-row">下周待办事项：</p>
            <p class="weekly-row">周一:</p>
            <p class="weekly-row">杭燃可视化项目</p>
            <p class="weekly-row">重燃接口对接</p>
        </template>
        <p class="weekly-row"></p>
    </div>
</template>

<script>
    import getWeek from '@/utils/getWeek'
    import {getFinishTodoList, getTodoList} from '@/utils/todoList'
    import formatTimestamp from '@/utils/formatTimestamp'
    // 每周五自动生成
    const DEFAULT_DAY = 5
    const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]
    // 周报
    export default {
        name    : "Weekly",
        data() {
            return {
                isThisWeek    : true,
                createDay     : DEFAULT_DAY,
                weeklyType    : 'tag',
                weekStart     : 0,
                weekEnd       : 0,
                todoList      : [],
                finishTodoList: []
            }
        },
        mounted() {
            const {isThisWeek, start, end} = this.getWeek()
            this.isThisWeek = isThisWeek
            this.weekStart = start
            this.weekEnd = end
            this.todoList = this.getTodoList()
            this.finishTodoList = this.getFinishTodoList()
        },
        computed: {
            // 本周剩余 本周完成 本周创建
            group() {
                const {weekStart, weekEnd, todoList, finishTodoList} = this
                const list = todoList.concat(finishTodoList)
                // 已结束的
                let finish = []
                // 本周需要执行的
                let todo = []
                // 计划本周执行的
                let planTodo = []
                // 本周创建
                let create = []
                // 上周结转
                let forward = []
                // 计划本周完成
                let planFinish = []
                // 超时完成
                let overtimeFinish = []
                // 提前完成
                let aheadFinish = []
                list.forEach((item) => {
                    const {finishTime, doDate, dueDate, createTime, actualStartTime} = item
                    if (finishTime) {
                        if (finishTime >= weekStart &&
                            finishTime < weekEnd) {
                            finish.push(item)

                            if (doDate || dueDate) {
                                let isOverTime = false
                                // 判断是否有开始时间
                                // 计划执行时间超时
                                if (actualStartTime) {
                                    if (doDate && doDate > actualStartTime) {
                                        isOverTime = true
                                        overtimeFinish.push(item)
                                    }
                                }

                                // 结束时间超时
                                if (!isOverTime && finishTime >= dueDate) {
                                    isOverTime = true
                                    overtimeFinish.push(item)
                                }

                                // 未超时
                                if (!isOverTime) {
                                    // 未超时
                                    if (doDate && actualStartTime && actualStartTime < doDate) {
                                        aheadFinish.push(item)
                                    } else if (dueDate && finishTime < dueDate) {
                                        aheadFinish.push(item)
                                    }
                                }

                            } else {
                                if (createTime <= weekStart) {

                                }
                            }
                        }
                    }
                    else {


                        // 判断是否为本周待办事项
                        const compareValue = actualStartTime || doDate || dueDate || createTime
                        if (compareValue < weekEnd) {
                            todo.push(item)
                        }
                    }

                    // 本周计划执行
                    const planTodoCompareValue = doDate || dueDate || createTime
                    if (planTodoCompareValue >= weekStart && planTodoCompareValue < weekEnd) {
                        planTodo.push(item)
                    }

                    // 判断是否为上周结转事项
                    console.log((!finishTime || finishTime > weekStart))
                    if ((!finishTime || finishTime > weekStart) && planTodoCompareValue < weekStart) {
                        forward.push(item)
                    }
                    // 判断是否为本周创建
                    const compareValue = doDate || dueDate || createTime
                    if (createTime >= weekStart && createTime < weekEnd) {
                        // planFinish
                        create.push(item)
                    }
                    // 是否为本周计划计划本周执行
                    if (compareValue < weekEnd && compareValue >= weekStart) {
                        planFinish.push(item)
                    }

                })
                return {
                    finish,
                    todo,
                    create,
                    planTodo,
                    planFinish,
                    overtimeFinish,
                    aheadFinish,
                    forward
                }
            },
            nextWeekList() {
                const {todoList, weekEnd} = this
                let nextWeekStart = weekEnd
                let nextWeekEnd = nextWeekStart + (1000 * 60 * 60 * 60 * 24 * 7)

                let list = []
                todoList.forEach((item) => {
                    const {doDate, dueDate} = item
                    const compareValue = doDate || dueDate

                    if (compareValue) {
                        if (compareValue >= nextWeekStart && compareValue < nextWeekEnd) {
                            list.push(item)
                        }
                    } else {
                        list.push(item)
                    }
                })

                return list

            },
            // 本周创建
            thisWeekCreateLength() {
                const {group} = this
                return group.create.length
            },
            // 本周共需完成
            thisWeekShouldDoneLength() {
                const {planDoInThisWeekCreateLength, lastWeekForwardLength} = this
                return planDoInThisWeekCreateLength + lastWeekForwardLength
            },
            // 本周创建中计划本周执行
            planDoInThisWeekCreateLength() {
                const {group} = this
                return group.planTodo.length
            },
            // 上周结转
            lastWeekForwardLength() {
                const {group} = this
                console.log(group.forward)
                return group.forward.length
            },
            // 事项完成率
            completionRate() {
                const {thisWeekShouldDoneLength, thisWeekFinishLength} = this
                return ((thisWeekFinishLength / thisWeekShouldDoneLength) * 100).toFixed(2)
            },
            // 本周完成
            thisWeekFinishLength() {
                const {group} = this
                return group.finish.length
            },
            // 本周完成内超时记录
            overtimeInThisWeekFinish() {
                const {group} = this
                return group.overtimeFinish.length
            },
            // 本周完成内提前记录
            advanceInThisWeekFinish() {
                const {group} = this
                return group.aheadFinish.length
            },
            // 剩余
            thisWeekTodoLength() {
                const {group} = this
                return group.todo.length
            },
            // 本周工时
            thisWeekDownList() {
                return []
            }
        },
        methods : {
            getWeek() {
                // 现在
                const now = new Date()
                // 本周日期
                const thisWeek = getWeek(now)
                // 创建的日期
                // 星期几
                const createDay = this.createDay
                // 索引
                const dayIndex = WEEK_ORDER.indexOf(createDay)
                // 本周创建日期
                let weekCreateDay = thisWeek[dayIndex]

                // 设置 每周 下午5点生成
                weekCreateDay.setHours(17, 0, 0)

                // 本周生成时间
                let weekCreateDayTimestamp = weekCreateDay.getTime()

                // 本次周报开始时间
                let startTimestamp = 0
                // 本次周报结束时间
                let endTimestamp = 0

                let isThisWeek = true

                // 判断当前是否已经到了本周生成日期
                // 如果已经到了本周生成日期
                if (now >= weekCreateDayTimestamp) {
                    endTimestamp = weekCreateDayTimestamp
                    startTimestamp = weekCreateDayTimestamp - (1000 * 60 * 60 * 24 * 7)
                } else {
                    isThisWeek = false
                    endTimestamp = weekCreateDayTimestamp - (1000 * 60 * 60 * 24 * 7)
                    startTimestamp = endTimestamp - (1000 * 60 * 60 * 24 * 7)
                }

                return {
                    start: startTimestamp,
                    end  : endTimestamp,
                    isThisWeek
                }
            },
            getFinishTodoList() {
                return getFinishTodoList()
            },
            getTodoList() {
                return getTodoList()
            },
            format(timestamp) {
                return formatTimestamp(timestamp, 'all')
            }
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .weekly-container
        padding $space-base* 4
        color $secondary-font-color
        .weekly-title
            font-size $font-size-md
        .weekly-row
            margin-top $space-base* 4
            font-size $font-size-sm
        .weekly-row--sub
            margin-top $space-base* 2
            padding-left $space-base* 4
        .weekly-row__label
            display inline-block
            width 100px
        .weekly-row__content
            font-size $font-size-sm
        .weekly-row__count
            font-size $font-size-md
            font-weight 500
</style>
