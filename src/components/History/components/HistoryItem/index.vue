<template>
    <div class="history-item">
        <h3 class="history-item__title">{{data.title}}</h3>
        <p class="history-item__tag" v-if="data.tag">
             <span class="history-item__prev">
                     <i class="history-item_icon iconfont icon-tag"></i>
                </span>
            <span>{{data.tag}}</span></p>
        <p class="history-item__content" v-if="data.content">{{data.content}}</p>
        <p class="history-item__useTime" v-if="useTime">用时:{{useTime}}</p>
    </div>
</template>

<script>
    import formatDuring from '@utils/formatDuring'

    export default {
        name    : "HistoryItem",
        props   : {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            useTime() {
                const {data} = this
                const {finishTime, actualStartTime} = data || {}
                if (finishTime && actualStartTime) {
                    const useTime = finishTime - actualStartTime
                    return formatDuring(useTime)
                }
                return null
            }
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"

    .history-item
        &:not(:first-child)
            margin-top $space-base* 4
        .history-item__title
            font-size $font-size-sm
            color $primary-font-color
            font-weight 500
        .history-item__tag
            margin-top ($space-base/ 2)
            color $primary-font-color
            font-size $font-size-xs
            font-weight 400
        .history-item__content
            margin-top ($space-base/ 2)
            color $secondary-color
            font-size $font-size-mn
            font-weight 400
        .history-item__useTime
            margin-top ($space-base/ 2)
            color $secondary-color
            font-size $font-size-mn
            font-weight 400
        .todo-item__icon
            font-size $font-size-sm
            margin-right $space-base
</style>
