<template>
    <div class="todo-item">
        <p class="todo-item__useTime" v-if="useTime">{{useTime}}</p>
        <div class="todo-item__tool-box">
            <!-- 任务开始-->
            <i class="todo-item__tool-button iconfont icon-start"
               v-if="!data.actualStartTime"
               @click.stop="handleStartClick"
            ></i>
            <!-- 任务结束-->
            <i class="todo-item__tool-button iconfont icon-finish" @click.stop="handleFinishClick"></i>
            <!-- 任务删除-->
            <i class="todo-item__tool-button  iconfont icon-delete" @click.stop="handleDeleteClick"></i>
        </div>
        <div class="todo-item__inner" @click="handleClick">
            <h3 class="todo-item__title">
                <span class="todo-item__title__prev">
                     <i class="todo-item__icon iconfont"
                        :class="starClass"
                        @click.stop="handleStarClick"
                     ></i>
                </span>
                <span>{{data.title}}</span>
            </h3>
            <p class="todo-item__tag"
               v-if="data.tag"
            >
                <i class="todo-item__icon iconfont icon-tag"></i>
                {{data.tag}}
            </p>
            <div class="todo-item__time"
                 v-if="showTime"
            >
                <span class="todo-item__prev">
                       <i class="todo-item__icon iconfont icon-time"></i>
                </span>
                <div class="todo-item__time__content">
                    <div class="clock-item" v-if="data.doDate">
                        <p class="clock-item__label">执行日期</p>
                        <div class="clock-item__content">
                            {{formatDate(data.doDate)}}
                        </div>
                    </div>
                    <div class="clock-item" v-if="data.dueDate">
                        <p class="clock-item__label">到期日期</p>
                        <div class="clock-item__content">
                            {{formatDate(data.dueDate)}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo-item__content"
                 v-if="data.content">
                {{data.content}}
            </div>
            <div class="todo-item__progress-bar" v-if="showProgress">
                <div class="progress-bar__inner">
                    <div class="progress-bar__bar" :style="{width:`${progress}%`}"></div>
                </div>
                <span class="progress-bar__label">{{progress}}%</span>
            </div>
        </div>
    </div>
</template>

<script>
    import formatDuring from '@utils/formatDuring'
    import formatTimestamp from '@/utils/formatTimestamp'

    export default {
        name    : "ProgressItem",
        props   : {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                useTime : '',
                interval: null,
                progress: 0
            }
        },
        mounted() {
            this.init()
        },
        computed: {
            showTime() {
                const {doDate, dueDate} = this.data || {}
                return doDate || dueDate
            },
            showProgress() {
                const {doDate, dueDate} = this.data || {}
                return doDate && dueDate
            },
            starClass() {
                const {star} = this.data
                return star ? 'icon-star-full' : 'icon-star'
            }
        },
        watch   : {
            data() {
                this.init()
            }
        },
        methods : {
            init() {
                const {actualStartTime} = this.data

                if (actualStartTime || this.showProgress) {
                    clearInterval(this.interval)
                    this.interval = setInterval(() => {
                        this.computeUseTime()
                        this.computeProgress()
                    }, 1000)
                }
            },
            computeUseTime() {
                const {actualStartTime} = this.data
                let useTime = ''
                if (actualStartTime) {
                    const now = new Date().getTime()
                    const use = now - actualStartTime || 0
                    useTime = formatDuring(use)
                    // console.log(useTime, use)
                }
                this.useTime = useTime
            },
            computeProgress() {
                const {doDate, dueDate} = this.data || {}
                if (doDate && dueDate) {
                    const now = new Date().getTime()
                    if (now <= doDate) {
                        this.progress = 0
                    } else if (now >= dueDate) {
                        this.progress = 100
                    } else {
                        const total = dueDate - doDate || 0
                        const current = now - doDate || 0

                        this.progress = ((current / total) * 100 || 0).toFixed(2)
                    }
                } else {
                    this.progress = 0
                }
            },
            handleDeleteClick() {
                this.$emit('delete', this.data)
            },
            handleStarClick() {
                const {id, star} = this.data
                this.$emit('change', {
                    id, params: {
                        star: !star
                    }
                })
            },
            handleStartClick() {
                const {id} = this.data
                const now = new Date().getTime()
                this.$emit('change', {
                    id, params: {
                        actualStartTime: now
                    }
                })
            },
            handleFinishClick() {
                const {id} = this.data
                const now = new Date().getTime()
                this.$emit('finish', {
                    id,
                    params: {
                        finishTime: now
                    }
                })
            },
            handleClick() {
                this.$emit('click', this.data)
            },
            formatDate(timestamp) {
                if (timestamp) {
                    return formatTimestamp(timestamp, 'all')
                }
                return ''
            }
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .todo-item
        position relative
        padding $space-base* 4
        margin-bottom $space-base* 4
        background-color $primary-color
        border-radius 8px
        cursor pointer
        overflow hidden
        transition background-color ease-in .3s
        &:hover
            background-color $accent-color
            .todo-item__tool-box
                transform translateY(0)
        .todo-item__icon
            font-size $font-size-sm
            margin-right $space-base
        .todo-item__inner
            position relative
        .todo-item__useTime
            padding 5px
            position absolute
            left $space-base
            top 0
            font-size $font-size-mn
            color $accent-font-color
            line-height $font-size-sm
        .todo-item__tool-box
            z-index 1
            position absolute
            top 0
            right 0
            transform translateY(-100%)
            transition transform ease-in-out .3s
        .todo-item__tool-button
            display inline-block
            padding 5px
            color $dark-font-color
            font-size $font-size-sm
            transition color ease-in .3s
            &:hover
                color $accent-font-color
        .todo-item__title
            display flex
            color $accent-font-color
            font-weight 500
            font-size $font-size-md
            .todo-item__icon
                display inline-block
                color $accent-font-color
                line-height $font-size-md
                &.icon-star
                    &:hover:before
                        content "\e697"
                &.icon-star-full
                    &:hover:before
                        content "\e69b"
        .todo-item__time
        .todo-item__tag
            display flex
            align-items baseline
            color $primary-font-color
            font-size $font-size-sm
            font-weight 400
            margin-top $space-base
        .todo-item__time
            .todo-item__time__content
                margin - $space-base
                flex 1
                display flex
                flex-wrap wrap
            .clock-item
                padding $space-base
            .clock-item__label
                font-size $font-size-mn
            .clock-item__content
                font-size $font-size-sm
                color $accent-font-color
        .todo-item__content
            margin-top $space-base
            font-size $font-size-xs
            color $accent-font-color
        .todo-item__progress-bar
            position relative
            margin-top $space-base* 3
            width 100%
            height 16px
            border-radius 8px
            background-color $secondary-color-2
            .progress-bar__inner
                width 100%
                height 16px
            .progress-bar__bar
                width 0
                height 16px
                background-color $secondary-color
                border-radius 8px
                transition width ease-in .3s
            .progress-bar__label
                position absolute
                left $space-base
                top 0
                height 16px
                line-height 16px
                font-size $font-size-sm
                font-weight 600
                color $primary-color

</style>
