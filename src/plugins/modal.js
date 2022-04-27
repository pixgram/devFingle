export default {
  install(vue, { store }) {
    store.registerModule(['modal'], {
      namespaced: true,
      state: {
        modalList: [],
        modalSpeed: null,
      },
      getters: {},
      mutations: {
        MODAL_TOGGLE: (state, payload) => {
          const hasNameIdx = state.modalList.findIndex(
            (el) => el.name === payload.name
          );
          if (payload.visible) {
            if (hasNameIdx !== -1) return;
            state.modalList.push(payload);
          } else {
            if (hasNameIdx === -1) return;
            state.modalList.splice(hasNameIdx, 1);
          }
        },
        MODAL_POP: (state) => {
          state.modalList.pop();
        },
        MODAL_SPEED: (state, payload) => {
          state.modalSpeed = payload;
        },
      },
    });

    const storeDispatch = (options, speed) => {
      store.commit('modal/MODAL_SPEED', speed);
      store.commit('modal/MODAL_TOGGLE', options);
    };

    // modal
    vue.prototype.$_modalOpen = (params) => {
      return new Promise((resolve) => {
        const speed = params.speed ?? 0.3;
        const options = { ...params, visible: true, callback: resolve };
        storeDispatch(options, speed);
      });
    };
    vue.prototype.$_modalCloseEnd = () => {
      store.commit('modal/MODAL_POP');
    };
    vue.prototype.$_modalClose = (params) => {
      const speed = params.speed ?? 0.3;
      const modalList = store.state.modal.modalList;
      const idx = modalList.findIndex((el) => el.name === params.name);
      const callback = modalList[idx].callback;
      setTimeout(
        () => {
          callback(params.value);
        },
        params.transitionCallback ? speed * 1000 : 0
      );
      const options = { ...params, visible: false };
      storeDispatch(options, speed);
    };

    vue.prototype.$_modalScroll = (params) => {
      const target = document.querySelector(`div[data-name="${params.name}"]`);
      const content = target.querySelector('.modal-content');
      content.scrollTo(params.position.x, params.position.y);
    };

    //alert
    vue.prototype.$_alert = (msg) => {
      return new Promise((resolve) => {
        const options = {
          name: 'alert',
          msg: msg,
          visible: true,
          callback: resolve,
        };
        storeDispatch(options, 0.3);
      });
    };
    vue.prototype.$_confirm = function (msg) {
      return new Promise((resolve) => {
        const options = {
          name: 'alert',
          msg: msg,
          confirm: true,
          visible: true,
          callback: resolve,
        };
        storeDispatch(options, 0.3);
      });
    };
  },
};
