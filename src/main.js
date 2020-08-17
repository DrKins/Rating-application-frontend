import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//Vue initialization of charts.js
import "chart.js";
import "hchs-vue-charts";

// Vue initialization of socket.io
import VueSocketIOExt from 'vue-socket.io-extended';
import io from "socket.io-client";

// Vue page transition implementation.
import VuePageTransition from 'vue-page-transition';
Vue.use(VuePageTransition);

//Vue charts implementation
Vue.use(window.VueCharts);

// Vue production configuration
Vue.config.productionTip = false;

// Socket.io configuration
const socket = io('https://praksans.dyndns.org',{transports: ['websocket']});
Vue.use(VueSocketIOExt, socket);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
