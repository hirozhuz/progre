<template>
    <scrollbar ref="scrollbar" view-class="scrollbar__container" wrap-class="scrollbar__wrapper" :noresize="false">
        <slot></slot>
    </scrollbar>
</template>

<script>
    import Scrollbar from 'element-ui/lib/scrollbar'

    export default {
        name      : "index",
        props     : ['data'],
        components: {
            Scrollbar
        },
        mounted() {
            window.addEventListener('resize', this.update, false)
        },
        methods   : {
            update() {
                this.$refs.scrollbar.update()
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.update, false)
        },
        watch     : {
            data() {
                this.$nextTick(() => {
                    this.update()
                })

            }
        }
    }
</script>

<style lang="stylus">
    .el-scrollbar
        height 100%
        width 100%

    .scrollbar__wrapper
        overflow-x hidden
</style>
