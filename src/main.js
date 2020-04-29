import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './analytics';
import { debounce } from './utils';

Vue.config.productionTip = false;
store.dispatch('responsive/UPDATE_SCREEN_SIZE');
window.addEventListener('resize', debounce(() => {
  store.dispatch('responsive/UPDATE_SCREEN_SIZE');
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
