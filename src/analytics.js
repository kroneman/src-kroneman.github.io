import VueAnalytics from 'vue-analytics';
import Vue from 'vue';
import router from './router';

const {
  NODE_ENV,
  ANALYTICS_ID,
} = process.env;

(() => {
  if (NODE_ENV !== 'production') {
    return;
  }

  if (!ANALYTICS_ID) {
    return;
  }

  console.log('analytics loaded');
  Vue.use(VueAnalytics, {
    id: ANALYTICS_ID,
    router,
  });
})();
