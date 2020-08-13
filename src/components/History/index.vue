<template>
    <div class="history-container">
        <el-button class="history-container__close-button"
                   type="text"
                   @click="handleCloseClick"
        >
            <i class="el-icon-close"></i>
        </el-button>
        <scrollbar>
            <div class="history-inner">
                <el-timeline>
                    <el-timeline-item v-for="group in history"
                                      :key="group.label"
                                      :timestamp="group.label"
                                      placement="top"
                    >
                        <history-item v-for="item in group.data"
                                      :key="item.id"
                                      :data="item"
                        />
                    </el-timeline-item>
                </el-timeline>
            </div>
        </scrollbar>
    </div>
</template>

<script>
    import {Timeline as ElTimeline, TimelineItem as ElTimelineItem, Button as ElButton} from 'element-ui'
    import Scrollbar from '@components/Scrollbar'
    import HistoryItem from './components/HistoryItem'
    import {getFinishTodoList} from '@/utils/todoList'
    import formatTimestamp from '@/utils/formatTimestamp'


    export default {
        name      : "History",
        data() {
            return {
                data: []
            }
        },
        mounted() {
            this.data = getFinishTodoList()
        },
        computed  : {
            history() {
                const {data} = this
                let dataList = {}
                let history = []
                data.forEach((item) => {
                    const {finishTime} = item
                    if (finishTime) {
                        let day = formatTimestamp(finishTime, 'default')
                        if (dataList[day]) {
                            dataList[day].push(item)
                        } else {
                            dataList[day] = [item]
                        }
                    }
                })


                Object.keys(dataList).forEach((key) => {
                    let list = dataList[key] || []
                    list = list.sort((prev, now) => {
                        return now.finishTime > prev.finishTime ? 1 : -1
                    })
                    const timestamp = new Date(key).getTime()
                    history.push({label: key, data: list, timestamp})
                })

                console.log(history.sort((prev, now) => {
                    return now.timestamp > prev.timestamp ? 1 : -1
                }))
                return history.sort((prev, now) => {
                    return now.timestamp > prev.timestamp ? 1 : -1
                })
            }
        },
        methods   : {
            getFinishTodoList() {
                return getFinishTodoList()
            },
            handleCloseClick() {
                this.$emit('close')
            }
        },
        components: {
            ElTimeline,
            ElTimelineItem,
            Scrollbar,
            HistoryItem,
            ElButton
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .history-container
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        background-color $primary-color
        &:before
            content " "
            height 100%
            width 2px
            background-color $secondary-color
            position absolute
            top 0
            bottom 0
            left 30%
            margin-left 4px
        .history-container__close-button
            position absolute
            right $space-base
            font-size $font-size-md
            color $primary-font-color
            top 0
            z-index 1
        .history-inner
            width 40%
            margin 0 auto
            padding 60px
        .el-timeline-item__timestamp
            font-size $font-size-md
            color $accent-font-color
        .el-timeline-item__node
            background-color $secondary-color
            top 10px
        .el-timeline-item__tail
            height 0

    // .

    // $secondary-color
</style>
