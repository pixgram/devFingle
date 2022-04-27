<template>
  <transition-group tag="div" class="toast-wrap" @enter="enter" @leave="leave">
    <div class="toast" v-for="item in toastList" :key="item.key">
      <div>
        {{ item.value }}
      </div>
    </div>
  </transition-group>
</template>

<script>
import bus from '@/utils/bus';
import { gsap } from 'gsap/all';
export default {
  name: 'Toast',
  data() {
    return {
      toastList: [],
    };
  },
  created() {
    bus.$on('toast', (payload) => {
      this.toastList.push({
        value: payload.msg,
        key: Math.floor(Math.random() * 10000),
      });
      setTimeout(
        () => {
          this.toastList.shift();
        },
        payload.time ? payload.time : 3000
      );
    });
  },
  methods: {
    enter(el, done) {
      gsap.from(el, 0.2, {
        height: '0',
        opacity: 0,
        marginTop: '0',
        onComplete: () => {
          gsap.set(el, { clearProps: 'height' });
          done();
        },
      });
    },
    leave(el, done) {
      gsap.to(el, 0.2, {
        height: '0',
        opacity: 0,
        marginTop: '0',
        onComplete: () => {
          gsap.set(el, { clearProps: 'height' });
          done();
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.toast-wrap {
  z-index: 99999;
  position: fixed;
  bottom: 40px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 0;
  .toast {
    &:before {
      content: '';
      display: block;
      height: 10px;
    }
    div {
      padding: 15px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.4);
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      line-height: 1.5;
    }
  }
}
</style>
