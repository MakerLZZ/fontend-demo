<template>
    <div class="home-content">
        <router-link class="home-movie-proxy" to="/movieProxy" tag="a" href="javascript:;">
            电影管理（proxy）
        </router-link>
        <router-link class="home-movie-mock" to="/movieMock" tag="a" href="javascript:;">
            电影管理（mock）
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'home'
};
</script>

<style lang="scss" scoped>
.home-content {
    display: flex;
    justify-content: left;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        margin: 5px;
        padding: 5px;
        color: #fff;
        text-decoration: none;
    }

    .home-movie-proxy {
        border: 2px solid #00314a;
        background-color: #007fbf;
    }

    .home-movie-mock {
        border: 2px solid #004d47;
        background-color: #00bfaf;
    }
}
</style>
