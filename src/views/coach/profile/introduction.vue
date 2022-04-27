<template>
  <div>
    <div class="section">
      <strong class="title-section">상담 시간</strong>
      <ul class="key-text-list consult">
        <li v-if="introData.chtgUseYn">
          <span class="key chat"> 채팅 </span>
          <span class="val">
            {{ (introData.chtgCnslHrCtt, introData.chtgCnslWkdCtt) }}
          </span>
        </li>
        <li v-if="introData.telCnslUseYn">
          <span class="key call"> 전화 </span>
          <span class="val">
            {{ (introData.telCnslHrCtt, introData.telCnslWkdCtt) }}
          </span>
        </li>
        <li v-if="introData.cfntCnslUseYn">
          <span class="key meet"> 대면 </span>
          <span class="val">
            {{ (introData.cfntCnslHrCtt, introData.cfntCnslWkdCtt) }}
          </span>
        </li>
        <li v-if="introData.vdeoUseYn">
          <span class="key video"> 화상 </span>
          <span class="val">
            {{ (introData.vdeoCnslHrCtt, introData.vdeoCnslWkdCtt) }}
          </span>
        </li>
      </ul>
    </div>

    <div class="section" v-if="introData.info && introData.info.categoryList">
      <strong class="title-section">상담 전문 분야</strong>
      <ul class="bailiwick-list" v-if="introData.info">
        <li
          class="bailiwick-item"
          v-for="(item, index) in introData.info.categoryList"
          :key="index"
        >
          {{ item.cchCtgrNm }}
        </li>
      </ul>
    </div>

    <div class="section" v-if="introData.videoList.length > 0">
      <strong class="title-section">소개 영상</strong>
      <swiper class="swiper video-list" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in introData.videoList" :key="index">
          <video :src="item.urlPth" :poster="item.urlPth" />
        </swiper-slide>
        <div class="swiper-pagination wide" slot="pagination"></div>
      </swiper>
    </div>

    <div class="section" v-if="introData.photoList.length > 0">
      <strong class="title-section">소개 콘텐츠</strong>
      <swiper class="swiper photo-list" :options="swiperOptions">
        <swiper-slide v-for="(item, index) in introData.photoList" :key="index">
          <button type="button" class="zoom" @click="imgZoom">
            <img :src="item.urlPth" :alt="item.fileTypNm" />
          </button>
        </swiper-slide>
        <div class="swiper-pagination wide" slot="pagination"></div>
      </swiper>
    </div>

    <div class="section" v-if="introData.snsList.length > 0">
      <strong class="title-section">SNS</strong>
      <ul class="sns-list">
        <li
          class="sns-item"
          v-for="(item, index) in introData.snsList.reverse()"
          :key="index"
        >
          <button
            :class="{
              'icon-sns': true,
              blog: item.snsTypCd === 'COA01404',
              youtube: item.snsTypCd === 'COA01403',
              instagram: item.snsTypCd === 'COA01402',
              facebook: item.snsTypCd === 'COA01401',
            }"
            @click="goSns(item.snsPth)"
          >
            {{ item.snsTypNm }}
          </button>
        </li>
      </ul>
    </div>

    <div class="section">
      <strong class="title-section">프로필</strong>
      <ul class="key-text-list">
        <li>
          <span class="key">소속</span>
          <span class="val">{{ introData.aflcoNm }}</span>
        </li>
        <li>
          <span class="key">활동지역</span>
          <span class="val">
            {{ introData.arNm }} {{ introData.sggArNm }}
          </span>
        </li>
        <li v-if="introData.careerList.length > 0">
          <span class="key">경력</span>
          <div class="val">
            <p v-for="(item, index) in introData.careerList" :key="index">
              {{ item.crrCtt }}
            </p>
          </div>
        </li>
        <li v-if="introData.qualifyList.length > 0">
          <span class="key">자격사항</span>
          <div class="val">
            <p v-for="(item, index) in introData.qualifyList" :key="index">
              {{ item.qualNm }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <image-gallery :imageList="introData.photoList" />
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { getCoachIntro } from '@/api/modules/coach';

export default {
  name: 'coach-introduction',
  props: ['profileData'],
  components: {
    Swiper,
    SwiperSlide,
    imageGallery: () => import('@/views/modal/image-gallery.vue'),
  },
  data() {
    return {
      introData: {
        info: {},
        cchSno: null,
        arCd: '',
        arNm: '',
        sggArCd: '',
        sggArNm: '',
        pstNm: '',
        cchItrdCtt: '',
        chtgCnslWkdCtt: null,
        chtgCnslHrCtt: null,
        vdeoCnslWkdCtt: null,
        vdeoCnslHrCtt: null,
        chtgUseYn: true,
        vdeoUseYn: true,
        telCnslUseYn: true,
        cfntCnslUseYn: true,
        telCnslWkdCtt: '',
        telCnslHrCtt: '',
        cfntCnslWkdCtt: '',
        cfntCnslHrCtt: '',
        videoList: [],
        photoList: [],
        snsList: [],
        careerList: [],
        qualifyList: [],
      },
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
      cchSno: this.$route.query.seq,
      infoFlag: true, //공통정보 데이터 조회 여부
      scoreFlag: false, // 별점 통계 조회 여부
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // console.log(this.$route.params.seq);
  },
  beforeUpdate() {
    console.log('소개 data 부모한테 받아옴', this.introData);
  },
  methods: {
    async imgZoom() {
      await this.$_modalOpen({ name: 'imageGallery' });
    },
    async fetchData() {
      //핑글 코치 조회 - 소개
      try {
        const response = await getCoachIntro({
          cchSno: this.$route.query.seq,
          infoFlag: this.profileData.cchSno === null,
          scoreFlag: false,
        });
        console.log('소개 api', response);
        this.introData = response.data;
        //this.starScore = response.scoreStatistics;
        // console.log('소개 데이터', this.introData);
        if (response.data.info) {
          this.$emit('update:profileData', response.data.info);
        }
      } catch (e) {
        console.log(e);
      }
    },
    goSns(url) {
      console.log(url);
      window.open(url, '_blank');
    },
  },
};
</script>
<style scoped lang="scss">
.about-video {
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  background: $gray-30;
}
.bailiwick-list {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  align-items: center;
  .bailiwick-item {
    margin: 5px 5px 0 0;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: #f7f7f7;
    color: #888;
    font-size: 14px;
    font-weight: 500;
  }
}
.key-text-list {
  font-size: 14px;
  line-height: 20px;
  li {
    display: flex;
    padding: 15px 0;
    border-top: 1px solid $gray-30;
    &:last-child {
      padding-bottom: 0;
    }
    .key {
      flex: 0 0 70px;
      color: $gray-60;
    }
    .val {
      flex: 1 1 auto;
      color: $gray-70;
    }
  }
  &.consult {
    .key {
      color: $mint-60;
      &:before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 5px;
        vertical-align: -2px;
        background: no-repeat 0 0 / 16px auto;
      }
      &.chat:before {
        background-image: url('../../../assets/images/ic-chatting-16-o.svg');
      }
      &.call:before {
        background-image: url('../../../assets/images/ic-telephone-16-o.svg');
      }
      &.video:before {
        background-image: url('../../../assets/images/ic-video-16-gr-o.svg');
      }
      &.meet:before {
        background-image: url('../../../assets/images/ic-meet-16-o.svg');
      }
    }
  }
}

.sns-list {
  display: flex;
  align-items: center;
  margin-top: 15px;
  .sns-item {
    margin: 0 2.5px;
  }
  .icon-sns {
    width: 50px;
    height: 50px;
    background-size: 50px auto;
    text-indent: -99999px;
    &.blog {
      background-image: url('../../../assets/images/ic-blog-50-n.svg');
    }
    &.youtube {
      background-image: url('../../../assets/images/ic-youtube-50-n.svg');
    }
    &.instagram {
      background-image: url('../../../assets/images/ic-instagram-50-n.svg');
    }
    &.facebook {
      background-image: url('../../../assets/images/ic-facebook-50-n.svg');
    }
  }
}

.swiper {
}
.swiper-slide {
  padding-top: 56.25%;
  box-sizing: border-box;
  video,
  .zoom {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    img {
      width: auto;
      max-height: 100%;
      max-width: 100%;
    }
  }
}
</style>
