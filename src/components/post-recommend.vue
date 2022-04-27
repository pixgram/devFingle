<template>
  <div class="recommend-section">
    <h4 class="title-3">
      <strong v-if="listData.id === 'COA02301'">{{ userName }}</strong
      >{{ listData.title }}
    </h4>
    <swiper
      class="recommend-list"
      :options="swiperOptions"
      v-if="listData.cont.length"
    >
      <swiper-slide
        v-for="(item, index) in listData.cont"
        :key="item.postCtgrCd + index"
      >
        <button
          type="button"
          class="post-item"
          @click="$emit('postModal', item.postRcmInqCd, item.postSno)"
        >
          <span class="img">
            <img :src="item.listFile.urlPth" alt="" @error="noImage" />
          </span>
          <span class="post-info">
            <span class="flex-flag-group">
              <span :class="categoryType(item)">{{ item.postCtgr }}</span>
              <template v-if="item.quizInclYn">
                <span v-if="item.quizCompYn" class="flag-gray-md">
                  퀴즈 완료
                </span>
                <span v-else class="flag-darkgray-md"> 퀴즈 </span>
              </template>
            </span>
            <strong class="item-title">{{ item.ttlNm }}</strong>
            <ul class="viewer">
              <li class="hit">{{ item.inqTims }}</li>
              <!--              <li-->
              <!--                class="share"-->
              <!--                v-if="sharedPost && item.postSno === sharedPost"-->
              <!--              >-->
              <!--                {{ item.cmmnTims + 1 }}-->
              <!--              </li>-->
              <!--              <li class="share" v-else>{{ item.cmmnTims }}</li>-->
              <li class="share">{{ item.cmmnTims }}</li>
              <li class="bookmark">{{ item.bkmkTims }}</li>
            </ul>
          </span>
        </button>
      </swiper-slide>
    </swiper>
    <div slot="no-results" v-else>
      <no-data>
        <template #icon>
          <i class="icon-ellipsis" />
        </template>
      </no-data>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'post-recommend',
  props: {
    userName: {
      type: String,
      required: true,
    },
    listData: {
      type: Object,
      required: true,
    },
    // sharedPost: {
    //   type: Number,
    //   required: false,
    // },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
      },
    };
  },
  methods: {
    categoryType(item) {
      switch (item.postCtgrCd) {
        case 'CTS00103': // 건강
          return 'flag-orange-md';
        case 'CTS00104': // 금웅 : 보라색
          return 'flag-purple-md';
        case 'CTS00105': // 핑글팁
          return 'flag-sub-md';
        default:
          // 보험
          return 'flag-sub-md';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recommend-section {
  padding: 30px 20px;
  & + .recommend-section {
    border-top: 8px solid $gray-20;
  }
  .recommend-list {
    margin: 20px -20px 0;
    padding: 0 20px;
    position: relative;
    .swiper-slide {
      width: 300px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
    .post-item {
      width: 300px;
      border: 1px solid $gray-30;
      border-radius: 10px;
      font-size: 0;
      & + .post-item {
        margin-left: 10px;
      }
      .img {
        width: 300px;
        height: 168px;
        border-radius: 0;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .post-info {
        margin: 0;
        padding: 20px;
        .item-title {
          min-height: 40px;
        }
      }
    }
  }
}
</style>
