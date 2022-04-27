<template>
  <modal
    name="imageGallery"
    type="full"
    width="auto"
    :classes="['image-gallery']"
    @open="open"
  >
    <template #content>
      <swiper
        ref="mySwiper"
        class="swiper"
        :options="swiperOption"
        v-if="imageList.length"
        :cleanupStylesOnDestroy="false"
      >
        <swiper-slide v-for="(item, index) in imageList" :key="index">
          <!-- vue-pinch-zoom : https://github.com/drozhzhin-n-e/vue-pinch-zoom -->
          <!-- Swiper5 : https://github.com/nolimits4web/swiper/blob/Swiper5/API.md -->
          <!-- vue-awesome-swiper : https://github.com/surmon-china/vue-awesome-swiper/blob/master/README.md -->
          <pinch-zoom
            disableZoomControl="disable"
            ref="pinch"
            :limitPan="true"
            :limitZoom="5"
          >
            <img :src="item.urlPth" @error="noImage" :alt="item.fileNm" />
          </pinch-zoom>
        </swiper-slide>
      </swiper>
      <div v-else>no data</div>
    </template>
  </modal>
</template>
<script>
import PinchZoom from 'vue-pinch-zoom';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'imageGallery',
  props: ['imageList', 'idx'],
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
            const swiper = this.$refs.mySwiper.$swiper;
            swiper.allowTouchMove =
              !this.$refs.pinch[swiper.realIndex].isZoomedIn;
            swiper.update();
          },
        },
        touchStartPreventDefault: false,
      },
    };
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.$refs.mySwiper.$swiper.slideTo(this.idx, 0);
      });
    },
  },
};
</script>
<style scoped lang="scss">
.swiper-slide {
  height: 100vh;
}
.pinch-zoom-wrapper {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  ::v-deep .pinch-zoom-content {
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: 0 0;
    img {
      max-width: 100%;
      max-height: 100%;
      width: auto !important;
    }
  }
}
.pinch-zoom-wrapper,
.swiper-container {
  height: 100%;
  width: 100%;
  background-color: $gray-70 !important;
}
.modal-content {
  padding: 0;
}
.swiper-slide {
  //height: auto;
  //width: 500px;
  img {
    //width: 100%;
    //height: 100%;
    //max-height: 0;
    //max-width: 0;
    //object-fit: contain;
  }
}
</style>
