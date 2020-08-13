<template>
    <div>
        <div class="user-info-panel">
            <div class="user-info-panel__header">
                <el-avatar class="user-info-panel__avatar"
                           :size="36"
                           :src="formatAvatar(userInfo.photoUrl)"
                >
                    <img src="/avatar/avatar.jpg"/>
                </el-avatar>
                <div class="user-info-panel__title">
                    <div class="user-info-panel__name">{{userInfo.staffName}}</div>
                    <div class="user-info-panel__dept-name">{{userInfo.deptName}}</div>
                </div>
            </div>
            <div class="user-info-panel__item">
                <el-button type="text" @click="handleLogOutClick">退出登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {BASE_URL} from '@/config'
    import {Avatar as ElAvatar} from 'element-ui'
    import {removeToken} from '@/utils/auth'

    export default {
        name      : "UserInfoPanel",
        data() {
            return {
                userInfo: {}
            }
        },
        mounted() {
            this.getUserInfo()
        },
        methods   : {
            formatAvatar(url) {
                return `${BASE_URL}/operation/${url}`
            },
            getUserInfo() {
                const userInfo = global.localStorage.getItem('userInfo')
                console.log(userInfo)
                if (userInfo) {
                    try {
                        this.userInfo = JSON.parse(userInfo)
                    } catch (e) {
                        this.handleLogOutClick()
                    }
                } else {
                    this.handleLogOutClick()
                }
            },
            handleLogOutClick() {
                removeToken()
                global.location.reload()
            }
        },
        components: {
            ElAvatar
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .user-info-panel
        width 160px
        background $primary-background-color
        .user-info-panel__header
            display flex
            margin-bottom $space-base
            padding $space-base* 2 $space-base* 2 $space-base
            border-bottom 1px solid $secondary-color
            background-color $primary-background-color
            cursor pointer
            transition background-color .3s
            &:hover
                background-color $accent-color
        .user-info-panel__avatar
            width 36px
        .user-info-panel__title
            flex 1
            margin-left $space-base
        .user-info-panel__name
            line-height 1.3
            font-size $font-size-sm
            color $accent-font-color
        .user-info-panel__dept-name
            line-height 1.3
            font-size $font-size-xs
            color $primary-font-color
        .user-info-panel__item
            text-align center
            &:hover
                background-color $accent-color
</style>
