import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import jsCookie from 'js-cookie';
Vue.use(Router);
Vue.prototype.$axios = axios;
Vue.prototype.$cookie = jsCookie;
const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'login' }
        },
        {
            path: '/index',
            name: 'index',
            // 路由懒加载
            component: resolve => require(['../views/index'], resolve),
            redirect: { name: 'home' },

            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: resolve => require(['../views/homePage'], resolve),
                },
                {
                    path: '/movieProxy',
                    name: 'movieProxy',
                    component: resolve => require(['../views/movieProxyPage'], resolve),
                },
                {
                    path: '/movieMock',
                    name: 'movieMock',
                    component: resolve => require(['../views/movieMockPage'], resolve),
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../views/login'], resolve),
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next();
    } else {
        if (jsCookie.get('username')) {
            next();
        } else {
            next({ path: '/login' });
        }
    }
});

export default router;
