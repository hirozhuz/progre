<template>
    <h1 class="welcome-title">
        <el-avatar class="welcome-title__avatar"
                   :size="48"
                   :src="formatAvatar(userInfo.photoUrl)"
        >
            <img src="/avatar/avatar.jpg"/>
        </el-avatar>
        <span class="welcome-title__words">{{hello}},{{words}}.</span>
    </h1>
</template>

<script>
    import {BASE_URL, callList, chickenSoupList} from '@/config'
    import {Avatar as ElAvatar} from 'element-ui'

    export default {
        name      : "Welcome",
        data() {
            return {
                userInfo: {}
            }
        },
        computed  : {
            hello() {
                const len = callList.length
                const rand = Math.floor(Math.random() * len)
                return callList[rand] || ''
            },
            words() {
                const len = chickenSoupList.length
                const rand = Math.floor(Math.random() * len)
                return chickenSoupList[rand]
            }
        },
        methods   : {
            formatAvatar(url) {
                return `${BASE_URL}/operation/${url}`
            }
        },
        components: {
            ElAvatar
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .welcome-title
        line-height 50px
        margin-bottom 36px
        display flex
        align-items start

    .welcome-title__avatar
        margin-right $space-base* 2

    .welcome-title__words
        flex 1
        font-size $font-size-xl
        color $accent-font-color
        font-weight 500
        margin-left $space-base
</style>
