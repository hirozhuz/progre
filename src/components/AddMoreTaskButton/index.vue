<template>
    <div class="add-more-task-button" @click="handleClick">
        <input class="add-more-task-button__input"
               ref="input"
               v-model="todoTitle"
               v-show="showInput"
               @blur="handleInputBlur"
               @keyup.enter="handleInputEnter"
        />
        <span class="add-more-task-button__text" v-show="!showInput">添加你的待办事项...</span>
    </div>
</template>

<script>
    export default {
        name   : "AddMoreTaskButton",
        data() {
            return {
                showInput: false,
                todoTitle: ''
            }
        },
        mounted() {
        },
        methods: {
            handleClick() {
                this.showInput = true
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            },
            handleInputBlur() {
                this.showInput = false
            },
            handleInputEnter() {
                let title = this.todoTitle || ''
                title = (title + '').trim()
                if (title) {
                    this.todoTitle = ''
                    this.$emit('add', {title})
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .add-more-task-button
        position relative
        margin-bottom $space-base* 4
        padding $space-base* 2
        background-color $primary-color
        border-radius 8px
        cursor pointer
        transition background-color ease-in .3s
        &:hover
            background-color $accent-color
        .add-more-task-button__input
            width 100%
            font-size $font-size-sm
            color $accent-font-color
            background-color transparent
            border none
            outline none
            height 22px
        .add-more-task-button__text
            width 100%
            white-space nowrap
            font-size $font-size-sm
            color $accent-font-color
</style>
