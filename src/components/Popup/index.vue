<template>
    <div class="popup__wrapper">
        <div class="popup-box__mask"></div>
        <div class="popup__box__wrapper" @click="handleMaskClick">
            <div class="popup-box" @click.stop="handlePopupClick">
                <el-button class="popup-box__close-button"
                           type="text"
                           @click="handleCloseClick"
                >
                    <i class="el-icon-close"></i>
                </el-button>
                <div class="popup-box__inner">
                    <scrollbar>
                        <slot></slot>
                    </scrollbar>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import {Button as ElButton} from 'element-ui'
    import Scrollbar from '@components/Scrollbar'

    export default {
        name      : "Popup",
        methods   : {
            handleMaskClick() {
                this.$emit('close')
            },
            handleCloseClick(){
                this.$emit('close')
            },
            handlePopupClick() {
            }
        },
        components: {
            Scrollbar,
            ElButton
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .popup__wrapper
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        .popup__box__wrapper
            position fixed
            z-index 2001
            left 0
            right 0
            top 0
            bottom 0
            text-align center
            vertical-align middle
            &:after
                content ""
                display inline-block
                height 100%
                width 0
                vertical-align middle
        .popup-box__mask
            position absolute
            left 0
            right 0
            top 0
            bottom 0
            z-index 2000
            background-color rgba(0, 0, 0, .5)
        .popup-box
            position relative
            display inline-block
            vertical-align middle
            width 60%
            height 80%
            text-align left
            overflow hidden
            background-color $secondary-color-4
            border-radius 8px
            max-height 60%
            max-width 60%
            .popup-box__close-button
                position absolute
                right $space-base
                font-size $font-size-md
                top 0
                z-index 1
            .popup-box__inner
                position absolute
                left 0
                right 0
                top 0
                bottom 0
</style>
