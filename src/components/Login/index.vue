<template>
    <div class="login-content">
        <div class="login-box" @keyup.enter="handleLogin">
            <h2 class="login-box__title">ENESYS 项目管理系统</h2>
            <el-form
                    :model="loginForm"
                    :rules="rules"
                    ref="loginForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName"
                              placeholder="用户名"
                              autocomplete="off">
                        <template slot="prefix">
                            <img class="form-icon" src="~@images/username.svg"/>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                              type="password"
                              placeholder="密码"
                              autocomplete="off">
                        <template slot="prefix">
                            <img class="form-icon" src="~@images/password.svg"/>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item class="button-box" :error="netWorkErrorMessage">
                    <el-button type="primary" class="login-button" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {loginByUserName, getUserInfo} from '@service'
    import loading from '@mixins/loading'
    import encryption from '@utils/encryption'
    import {removeToken, setToken} from '@utils/auth'

    export default {
        name   : 'Login',
        mixins : [loading],
        data() {
            return {
                loginForm          : {
                    userName        : '',
                    password        : '',
                    verificationCode: '',
                    // session 有效期
                    isApp           : true
                },
                rules              : {
                    userName: [
                        {required: true, message: '请输入账户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },// 表单验证规则
                netWorkErrorMessage: '', // 错误信息
                redirect           : ''// 跳转路径
            }
        },
        mounted() {
            // 生成验证码
            // this.createVerification()
        },
        methods: {
            /**
             * 登录
             */
            handleLogin() {
                // 清空历史错误记录
                this.netWorkErrorMessage = ''
                this.$refs['loginForm'].validate(async (valid) => {
                    if (valid) {
                        this.loading = true
                        try {
                            await this.loginByUserName(this.loginForm)
                            global.location.reload()
                        } catch (e) {
                            this.netWorkErrorMessage = (e.message).replace('Error:', '')
                        } finally {
                            this.loading = false
                        }
                    }
                })
            },
            /**
             * 登录
             * @param commit
             * @param loginInfo
             * @returns {Promise<void>}
             */
            async loginByUserName(loginInfo) {
                try {
                    // 获取账号密码信息
                    const {password} = loginInfo
                    let newUserInfo = {...loginInfo}
                    // 加密后密码
                    newUserInfo.password = encryption(password || '')
                    // 发送登录请求
                    let {data, status} = await loginByUserName(newUserInfo)
                    // 验证是否请求正常
                    if (status === 'success') {
                        let accessToken = data
                        setToken(accessToken)
                        await this.getUserInfo(data)

                    } else {
                        throw new Error(data.msg)
                    }
                } catch (e) {
                    throw new Error(e)
                }
            },
            /**
             * 获取用户信息
             * @param commit
             * @param state
             * @returns {Promise<void>}
             */
            async getUserInfo(token) {
                try {
                    // 获取token
                    const {menus, ...userInfo} = await getUserInfo(token)
                    global.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                } catch (e) {
                    removeToken()
                    throw e
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .login-content
        position: relative

    .login-box
        padding 24px
        padding-top 33px
        background-color $primary-background-color
        box-shadow 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05)
        width 314px
        box-sizing border-box
        .login-box__title
            font-size $font-size-sm
            color $accent-font-color
            padding-bottom 33px

    .form-icon
        height 15px

    .refresh
        margin-right 5px
        width 15px
        img
            width 15px

    .button-box
        .el-form-item__content
            display: flex
        .login-button
            flex-grow 1

    ///*.login-button*/
    /*.register-button*/
    /*flex-grow 1*/
    /*color #fff*/

    /*.
        .login-button
            background-color $accent-color
            */

    /*.register-button*/
    /*background-color #71D0EB*/
</style>
