export default {
    data() {
        return {
            loading         : false,
            loadingComponent: null
        }
    },
    watch: {
        loading: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.loadingComponent && this.loadingComponent.close()
                    this.loadingComponent = this.$loading({
                        lock      : true,
                        background: 'rgba(255, 255, 255, 0.7)',
                        target    : this.$refs['loading-wapper-box']
                    });
                } else {
                    this.loadingComponent && this.loadingComponent.close()
                    this.loadingComponent = null
                }
            }
        }
    }
}
