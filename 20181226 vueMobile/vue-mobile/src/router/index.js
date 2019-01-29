import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: resolve => require(['../views/home'], resolve),
            children: [
                {
                    path: '/set',
                    name: 'set',
                    component: resolve => require(['../views/set'], resolve)
                },
                {
                    path: '/order',
                    name: 'order',
                    component: resolve => require(['../views/order'], resolve)
                },
                {
                    path: '/set_warn/:setTypeId',
                    name: 'set_warn',
                    component: resolve => require(['../views/setWarn'], resolve)
                }
            ]
        }
    ]
});
