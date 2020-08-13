<template>
    <div class="popup-view">
        <component :is="componentName"/>
    </div>
</template>

<script>
    import Login from '@components/Login'
    import UserInfoPanel from '@components/UserInfoPanel'

    export default {
        data() {
            return {
                componentName: ''
            }
        },
        mounted() {
            if (this.getUserInfo()) {
                this.componentName = 'UserInfoPanel'
            } else {
                this.componentName = 'Login'
            }
        },
        methods   : {
            getUserInfo() {
                return global.localStorage.getItem('userInfo')
            }
        },
        components: {
            Login,
            UserInfoPanel
        }
    }
</script>

<style lang="stylus">
    *
        margin 0
        padding 0

</style>
