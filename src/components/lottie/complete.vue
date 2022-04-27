<template>
  <div class="lottie-complete">
    <lottie :options="defaultOptions" @animCreated="handleAnimation" />
  </div>
</template>
<script>
import * as animationData from '@/assets/lottie/complete.json';

export default {
  name: 'lottie-complete',
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      this.anim.loop = false;
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
.lottie-complete {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.5);
}
</style>
