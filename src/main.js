import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import FlowRunner from './components/FlowRunner';
import FlowBuilder from './components/FlowBuilder';
import ComboBuilder from './components/ComboBuilder';
import Home from './components/Home';
import LearnMove from './components/LearnMove';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/', component: Home },
  { path: '/run-flow', component: FlowRunner },
  { path: '/create-combo', component: ComboBuilder },
  { path: '/create-flow', component: FlowBuilder },
  { path: '/learn-move/:shorthand', component: LearnMove, props: true }
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
