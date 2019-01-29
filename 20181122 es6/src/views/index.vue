<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <es6></es6>
    </div>
</template>

<script>
    import ES6 from '../components/es6';
    export default {
        components: {
            es6: ES6
        },
        data () {
            return {
                msg: 'ES6（部分） 点击按钮后控制台可查',
            };
        }
    };
</script>

<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
