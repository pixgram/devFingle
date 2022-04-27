/* eslint-disable */

export default {
  namespaced: true,
  state: {
    apchTknVal: null,
  },
  mutations: {
    ADD_TOKEN: (state, payload) => {
      state.apchTknVal = payload;
    },
  },
  actions: {},
};
