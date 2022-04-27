export default {
  namespaced: true,
  state: {
    page_direction: 1,
    page_transition: false,
    page_scroll_position: 0,
  },
  mutations: {
    PAGE_DIRECTION: (state, payload) => {
      state.page_direction = payload;
    },
    PAGE_TRANSITION: (state, payload) => {
      state.page_transition = payload;
    },
    PAGE_SCROLL_POSITION: (state, payload) => {
      state.page_scroll_position = payload;
    },
  },
};
