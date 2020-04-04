import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store'
import FlowRunner from './components/FlowRunner'
import FlowManager from './components/FlowManager'
import ComboBuilder from './components/ComboBuilder'

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/', redirect: 'run-flow' },
  { path: '/run-flow', component: FlowRunner },
  { path: '/configure-flow', component: FlowManager },
  { path: '/create-combo', component: ComboBuilder }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
