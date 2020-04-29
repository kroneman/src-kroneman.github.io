import Vue from 'vue';
import Vuex from 'vuex';

import responsive from './responsive';
import home from './home';

Vue.use(Vuex);

const isStrictMode = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: isStrictMode,
  modules: {
    home,
    responsive,
  },
});
