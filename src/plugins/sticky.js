import lodash from 'lodash';
import { gsap } from 'gsap/all';

export default {
  install(vue, { store }) {
    store.registerModule(['sticky'], {
      namespaced: true,
      state: {
        stickyList: [],
        stickyHeight: 0,
      },
      mutations: {
        STICKY_LIST: (state, payload) => {
          const idx = state.stickyList.findIndex((el) => {
            return (
              el.item.getAttribute('data-sticky-id') ===
              payload.item.getAttribute('data-sticky-id')
            );
          });
          if (payload.state) {
            if (idx !== -1) return;
            state.stickyList.push({
              item: payload.item,
              height: payload.item.offsetHeight,
              top: null,
            });
          } else {
            if (idx === -1) return;
            state.stickyList.splice(idx, 1);
          }

          if (!state.stickyList.length) return;

          state.stickyList.forEach((el) => {
            el.start =
              window.pageYOffset +
              el.item.parentNode.getBoundingClientRect().top;
            el.item.start = el.start;
          });

          state.stickyList = lodash.orderBy(
            state.stickyList,
            ['start'],
            ['asc']
          );

          state.stickyList.reduce(
            (a, b) => {
              b.top = a.height;
              b.item.top = a.height;
              return {
                height: a.height + b.height,
              };
            },
            { height: 0 }
          );
        },
        STICKY_HEIGHT: (state, payload) => {
          state.stickyHeight = payload;
        },
      },
    });

    function stickyHeight() {
      if (!store.state.sticky.stickyList.length) return;
      const t = store.state.sticky.stickyList.reduce(
        (a, { height, start, top }) => {
          return window.pageYOffset + top >= start ? a + height : a;
        },
        0
      );
      store.commit('sticky/STICKY_HEIGHT', t);
    }
    function stickyTop() {
      if (!store.state.sticky.stickyList.length) return;
      store.state.sticky.stickyList.forEach((obj) => {
        gsap.set(obj.item, {
          top: `${obj.top}px`,
        });
      });
    }

    window.addEventListener('scroll', () => {
      stickyTop();
      stickyHeight();
    });

    vue.prototype.$_stickyInit = (el, enter) => {
      el.querySelectorAll('.sticky-wrap').forEach((sticky) => {
        if (enter && !sticky.getAttribute('data-sticky-id')) {
          sticky.setAttribute(
            'data-sticky-id',
            Math.floor(Math.random() * 10000)
          );
        }
        store.commit('sticky/STICKY_LIST', {
          item: sticky,
          state: enter,
        });
      });
    };
  },
};
