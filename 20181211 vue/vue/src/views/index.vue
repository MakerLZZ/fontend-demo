<template>
    <div class="layout">
        <header class="header">
            <div><img src="../assets/img/logo.png"><span class="logo-title">几米云管理中心</span></div>
            <div>
                <img src="../assets/img/admin.png"><span class="head-admin" @mouseover="handleMoveAdimn" @mouseout="handleLeaveAdimn">{{username}}</span>
                <span :class="logout" @click="handleLogoutClick" @mouseover="handleMoveLogout" @mouseout="handleLeaveLogout">注销</span>    
            </div>
        </header>
        <div class="center">
            <aside class="aside">
                <ul>
                    <router-link
                        :class="$route.path === '/home'?'active':''"
                        to="/home"
                        tag="li"
                    >
                        <img src="../assets/img/home.png">
                        <span>首页</span>
                    </router-link>
                    <router-link
                        :class="$route.path === '/movieProxy'?'active':''"
                        to="/movieProxy"
                        tag="li"
                    >
                        <img src="../assets/img/movie_proxy.png">
                        <span>电影管理（proxy）</span>
                    </router-link>
                    <router-link
                        :class="$route.path === '/movieMock'?'active':''"
                        to="/movieMock"
                        tag="li"
                    >
                        <img src="../assets/img/movie_mock.png">
                        <span>电影管理（mock）</span>
                    </router-link>
                </ul>
            </aside>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            username: this.$cookie.get('username'),
            logout: 'logout-hidden'
        };
    },
    methods: {
        handleMoveAdimn() {
            this.logout = 'logout';
        },
        handleLeaveAdimn() {
            this.logout = 'logout-hidden';
        },
        handleMoveLogout() {
            this.logout = 'logout';
        },
        handleLeaveLogout() {
            this.logout = 'logout-hidden';
        },
        handleLogoutClick() {
            this.$cookie.remove('username');
            this.$router.push('/');
        }
    }
};
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-flow: column;
    height: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        height: 64px;
        padding: 0 15px;
        color: #fff;
        background: #33373f;

        div {
            display: flex;
            align-items: center;
            position: relative;

            span {
                color: #b3b4b7;
            }

            .logo-title {
                margin: 0 5px;
                letter-spacing: 3px;
            }

            .head-admin {
                display: flex;
                align-items: center;
                height: 21px;
                margin-left: 5px;
                font-size: 14px;
                cursor: pointer;
            }

            .logout-hidden {
                display: none;
            }

            .logout {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 37px;
                left: 31px;
                width: 40px;
                height: 20px;
                margin: 5px;
                box-shadow: 1px 1px 10px rgba(214, 214, 214, 0.3);
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                background: #979797;
            }
        }
    }

    .center {
        display: flex;
        flex-flow: row;
        flex: 1;

        .aside {
            width: 200px;
            min-width: 200px;
            max-width: 200px;
            color: #fff;
            background: #383c44;

            ul {
                margin: 0;
                padding: 0;

                .active {
                    background: #389bff;
                }

                li {
                    display: flex;
                    align-items: center;
                    height: 30px;
                    margin: 15px 0;
                    padding: 15px 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                    white-space: nowrap;
                    cursor: pointer;
                    list-style: none;

                    img {
                        width: 25px;
                    }

                    span {
                        margin: 0 15px;
                        font-size: 14px;
                        color: #d5d6d8;
                    }
                }
            }
        }

        .content {
            flex: 1;
            padding: 20px 18px;
            overflow: auto;
            background: #f4f6f8;
        }
    }
}
</style>