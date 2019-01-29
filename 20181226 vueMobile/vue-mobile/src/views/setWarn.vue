<template>
    <div class="app-set-warn-page">
        <mt-header>
            <router-link
                to="/set"
                slot="left"
            >
                <mt-button icon="back">设置</mt-button>
            </router-link>
        </mt-header>
        <div>
            <mt-cell :title="setTitle">
                <mt-switch
                    v-model="value"
                    @change="handleChangeSwitch"
                >开关</mt-switch>
            </mt-cell>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            setTitle: '',
            value: false
        };
    },
    mounted() {
        this.showData();
    },
    methods: {
        /**
         * 显示数据
         */
        showData() {
            let id = parseInt(this.$route.params.setTypeId);
            
            this.$axios.get('/get_set_detail').then(res => {
                let warnDetail = res.data.data.find(v => v.id === id);
                this.setTitle = warnDetail.title;
                this.value = warnDetail.condition;
            }).catch(err => {
                alert.log(err);
            });
        },
        /**
         * 处理改变开关事件
         */
        handleChangeSwitch() {
            console.log(this.value);
            // 访问修改请求 传入value状态值
        }
    }
};
</script>

<style lang="scss" scoped>
.app-set-warn-page {
    .mint-header {
        height: 3.3rem;
        font-size: 1.6rem;
        color: #000;
        text-align: center;
        background-color: #fff;
    }

    > div {
        margin: 1rem 0;
    }
}
</style>
