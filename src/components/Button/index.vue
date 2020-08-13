<template>
    <button class="progre-button" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name   : "Button",
        methods: {
            handleClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="stylus">
    @import "~@styles/varibles.styl"
    .progre-button
        padding $space-base
        background-color transparent
        border-radius 50%
        border none
        cursor pointer
        outline none
        transition background-color ease-in .3s
        &:hover
            background-color $accent-color
</style>
