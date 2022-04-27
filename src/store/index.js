import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import cs from './modules/cs';
import pageTransition from './modules/page-transition';
import deviceInfo from './modules/device-info';
import userInfo from './modules/userInfo';

export default new Vuex.Store({
  state: {
    canLeaveSite: true,
  },
  mutations: {
    MU_CAN_LEAVE_SITE(state, payload) {
      state.canLeaveSite = payload;
    },
  },
  actions: {},
  modules: {
    cs,
    pageTransition,
    deviceInfo,
    userInfo,
  },
});
