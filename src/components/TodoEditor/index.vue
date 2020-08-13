<template>
    <div class="todo-editor">
        <div class="todo-editor__inner">
            <div class="todo-editor__title">
                 <span class="todo-editor__title__prev">
                     <i class="todo-editor__icon iconfont"
                        :class="starClass"
                        @click="handleStarClick"
                     ></i>
                </span>
                <md-input placeholder="标题" v-model="title" @blur="handleTitleBlur"/>
            </div>
            <div class="todo-editor__tag">
                 <span class="todo-editor__tag__prev">
                     <i class="todo-editor__icon iconfont icon-tag"
                     ></i>
                </span>
                <md-input placeholder="标签" v-model="tag" @blur="handleTagBlur"/>
            </div>
            <div class="todo-editor__clock-list">
                 <span class="todo-editor__tag__prev">
                     <i class="todo-editor__icon iconfont icon-time"
                     ></i>
                </span>
                <div>
                    <div class="clock-item">
                        <p class="clock-item__label">执行日期</p>
                        <div class="clock-item__content">
                            <date-picker type="datetime"
                                         v-model="doDate"
                                         placeholder="请选择执行日期"
                                         value-format="timestamp"
                            />
                        </div>
                    </div>
                    <div class="clock-item">
                        <p class="clock-item__label">到期日期</p>
                        <div class="clock-item__content">
                            <date-picker type="datetime"
                                         v-model="dueDate"
                                         placeholder="请选择到期日期"
                                         value-format="timestamp"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo-editor__content">
                <template v-if="showTextArea">
                    <el-input ref="contentTextArea"
                              type="textarea"
                              :autosize="{minRows:4}"
                              resize="none"
                              v-model="content"
                              placeholder="开始内容描述吧…"
                    />
                    <div class="todo-editor__content__button-box">
                        <el-button type="primary" @click="handleContentTextAreaSave">保存</el-button>
                        <el-button type="text" @click="handleContentTextAreaClose"><i class="el-icon-close"></i>
                        </el-button>
                    </div>
                </template>

                <div class="todo-editor__content__text" v-else @click="handleContextTextBoxClick">
                    {{content||'开始内容描述吧…'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {DatePicker, Input as ElInput, Button as ElButton} from 'element-ui'
    import MdInput from '../MdInput'

    export default {
        name      : "TodoItemEditor",
        props     : {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                title       : '',
                tag         : '',
                doDate      : '',
                dueDate     : '',
                content     : '',
                showTextArea: false
            }
        },
        computed  : {
            starClass() {
                const {star} = this.data
                return star ? 'icon-star-full' : 'icon-star'
            }
        },
        watch     : {
            data: {
                handler(val) {
                    const {title, tag, doDate, dueDate, content} = val
                    this.title = title || ''
                    this.tag = tag || ''
                    this.doDate = doDate || ''
                    this.dueDate = dueDate || ''
                    this.content = content || ''
                },
                immediate: true,
                deep     : true
            },
            doDate(val, old) {
                const {id, dueDate} = this.data
                if (dueDate) {
                    if (val && val > dueDate) {
                        this.doDate = old
                        return
                    }

                }
                this.$emit('change', {
                    id, params: {
                        doDate: val
                    }
                })

            },
            dueDate(val, old) {
                const {id, doDate} = this.data
                // 如果存在执行日期
                if (doDate) {
                    if (val && val < doDate) {
                        this.dueDate = old
                        return
                    }
                }
                this.$emit('change', {
                    id, params: {
                        dueDate: val
                    }
                })

            }
        },
        methods   : {
            handleStarClick() {
                const {id, star} = this.data
                this.$emit('change', {
                    id, params: {
                        star: !star
                    }
                })
            },
            handleTitleBlur() {
                let {title, data = {}} = this
                title = (title + '').trim()
                if (title) {
                    const id = data.id
                    this.$emit('change', {
                        id,
                        params: {
                            title
                        }
                    })
                } else {
                    this.title = data.title || ''
                }
            },
            handleTagBlur() {
                let {tag, data = {}} = this
                tag = (tag + '').trim()
                const id = data.id
                this.$emit('change', {
                    id,
                    params: {
                        tag
                    }
                })
            },
            handleContextTextBoxClick() {
                this.showTextArea = true
                this.$nextTick(() => {
                    this.$refs.contentTextArea.focus()
                })
            },
            handleContentTextAreaSave() {
                let {content} = this
                content = (content + '').trim()
                const {id} = this.data
                this.$emit('change', {
                    id, params: {
                        content
                    }
                })
                this.showTextArea = false
            },
            handleContentTextAreaClose() {
                this.showTextArea = false
                this.content = this.data.content || ''
            },
            handleCloseClick() {
                this.$emit('close')
            }
        },
        components: {
            MdInput,
            DatePicker,
            ElInput,
            ElButton
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"

    .todo-editor
        padding $space-base* 4
        position relative
        .todo-editor__icon
            font-size $font-size-sm
            margin-right $space-base
        .todo-editor__title
        .todo-editor__tag
        .todo-editor__color-list
            margin-top 0
            .material-input__component
                margin-top 0
                flex 1
            .material-input
                padding 0
                border-bottom 1px solid transparent
                font-size $font-size-lg
                color $secondary-font-color
                &::-webkit-input-placeholder
                    color $secondary-font-color
                &::-moz-placeholder
                    color $secondary-font-color
                &::-ms-input-placeholder
                    color $secondary-font-color
            .todo-editor__title__prev
                display flex
                vertical-align middle
            .todo-editor__icon
                display inline-block
                color $secondary-font-color
                line-height $font-size-lg
                cursor pointer
                &.icon-star
                    &:hover:before
                        content "\e697"
                &.icon-star-full
                    &:hover:before
                        content "\e69b"
        .todo-editor__title
            display flex
            color $secondary-font-color
            font-size $font-size-lg
            font-weight 500
        .todo-editor__tag
            display flex
            margin-top $space-base* 2
            color $secondary-font-color
            font-size $font-size-sm
            font-weight 400
            .material-input
                font-size $font-size-sm
            .todo-editor__icon
                line-height $font-size-sm
        .todo-editor__clock-list
            display flex
            margin-top $space-base* 2
            color $secondary-font-color
            font-size $font-size-sm
            font-weight 400
            .todo-editor__icon
                line-height 1
        .clock-item
            position relative
            &:not(:last-child)
                margin-bottom $space-base
            .clock-item__label
                font-size $font-size-xs
            .clock-item__content
                position relative
                margin-top ($space-base/ 2)
        .todo-editor__content
            margin-top $space-base* 2
        .todo-editor__content__text
            border-radius 4px
            background-color $secondary-color-5
            min-height 96px
            padding 5px 15px
            color $secondary-font-color-2
            font-size $font-size-xs
            cursor pointer
        .todo-editor__content__button-box
            margin-top $space-base
        .el-input__inner
            color $secondary-font-color
</style>
