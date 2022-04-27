<template>
  <div>
    <h2 class="h2">Default</h2>
    <swiper class="swiper">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper>

    <highlightjs :code="code1" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'guide-swiper',
  mixins: [guideMixin],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      code1: 'this.toast("토스트 알럿입니다.");',
    };
  },
  mounted() {
    this.toast('토스트 알럿입니다.');
  },
  methods: {
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
      };
    },
  },
};
</script>
<style scoped></style>
