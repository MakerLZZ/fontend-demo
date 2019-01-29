<template>
    <div class="app-home-page">
        <mt-header title="途强在线">
            <mt-button
                slot="right"
            >
                <img
                    src="../assets/image/more.png"
                    width="80"
                    alt="more"
                >
            </mt-button>
            
        </mt-header>
        <ul v-if="showMenu">
            <router-link
                to="/order"
                tag="li"
            >
                <div>
                    <mt-cell
                        title="订单记录"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/order.png"
                            width="24"
                            alt="order"
                        >
                    </mt-cell>
                </div>
            </router-link>
            <router-link
                to="/set"
                tag="li"
            >
                <div>
                    <mt-cell
                        title="设置"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/set-color.png"
                            width="24"
                            alt="set"
                        >
                    </mt-cell>
                </div>
            </router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    created() {
        this.isShowMenu(this.$route.path);
    },
    data() {
        return {
            showMenu: true
        };
    },
    watch: {
        $route(to){
            this.isShowMenu(to.path);
        }
    },
    methods: {
        /**
         * 显示隐藏菜单
         */
        isShowMenu(path) {
            path === '/' ? this.showMenu = true : this.showMenu = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.app-home-page {
    display: flex;
    flex-flow: column;
    height: 100%;
    background: #eee;

    .mint-header {
        height: 3.3rem;
        font-size: 1.6rem;
        color: #000;
        background-color: #fff;
    }

    > ul {
        margin: 0;
        padding: 0;
        list-style: none;

        > li {
            > div {
                margin: 1rem 0;
            }
        }
    }
}
</style>
