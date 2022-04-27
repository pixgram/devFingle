<template>
  <modal
    :name="name"
    type="full"
    width="auto"
    :classes="['image-gallery']"
    @openEnd="open"
    @close="close"
  >
    <template #content>
      <swiper ref="mySwiper" class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in swiperList" :key="item">
          <pinch-zoom disableZoomControl="disable" ref="test">
            <img
              src="https://xe1.xpressengine.com/files/attach/images/122/231/306/019/%EB%AC%B4%EC%84%9C%EC%9A%B4%EC%9D%B4%EC%95%BC%EA%B8%B01.jpg"
              @dragstart="test"
              @error="noImage"
            />
          </pinch-zoom>
        </swiper-slide>
      </swiper>
    </template>
  </modal>
</template>
<script>
import PinchZoom from 'vue-pinch-zoom';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'imageGallery',
  props: ['name', 'type'],
  components: {
    Swiper,
    SwiperSlide,
    PinchZoom,
  },
  data() {
    return {
      swiperOption: {
        on: {
          touchStart: () => {
            this.swiper.allowTouchMove =
              !this.$refs.test[this.swiper.realIndex].isZoomedIn;
            this.swiper.update();
          },
        },
        touchStartPreventDefault: false,
      },
      swiperList: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  methods: {
    dragStart() {
      if (this.$refs.test.isZoomedIn) {
        this.swiper.detachEvents();
      } else {
        this.swiper.attachEvents();
      }
    },
    test() {
      // console.log(11);
    },
    open() {
      // console.log(this.$refs.test);
      // console.log(this.$refs.test[0]);
      // console.log(this.$refs.test);
      // console.log(this.$refs.test.isZoomedIn);
      // window.addEventListener('touchstart', this.dragStart, false);
      // window.addEventListener('mousedown', this.dragStart, false);
    },
    close() {
      // console.log('close');
      // window.removeEventListener('touchstart', this.dragStart, false);
      // window.removeEventListener('mousedown', this.dragStart, false);
    },
  },
};
</script>
<style scoped lang="scss">
.pinch-zoom-wrapper,
.swiper-container {
  height: 100%;
}
.modal-content {
  padding: 0;
}
.swiper-slide {
  height: auto;
  width: 500px;
  img {
    width: auto;
  }
}
</style>
