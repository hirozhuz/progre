<template>
    <div class="tab-view">
        <scrollbar>
            <div class="tab-view__inner">
                <index/>
            </div>
        </scrollbar>
    </div>
</template>

<script>
    import Scrollbar from '@components/Scrollbar'
    import Index from './views/Index'

    export default {
        name      : "Tab",
        components: {
            Scrollbar,
            Index
        }
    }
</script>

<style lang="stylus">
    .tab-view
        position relative
        width 100%
        height 100%
        overflow hidden

    .tab-view__inner
        position relative

</style>
