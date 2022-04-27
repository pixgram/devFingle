<template>
  <container>
    <fade-title>보험몰</fade-title>

    <swiper class="swiper" :options="swiperBannerOpt" v-if="data.banners">
      <swiper-slide v-for="banner in data.banners" :key="banner.bnnrSno"
        ><router-link :to="banner.linkTypCdNm"
          ><img :src="banner.file.urlPth" alt="" /></router-link
      ></swiper-slide>
      <div class="swiper-pagination wide" slot="pagination"></div>
    </swiper>

    <sticky-item>
      <tab-item
        style="height: 51px"
        :list="tab.list"
        name="anchor"
        :active.sync="tab.active"
      />
    </sticky-item>

    <div v-for="(item, key) in data.insPdCtgrs" :key="key">
      <hr class="wide-gray" v-if="key > 0 || key < key.length" />
      <div class="lists" :id="item.insPdTypCd + item.insPdCtgrSno">
        <div class="tit-area">
          <h3 class="title-3">
            <span
              class="heading1"
              v-if="item.insPdTtlNm"
              v-html="item.insPdTtlNm"
            ></span>
            <span
              class="heading2"
              v-if="item.insPdSubTtlNm"
              v-html="item.insPdSubTtlNm"
            ></span>
          </h3>

          <router-link
            class="btn-txt2"
            :to="{
              name: 'insure-all',
              query: { insPdCtgrSno: item.insPdCtgrSno },
            }"
            >전체보기</router-link
          >
        </div>

        <ul v-if="initData">
          <li v-for="(data, idx) in item.insPds" :key="idx">
            <insure-item
              :title="data.insPdNm"
              :img="
                data.insPdTypCd == 'PRD00101'
                  ? data.inscoLogoUrl
                  : data.file.urlPth
              "
              :category="data.inscoNm"
              :desc="data.insPdCtt"
              :guide="data.dlbCtt"
              :insPdSno="data.insPdSno"
              :type="data.insPdTypNm"
              @click="linkTo(data)"
            />
          </li>
        </ul>
        <!--   <template v-if="item.cchBnnrExpoYn">
          <router-link to="/coach" class="banner">
            <img
              :src="
                require('@/assets/images/img-banner-insurance-mall-80@2x.jpg')
              "
              alt="보험 가입이 어렵다면? 핑글 코치의 도움을 받으세요!"
            />
          </router-link>
        </template>-->
      </div>
    </div>
    <template v-if="data.posts && data.posts.length > 0">
      <hr class="wide-gray" />
      <div class="post-banner-wrap">
        <div class="tit-area">
          <h3 class="title-3">
            <span class="heading1">알수록 힘이 되는</span>
            <span class="heading2">보험몰 콘텐츠</span>
          </h3>
          <router-link class="btn-txt2" :to="`/mall/post-all`"
            >전체보기</router-link
          >
        </div>
        <swiper class="post-banner" :options="swiperPostOpt">
          <swiper-slide v-for="(banner, idx) in data.posts" :key="idx">
            <router-link class="post-item" to="/">
              <img :src="banner.listImgPth" alt="" />
              <span class="post-info">
                <strong class="item-title">{{ banner.ttlNm }}</strong>
              </span>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </template>
    <insure-modal name="mall-modal" :data="insureModal" @updateConfirmModalData="updateConfirmModal" />
    <mall-confirm name="mall-confirm" :img="confirmImg" :title="confirmTitle" />
  </container>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import insureModal from '@/views/mall/modal/insure-modal';
import mallConfirm from '@/views/mall/modal/mall-confirm';
import { getMallMainData, getInsureItemDetail } from '@/api/modules/mall';
import bridge from '@/utils/WebViewBridgeDefault';

