<template>
    <div class="app-set-page">
        <mt-header title="设置">
            <router-link
                to="/"
                slot="left"
            >
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <main class="main">
            <section>
                <div>
                    <mt-cell
                        title="报警通知"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_warn_notice.png"
                            width="24"
                            height="24"
                        >
                    </mt-cell>
                </div>
            </section>
            <section>
                <div>
                    <mt-cell
                        title="围栏"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_rail.png"
                            width="24"
                            height="24"
                        >
                    </mt-cell>
                </div>
            </section>
            <section>
                <div>
                    <mt-cell title="立即定位">
                        <img
                            slot="icon"
                            src="../assets/image/icon_now_locate.png"
                            width="24"
                            height="24"
                        >
                        <mt-button
                            type="primary"
                            size="small"
                        >立即发送</mt-button>
                    </mt-cell>
                    <mt-cell title="Wi-Fi定位">
                        <img
                            slot="icon"
                            src="../assets/image/icon_wifi_locate.png"
                            width="24"
                            height="24"
                        >
                        <mt-button
                            type="primary"
                            size="small"
                        >立即发送</mt-button>
                    </mt-cell>
                    <mt-cell
                        title="工作模式"
                        is-link
                        value="定时定位模式"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_work_modal.png"
                            width="24"
                            height="24"
                        >
                    </mt-cell>
                </div>
            </section>
            <section>
                <div>
                    <mt-cell
                        title="SOS号码"
                        is-link
                        value="未设置"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_sos.png"
                            width="24"
                            alt="sos"
                        >
                    </mt-cell>
                    <mt-cell
                        title="获取号码"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_get_number.png"
                            width="24"
                            alt="getNumber"
                        >
                    </mt-cell>
                    <mt-cell
                        title="低电提醒"
                        is-link
                        value="关闭"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_low_power_remind.png"
                            width="24"
                            alt="lowPowerRemind"
                        >
                    </mt-cell>
                    <mt-cell
                        title="拆卸报警"
                        is-link
                        value="关闭"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_remove_warn.png"
                            width="24"
                            alt="removeWarn"
                        >
                    </mt-cell>
                    <mt-cell
                        title="解除拆卸报警"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_unremove_warn.png"
                            width="24"
                            alt="unremoveWarn"
                        >
                    </mt-cell>
                    <mt-cell
                        title="超速告警"
                        is-link
                        value="超速告警"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_overspeed_warn.png"
                            width="24"
                            alt="overspeedWarn"
                        >
                    </mt-cell>
                    <mt-cell
                        title="震动报警"
                        is-link
                        value="开启"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_vibration_alarm.png"
                            width="24"
                            alt="vibrationAlarm"
                        >
                    </mt-cell>
                    <mt-cell
                        title="震动灵敏度"
                        is-link
                        value="等级四"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_vibration_sensitivity.png"
                            width="24"
                            alt="vibrationSensitivity"
                        >
                    </mt-cell>
                    <mt-cell
                        title="设防/撤防"
                        is-link
                        value="设防"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_fortified_removal.png"
                            width="24"
                            alt="fortifiedRemoval"
                        >
                    </mt-cell>
                    <mt-cell
                        :title="setTitle + '（可测试）'"
                        is-link
                        :value="value?'开启':'关闭'"
                        to="/set_warn/1"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_acoustic_warn.png"
                            width="24"
                            alt="acousticWarn"
                        >
                    </mt-cell>
                    <mt-cell
                        title="换卡报警"
                        is-link
                        value="开启"
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_incard_warn.png"
                            width="24"
                            alt="incardWarn"
                        >
                    </mt-cell>
                    <mt-cell
                        title="自定义指令"
                        is-link
                    >
                        <img
                            slot="icon"
                            src="../assets/image/icon_custom_instruction.png"
                            width="24"
                            alt="customInstruction"
                        >
                    </mt-cell>
                </div>
            </section>
        </main>
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
        this.loadData();
    },
    methods: {
        /**
         * 加载数据
         */
        loadData() {
            // 假设该信息是id为1
            let id = 1;
            this.$axios.get('/get_set_detail').then(res => {
                let warnDetail = res.data.data.find(v => v.id === id);
                this.setTitle = warnDetail.title;
                this.value = warnDetail.condition;
            }).catch(err => {
                console.log(err);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.app-set-page {
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

        > section {
            > div {
                margin: 1rem 0;
            }
        }
    }
}
</style>
