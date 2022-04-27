<template>
  <transition
    @leave="leave"
    @enter="enter"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @appear="appear"
    @before-appear="beforeAppear"
    @after-appear="afterAppear"
    appear
    name="page"
  >
    <slot />
  </transition>
</template>
<script>
import { gsap, Cubic } from 'gsap/all';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);
import { mapMutations, mapState } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
export default {
  name: 'account-transition',
  computed: {
    ...mapState('pageTransition', ['page_direction', 'page_scroll_position']),
  },
  props: ['name'],
  data() {
    const pageNum = window.history.state ? window.history.pageNum || 0 : 0;
    window.history.replaceState(
      {
        ...window.history.state,
        pageNum,
      },
      ''
    );
    return {
      speed: 0.5,
      pageNum,
      transitionName: 'forward',
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const { pageNum } = window.history.state;
      this.PAGE_DIRECTION(pageNum < this.$data.pageNum ? -1 : 1);
      this.$data.transitionName =
        pageNum < this.$data.pageNum ? 'backward' : 'forward';
      next();
    });
    this.$router.afterEach(() => {
      window.setTimeout(() => {
        const { pageNum } = window.history.state;
        if (Number.isInteger(pageNum)) {
          this.$data.pageNum = pageNum;
          return;
        }
        this.$data.pageNum += 1;
        window.history.replaceState(
          {
            ...window.history.state,
            pageNum: this.$data.pageNum,
          },
          ''
        );
      }, 0);
    });
  },
  methods: {
    ...mapMutations('pageTransition', ['PAGE_DIRECTION', 'PAGE_TRANSITION']),
    beforeAppear() {},
    afterAppear() {},
    appear(el, done) {
      window.addEventListener('load', () => {
        this.$_stickyInit(el, true);
        done();
      });
    },
    beforeEnter(el) {
      this.PAGE_TRANSITION(true);
      disableBodyScroll(el);
    },
    afterEnter(el) {
      this.PAGE_TRANSITION(false);
      enableBodyScroll(el);
    },
    enter(el, done) {
      this.$root.$once('page-enter', (position) => {
        console.log('enter');
        const direction = this.page_direction === -1;
        gsap.set(el, {
          zIndex: direction ? '1' : '2',
          position: 'absolute',
          top: -position.y,
          left: 0,
          width: '100vw',
          bottom: 0,
        });
        this.transition('enter', el, direction, done, position);
      });
    },
    leave(el, done) {
      this.$root.$once('page-leave', (position) => {
        console.log('leave');
        const direction = this.page_direction === -1;
        const winTop = window.pageYOffset;
        console.log('winTop', winTop);
        console.log('position', position.y);
        // window.scrollTo(position.x, position.y);
        window.scrollTo(0, 0);
        console.log(winTop - position.y, window.pageYOffset);
        gsap.set(el, {
          zIndex: direction ? '2' : '1',
          position: 'absolute',
          top: -winTop,
          left: 0,
          width: '100vw',
          bottom: 0,
        });
        this.transition('leave', el, direction, done);
        this.$root.$emit('page-enter', position);
      });
    },
    transition(state, obj, direction, done, position) {
      if (state === 'enter') {
        gsap.fromTo(
          obj,
          { x: direction ? '-40%' : '100%' },
          {
            x: '0%',
            duration: this.speed,
            ease: Cubic.easeInOut,
            onComplete: () => {
              gsap.set(obj, { clearProps: 'all' });
              window.scrollTo(0, position.y);
              if (done) done();
            },
          }
        );
      } else if (state === 'leave') {
        gsap.fromTo(
          obj,
          {
            x: '0%',
          },
          {
            x: direction ? '100%' : '-40%',
            duration: this.speed,
            ease: Cubic.easeInOut,
            onComplete: () => {
              gsap.set(obj, { clearProps: 'all' });
              if (done) done();
            },
          }
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-leave-active {
  ::v-deep header {
    .page-title {
      transition-delay: 99s;
      background: red;
    }
  }
}
.page-enter-active,
.page-leave-active {
  position: relative;
  pointer-events: none !important;
  ::v-deep input {
    caret-color: transparent !important;
  }
}
</style>
