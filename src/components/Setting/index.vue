<template>
    <div class="setting-container">
        <div class="setting__inner">
            <div class="setting__row">
                <span class="row__title__label">工时管理系统通知</span>
                <span class="row__title__content">
                    <el-switch v-model="form.managementSystemNotification"/>
                </span>
            </div>
            <!--工时填报提醒-->
            <div class="setting__row">
                <span class="row__title__label">工时填报提醒</span>
                <span class="row__title__content">
                    <el-switch v-model="form.timeFillingReminder"/>
                </span>
            </div>
            <template v-if="form.timeFillingReminder">
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">提醒时间</span>
                    <span class="row__title__content row__title__content--half">
                 <el-select v-model="form.timeFillingReminderDay">
                     <el-option
                             v-for="item in weekSelectOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                     />
                 </el-select>
                    <el-time-picker v-model="form.timeFillingReminderTime"/>
                </span>
                </div>
            </template>
            <!--任务开始提醒-->
            <div class="setting__row">
                <span class="row__title__label">任务开始提醒</span>
                <span class="row__title__content">
                    <el-switch v-model="form.itemStartReminder"/>
                </span>
            </div>
            <template v-if="form.itemStartReminder">
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">任务开始前</span>
                    <span class="row__title__content">
                         <el-input-number size="mini"
                                          v-model="form.itemStartReminderTime"
                                          step-strictly/>
                        分钟
                    </span>
                </div>
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">提醒间隔</span>
                    <span class="row__title__content">
                         <el-input-number size="mini"
                                          v-model="form.itemStartReminderInterval"
                                          step-strictly/>
                        分钟
                    </span>
                </div>
            </template>
            <!-- 任务结束提醒-->
            <div class="setting__row">
                <span class="row__title__label">任务到期提醒</span>
                <span class="row__title__content">
                    <el-switch v-model="form.itemEndReminder"/>
                </span>
            </div>
            <template v-if="form.itemEndReminder">
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">任务到期前</span>
                    <span class="row__title__content">
                         <el-input-number size="mini"
                                          v-model="form.itemEndReminderTime"
                                          step-strictly/>
                        分钟
                    </span>
                </div>
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">提醒间隔</span>
                    <span class="row__title__content">
                         <el-input-number size="mini"
                                          v-model="form.itemEndReminderInterval"
                                          step-strictly/>
                        分钟
                    </span>
                </div>
            </template>
            <!-- 周报生成-->
            <div class="setting__row">
                <span class="row__title__label">周报生成</span>
                <span class="row__title__content">
                    <el-switch v-model="form.weeklyCreate"/>
                </span>
            </div>
            <template v-if="form.weeklyCreate">
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">生成时间</span>
                    <span class="row__title__content row__title__content--half">
                 <el-select v-model="form.weeklyCreateDay">
                     <el-option
                             v-for="item in weekSelectOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                     />
                 </el-select>
                    <el-time-picker v-model="form.weeklyCreateTime"/>
                </span>
                </div>
                <div class="setting__row setting__row--sub">
                    <span class="row__title__label">显示方式</span>
                    <span class="row__title__content">
                        <el-select v-model="form.weeklyType">
                     <el-option
                             v-for="item in weeklyTypeOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                     />
                 </el-select>
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {
        Switch as ElSwitch,
        Select as ElSelect,
        Option as ElOption,
        TimePicker as ElTimePicker,
        InputNumber as ElInputNumber
    } from 'element-ui'
    import {getSetting, setSetting} from '@/utils/setting'
    import {sendMessage} from '@/utils/communication'
    import {DEFAULT_CONFIG} from '@config'

    export default {
        name      : "Setting",
        data() {
            return {
                weekSelectOptions: [
                    {
                        label: '周一',
                        value: 1
                    }, {
                        label: '周二',
                        value: 2
                    }, {
                        label: '周三',
                        value: 3
                    }, {
                        label: '周四',
                        value: 4
                    }, {
                        label: '周五',
                        value: 5
                    }, {
                        label: '周六',
                        value: 6
                    }, {
                        label: '周日',
                        value: 0
                    }],
                weeklyTypeOptions: [
                    {
                        label: '以标签分组',
                        value: 'tag'
                    }, {
                        label: '以时间分组',
                        value: 'time'
                    }],
                setting          : {},
                form             : {
                    // 项目管理系统 通知
                    managementSystemNotification: null,
                    // 工时填报提醒
                    timeFillingReminder         : null,
                    // 工时填报提醒日
                    timeFillingReminderDay      : null,
                    // 工时填报提醒时间
                    timeFillingReminderTime     : null,
                    // 任务开始提醒
                    itemStartReminder           : null,
                    // 任务开始前多少分钟提醒（分钟）
                    itemStartReminderTime       : null,
                    // 任务开始前提醒间隔（分钟）
                    itemStartReminderInterval   : null,
                    // 任务结束提醒
                    itemEndReminder             : null,
                    // 任务结束前多少分钟提醒
                    itemEndReminderTime         : null,
                    // 任务结束前提醒间隔（分钟）
                    itemEndReminderInterval     : null,
                    // 周报生成
                    weeklyCreate                : null,
                    // 周报生成日期
                    weeklyCreateDay             : null,
                    // 周报生成时间
                    weeklyCreateTime            : null,
                    // 周报显示方式
                    weeklyType                  : null
                }
            }
        },
        mounted() {
            this.init()
        },
        watch     : {
            form   : {
                handler(val) {
                    let cloneVal = {...val}
                    const {weeklyCreateTime, timeFillingReminderTime} = cloneVal

                    if (weeklyCreateTime && timeFillingReminderTime) {
                        cloneVal.weeklyCreateTime = [weeklyCreateTime.getHours(), weeklyCreateTime.getMinutes(), weeklyCreateTime.getSeconds()]
                        cloneVal.timeFillingReminderTime = [timeFillingReminderTime.getHours(), timeFillingReminderTime.getMinutes(), timeFillingReminderTime.getSeconds()]
                        this.setSetting(cloneVal)
                    }

                },
                deep: true
            },
            setting: {
                handler(val = {}) {
                    let cloneVal = val ? {...val} : {}
                    let {timeFillingReminderTime, weeklyCreateTime} = cloneVal
                    cloneVal.weeklyCreateTime = new Date(2020, 1, 19, weeklyCreateTime[0], weeklyCreateTime[1], weeklyCreateTime[2])
                    cloneVal.timeFillingReminderTime = new Date(2020, 1, 19, timeFillingReminderTime[0], timeFillingReminderTime[1], timeFillingReminderTime[2])
                    this.form = cloneVal
                },
                deep: true
            }
        },
        methods   : {
            init() {
                const setting = this.getSetting() || {}
                this.setting = {...DEFAULT_CONFIG, ...setting}
            },
            getSetting() {
                return getSetting()
            },
            setSetting(setting) {
                setSetting(setting)
                sendMessage({updateSetting: true})
            }
        },
        components: {
            ElSwitch,
            ElSelect,
            ElOption,
            ElTimePicker,
            ElInputNumber
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"

    .setting-container
        padding $space-base* 4
        position relative
        .el-select
        .el-date-editor
            width 220px !important
            padding-bottom $space-base
            &:not(:last-child)
                margin-right $space-base

    .setting__row
        display flex
        &:not(:first-child)
            margin-top $space-base* 4
        &.setting__row--sub
            padding-left $space-base* 4
            .row__title__label
                width 120px - $space-base* 4
                text-align right
                flex 0 0 (120px - $space-base* 4)
        .row__title__label
            margin-right $space-base
            color $secondary-font-color
            font-size $font-size-xs
            white-space nowrap
            width 120px
            flex 0 0 120px
        .row__title__content
            &.row__title__content--half
                display flex
                flex-wrap wrap
</style>
