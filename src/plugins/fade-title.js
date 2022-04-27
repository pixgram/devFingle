import { gsap } from 'gsap/all';
export default {
  install(vue, { store }) {
    store.registerModule(['fadeTitle'], {
      namespaced: true,
      state: {
        titleOpacity: 1,
        fadeTarget: null,
      },
      getters: {},
      mutations: {
        TITLE_OPACITY: (state, payload) => {
          state.titleOpacity = payload;
        },
        FADE_TARGET: (state, payload) => {
          state.titleOpacity = 0;
          state.fadeTarget = payload;
        },
      },
    });
    window.addEventListener('scroll', () => {
      const from = 0;
      const to = 1;
      const target = store.state.fadeTitle.fadeTarget;
      if (!target) return;
      const targetY = window.pageYOffset + target.getBoundingClientRect().top;
      const windowScrollTop =
        document.querySelector('header').offsetHeight + window.pageYOffset;
      const start = windowScrollTop - targetY;
      const end = target.getBoundingClientRect().height;
      const val = Math.max(0, Math.min(1, start / end));
      store.commit('fadeTitle/TITLE_OPACITY', val * (to - from) + from);
    });
    vue.prototype.$_fadeTitleHold = (el, state) => {
      const target = el.querySelector('.page-title');
      if (!target) return;
      if (state) {
        gsap.set(target, {
          opacity: window.getComputedStyle(target).getPropertyValue('opacity'),
          transitionDelay: '99s',
          transitionProperty: 'opacity',
        });
      } else {
        gsap.set(target, { clearProps: 'all' });
      }
    };
  },
};
