import Vue from 'vue';
import App from './App';
import router from './router';
import Mint from 'mint-ui';
import Axios from 'axios';
import Mock from './mock/mock';
import 'mint-ui/lib/style.css';

Vue.config.productionTip = false;

Vue.use(Mint);
Vue.use(Mock);

Vue.prototype.$axios = Axios;

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
