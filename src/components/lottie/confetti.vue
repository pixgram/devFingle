<template>
  <div class="lottie-confetti">
    <lottie :options="defaultOptions" @animCreated="handleAnimation" />
  </div>
</template>
<script>
import Lottie from '@/components/lottie';
import * as animationData from '@/assets/lottie/lottie_confetti.json';

export default {
  name: 'lottie-confetti',
  components: {
    lottie: Lottie,
  },
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
.lottie-confetti {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
