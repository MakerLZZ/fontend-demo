<template>
    <main class="main">
        <div class="main-img">
            <img src="../assets/img/login_bg.jpg">
        </div>
        <div class="login">
            <div class="login-box">
                <div class="login-head">
                    <h5>欢迎登录</h5>
                </div>
                <div class="login-body">
                    <div>
                        <label>用户名：</label>
                        <input
                            v-model="username"
                            type="text"
                            name="username"
                            placeholder="请输入用户名（admin）"
                        >
                    </div>
                    <div>
                        <label>密码：</label>
                        <input
                            v-model="password"
                            type="text"
                            name="password"
                            placeholder="请输入密码（123123）"
                        >
                    </div>
                    <div>
                        <button
                            type="submit"
                            @click="handleLoginClick"
                        >登录</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name:'login',
    created() {
        //登陆了自动跳到首页，来阻止重复登陆
        if(this.$cookie.get('username')){
            this.$router.push('/index');
        }
    },
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        /**
         * 处理登录点击事件
         */
        handleLoginClick() {
            if(this.username !== 'admin'){
                alert('账号输入有误');
                return false;
            }
            if(this.password !== '123123'){
                alert('密码输入有误');
                return false;
            }
            this.$cookie.set('username', this.username, 2 / 24);
            this.$router.push('/index');
        }
    }
};
</script>

<style lang="scss" scoped>
/* Main Style */
.main {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, #2ad3e6, #1a88bb);
    background-size: cover;
    background-position: 50%;

    .main-img {
        position: absolute;
        top: 50%;
        left: 400px;
        transform: translateY(-60%);
    }

    .login {
        position: absolute;
        top: 50%;
        right: 560px;
        width: 300px;
        transform: translateY(-60%);
    }

    .login-box {
        position: relative;
        border-radius: 4px;
        font-size: 14px;
        background: #fff;

        .login-head {
            padding: 15px;
            border-bottom: 1px solid #e8eaec;

            h5 {
                margin: 0;
                font-size: 14px;
                font-weight: 900;
                text-align: left;
            }
        }

        .login-body {
            padding: 15px;

            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 36px;
                padding-bottom: 15px;

                label {
                    flex: 0.3;
                    padding: 8px 0;
                    text-align: left;
                }

                input {
                    flex: 1;
                    height: 28px;
                    padding: 0 10px;
                    border: 1px solid #dcdcdc;
                }

                input:focus {
                    outline: none;
                    border: 1px solid #003c6b;
                }

                button {
                    flex: 1;
                    display: inline-block;
                    height: 36px;
                    outline: none;
                    border: none;
                    border-radius: 2px;
                    font-size: 14px;
                    line-height: 36px;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    cursor: pointer;
                    background-color: #1e9fff;
                }
            }
        }
    }
}
</style>

