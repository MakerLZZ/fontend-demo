import Vue from 'vue';
import App from './App';
import router from './router';
import Stack from 'stackjs';
import iView from 'iview';
import Axios from 'axios';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.prototype.$stack = Stack;
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
