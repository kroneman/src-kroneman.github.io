import VueAnalytics from 'vue-analytics';
import Vue from 'vue';
import router from './router';

const {
  NODE_ENV,
  VUE_APP_ANALYTICS_ID,
} = process.env;

(() => {
  if (NODE_ENV !== 'production') {
    return;
  }

  if (!VUE_APP_ANALYTICS_ID) {
    return;
  }

  console.log('analytics loaded');
  Vue.use(VueAnalytics, {
    id: VUE_APP_ANALYTICS_ID,
    router,
  });
})();
