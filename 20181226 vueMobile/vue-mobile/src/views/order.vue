<template>
    <div class="app-order-page">
        <mt-header title="订单记录">
            <router-link
                to="/"
                slot="left"
            >
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <main class="main">
            <mt-search
                v-model="value"
                cancel-text="取消"
                placeholder="搜索"
            >
            </mt-search>
            <div class="order-list-box">
                <ul
                    class="order-list"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    :infinite-scroll-immediate-check="true"
                    infinite-scroll-distance="10"
                >
                    <li
                        v-for="(item, key) in showList"
                        :key="key"
                    >
                        <div class="order-box">
                            <div class="order-head">
                                <span>订单号：{{item.orderId}}</span><span class="order-body-cond">{{item.orderCond}}</span>
                            </div>
                            <div class="order-body">
                                <div>
                                    <div class="order-body-img">
                                    </div>
                                    <div class="order-body-detail">
                                        <span class="order-weight">{{item.type}}</span>
                                        <span>{{item.price}}</span>
                                    </div>
                                </div>
                                <span>{{item.num}}</span>
                            </div>
                            <div class="order-foot">
                                <span>{{item.date}}</span>
                                <span class="order-weight">￥{{(item.num * item.price).toFixed(2)}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div
                    class="loading-box"
                    v-if="loading"
                >
                    <mt-spinner
                        class="loading-more"
                        type="fading-circle"
                    ></mt-spinner>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            loading: true,
            orderList: [],
            showList: []
        };
    },
    watch:{
        value: function () {
            this.handleSearch();
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        /**
         * 加载数据
         */
        loadData() {
            this.$axios.get('/get_order_list').then(res => {
                this.orderList = [...this.orderList,...res.data.data];
                this.showList = this.orderList;
                this.loading = false;
            }).catch(err => {
                alert.log(err);
            });
        },
        /**
         * 加载更多数据
         */
        loadMore() {
            this.loading = true;
            this.loadData();
        },
        /**
         * 处理查询事件
         */
        handleSearch() {
            if(!this.value){
                this.loadData();
            }
            if(this.value){
                let newDataList = [];
                this.orderList.forEach(element => {
                    if(element.orderId.search(this.value) !== -1){
                        newDataList.push(element);
                    }
                });
                this.showList = [...newDataList];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.app-order-page {
    display: flex;
    flex-flow: column;
    flex: 1;

    .mint-header {
        height: 3.3rem;
        font-size: 1.6rem;
        color: #000;
        background-color: #fff;
    }

    .main {
        display: flex;
        flex-flow: column;
        flex: 1;

        .mint-search {
            height: 4.3rem;
        }

        .mint-searchbar {
            background-color: #eee;
        }

        .order-list-box {
            display: flex;
            flex-flow: column;
            flex: 1;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;

            .order-list {
                flex: 1;
                margin: 0;
                padding: 0;
                font-size: 1.4rem;
                list-style: none;

                > li {
                    .order-box {
                        margin-bottom: 1rem;
                        background: #fff;

                        .order-weight {
                            font-weight: 600;
                        }

                        > div {
                            display: flex;
                            justify-content: space-between;
                            padding: 1rem 1.5rem;
                            border-bottom: 0.1rem solid #dedede;
                        }

                        .order-head {
                            .order-body-cond {
                                color: red;
                            }
                        }

                        .order-body {
                            > div {
                                display: flex;
                                align-items: center;
                                justify-content: left;

                                .order-body-img {
                                    width: 5rem;
                                    height: 5rem;
                                    margin: 0 1rem 0 0;
                                    border-radius: 0.5rem;
                                    background: #c3c3c3;
                                }

                                .order-body-detail {
                                    display: flex;
                                    flex-flow: column;

                                    > span {
                                        padding: 0.3rem 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .loading-box {
                display: flex;
                justify-content: center;
            }
        }
    }
}
</style>