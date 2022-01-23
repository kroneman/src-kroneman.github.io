import { getScreenSize } from '../utils';

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export default {
  namespaced: true,
  state: {
    screenSize: 0,
  },
  getters: {
    isSmallScreen({ screenSize }) {
      return screenSize < breakpoints.md;
    },
    isMediumScreen({ screenSize }) {
      return screenSize < breakpoints.lg;
    },
    isLargeScreen({ screenSize }) {
      return screenSize < breakpoints.xl;
    },
    isExtraLargeScreen({ screenSize }) {
      return screenSize >= breakpoints.xl;
    },
  },
  mutations: {
    screenSize(state, screenSize) {
      state.screenSize = screenSize;
    },
  },
  actions: {
    UPDATE_SCREEN_SIZE({ commit }) {
      const screenSize = getScreenSize();
      commit('screenSize', screenSize);
    },
  },
};
