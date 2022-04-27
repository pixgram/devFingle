<template>
  <div class="loading" v-show="visible">
    <div class="loading-lottie">
      <lottie :options="defaultOptions" @animCreated="handleAnimation" />
    </div>
  </div>
</template>
<script>
import bus from '@/utils/bus';
import * as animationData from '@/assets/lottie/loading.json';
export default {
  name: 'Loading',
  data() {
    return {
      visible: false,
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
    };
  },
  created() {
    bus.$on('loading', (visible) => {
      this.visible = visible;
    });
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      this.anim.loop = true;
      this.anim.setSpeed(1);
    },

    stop: function () {
      this.anim.stop();
    },

    play: function () {
      this.anim.play();
    },

    pause: function () {
      this.anim.pause();
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>

<style scoped lang="scss">
.loading {
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0);
}
.loading-lottie {
  height: 70px;
  width: 70px;
}
</style>