export default {
  name: 'mall-list',
  components: {
    insureModal,
    mallConfirm,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      initData: false,
      insureModal: {
        insPd: {
          exrLinkPth: ''
        }
      },
      confirmImg: '',
      confirmTitle: '',
      data: '',
      swiperBannerOpt: {
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: true,
      },
      swiperPostOpt: {
        slidesPerView: 'auto',
        spaceBetween: 10,
      },
      tab: {
        active: '',
        list: [],
      },
    };
  },
  async created() {
    //데이터 불러오기
    await this.initMallMainData();
    //엥커가 있으면 해당위치로 이동
    this.initAnchorMove();
  },
  methods: {
    reset() {
      this.insureModal = {
        insPd: {
          exrLinkPth: ''
        }
      };
    },
    async initMallMainData() {
      try {
        const { data } = await getMallMainData();
        const insPdCtgrs = data.insPdCtgrs;
        this.data = data;
        this.tab.active =
          data.insPdCtgrs[0].insPdTypCd + data.insPdCtgrs[0].insPdCtgrSno; //페이지 진입시 첫번째 상품에 활성 표시

        insPdCtgrs.forEach((element) => {
          this.tab.list.push({
            title: element.insPdCtgrNm,
            anchor: element.insPdTypCd + element.insPdCtgrSno, //엥커 id값을 만듬
          });
        });

        this.initData = true;
      } catch (e) {
        console.log(e);
      }
    },
    updateConfirmModal(data) {
      this.confirmImg = data.confirmImg;
      this.confirmTitle = data.confirmTitle;
    },
    async linkTo(item) {
      if (item.exrLinkYn) {
        this.confirmImg = item.files ? item.files[0].urlPth : '';
        this.confirmTitle = item.inscoNm;
        const t = await this.$_modalOpen({ name: 'mall-confirm' });

        if (t) {
          console.log(item.inscoNm);
          console.log(item.exrLinkPth);
          // - 브릿지이동 외부 링크
          bridge.callNative.moveViewControl('outlink', '', item.exrLinkPth);
        }
      } else {
        const insPdSno = item.insPdSno;
        const { data } = await getInsureItemDetail({ insPdSno: insPdSno });
        this.insureModal = data;
        await this.$_modalOpen({ name: 'mall-modal' });
      }
    },
    initAnchorMove() {
      this.$nextTick(() => {
        const id = this.$route.query.anchor;

        if (id !== undefined) {
          const targetY = this.offset(document.getElementById(id)).y;
          const stickies = Array.from(
            document.querySelectorAll('.sticky-wrap')
          );

          const stickyHeight = stickies.reduce((acc, el) => {
            const height = el.offsetHeight;
            return acc + height;
          }, 0);

          window.scrollTo(0, targetY - stickyHeight + 1);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.swiper-container {
  margin: 0 -20px 12px -20px;

  .swiper-slide {
    a {
      display: block;
      padding: 0 20px;
      overflow: hidden;
      border-radius: 10px;
    }

    img {
      border-radius: 10px;
      overflow: hidden;
    }
  }
}

.sticky-wrap + .lists {
  margin-top: 33px;
}

.tit-area {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .heading1 {
    display: block;
    color: #000;
  }

  .btn-txt2 {
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 3px;
  }
}

.lists {
  padding-top: 30px;
  //height: 500px;
  ul {
    margin-top: 20px;

    li + li {
      margin-top: 15px;
    }
  }

  .banner {
    overflow: hidden;
    border-radius: 10px;
    margin-top: 15px;
  }
}

.post-banner-wrap {
  padding-top: 30px;
}
.post-banner {
  margin: 20px -20px 0 -20px;
  padding: 0 20px;

  a {
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 10px;
  }

  .post-info {
    display: block;
    padding: 20px;
    font-size: 12px;
    text-align: left;

    .item-title {
      margin-top: 0;
      font-weight: 500;
    }
  }
}
.banner {
  display: block;
  img {
    vertical-align: top;
  }
}
::v-deep .sticky-item {
  .tab-wrap > .tab-line {
    li {
      i {
        display: none;
      }
      &.active i {
        display: inline-block;
      }
    }
  }
}
</style>
