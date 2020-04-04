import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/', component: App }
];

const router = new VueRouter({
  routes 
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
