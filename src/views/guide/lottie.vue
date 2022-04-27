<template>
  <div>
    {{ anim }}
    <h2 class="h2">각 컴포넌트를 불러온 후 사용하시면 됩니다.</h2>
    <button type="button" @click="play">play</button>
    <button type="button" @click="stop">stop</button>
    <button type="button" @click="pause">pause</button>
    <div class="complete">
      <lottie :options="completeOptions" @animCreated="handleAnimation" />
    </div>
    <highlightjs :code="code1" />

    <!--    <div class="loading">
      <lottie
        class="loading"
        :options="loadingOptions"
        @animCreated="handleAnimation"
      />
    </div>
    <highlightjs :code="code2" />

    <lottie
      class="confetti"
      :options="confettiOptions"
      @animCreated="handleAnimation"
    />
    <highlightjs :code="code3" />-->
  </div>
</template>

<script>
import * as complete from '@/assets/lottie/complete.json'; /*
import * as confetti from "@/assets/lottie/confetti.json";
import * as loading from "@/assets/lottie/loading.json";*/
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'guide-lottie',
  mixins: [guideMixin],
  data() {
    return {
      completeOptions: { animationData: complete.default },
      // confettiOptions: { animationData: confetti.default },
      // loadingOptions: { animationData: loading.default },
      animationSpeed: 1,
      code1: '',
      code2: '',
      code3: '',
    };
  },
  methods: {
    handleAnimation: function (anim) {
      console.log(123123123);
      this.anim = anim;
      this.anim.loop = true;
      this.anim.setSpeed(1);
    },

    stop: function () {
      console.log('stop');
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
.loading,
.complete {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.5);
}
.confetti {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
