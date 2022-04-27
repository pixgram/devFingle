<template>
  <container>
    <!--
    TODO 이정민: API 작업대기(개발 API 수정중)
    -->
    <div class="coach-profile-top">
      <div class="photo">
        <img
          :src="profileData.profImgFile.urlPth"
          :alt="profileData.cchNm"
          @error="noImage"
        />
        <!-- <button
          type="button"
          :class="{ 'btn-badge': true, 'ani-bounce': badgeAni }"
          v-if="profileData.badgeList.length > 0"
          @click="$_modalOpen({ name: 'badgeBox' })"
        >
          <span class="txt">+2</span>
        </button>-->
      </div>
      <div class="info">
        <strong class="name">
          {{ profileData.cchNm }}
          {{ profileData.cchDvNm }}
        </strong>
        <div class="coach-logo">
          <img
            :src="profileData.aflcoImgFile.urlPth"
            :alt="profileData.aflcoNm"
            @error="noImage"
          />
        </div>
        <p class="coach-pr">{{ profileData.cchItrdCtt }}</p>
      </div>
      <ul class="consult-type">
        <li class="consult-item" :class="{ active: profileData.chtgUseYn }">
          <i class="icon-consult chat"></i>
          <span class="txt">채팅</span>
        </li>
        <li class="consult-item" :class="{ active: profileData.telCnslUseYn }">
          <i class="icon-consult call"></i>
          <span class="txt">전화</span>
        </li>
        <li class="consult-item" :class="{ active: profileData.cfntCnslUseYn }">
          <i class="icon-consult meet"></i>
          <span class="txt">대면</span>
        </li>
        <li class="consult-item" :class="{ active: profileData.telCnslUseYn }">
          <i class="icon-consult video"></i>
          <span class="txt">화상</span>
        </li>
      </ul>
    </div>

    <div class="view-util-group">
      <button type="button" class="btn-util" @click="snsShareOpen">
        <i class="icon-share"></i>공유
      </button>
      <span class="btn-util">
        <heart
          v-model="like"
          :num.sync="hartNum"
          msg="나의 Pick 목록에 저장했습니다."
        />
      </span>
    </div>

    <sticky-item>
      <tab-item name="tab" :list="tab.list" :active.sync="tab.active" />
    </sticky-item>
    <component :is="componentItem" :profileData.sync="profileData" />
    <!--
    TODO: 클릭시 스펙트라 연동(앱 미설치자는 앱 다운로드페이지)
    -->
    <div class="btm-btn-group">
      <div class="flex-btn-group">
        <button
          type="button"
          :class="{
            'btn-primary-md': true,
            purple: profileData.cchCtgNm === '금융',
            orange: profileData.cchCtgNm === '건강',
          }"
          @click="moveTo"
        >
          {{ profileData.cchNm }} 핑글코치와 상담하기
        </button>
      </div>
    </div>

    <!--  핑글 앱 실행하기 팝업  -->
    <run-app />
    <!--  뱃지 현황 팝업
    <badge-box :badgeList.sync="profileData.badgeList" />-->
    <sns-share />
  </container>
</template>
<script>
import heart from '@/components/heart.vue';
import introduction from './introduction.vue';
import review from './review.vue';
import faq from './faq.vue';
import bridge from '@/utils/WebViewBridgeDefault';
export default {
  name: 'coach-profile',
  components: {
    heart,
    introduction,
    review,
    faq,
    runApp: () => import('@/views/coach/modal/run-app'),
    //badgeBox: () => import('@/views/coach/modal/badge-box'),
    snsShare: () => import('@/views/modal/sns'),
  },
  /* eslint-disable */
  metaInfo() {
    return {
      meta: [
        {
          property: 'og:title',
          content: '다양한 분야의 핑글코치',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          content:
            '보험, 금융, 건강에 대해 궁금한 점은 원하는 분야의 전문가에게 코칭 받으세요.',
          vmid: 'og:description',
        },
        {
          property: 'og:image',
          content: window.location.protocol + '//' + window.location.host + '/images/img_share_coach.png',
          vmid: 'og:image',
        },
        {
          property: 'og:shareurl',
          content: window.location.protocol + '//' + window.location.host + this.$route.fullPath,
          vmid: 'og:shareurl',
        },
        {
          property: 'og:btnname',
          content: '핑글코치 프로필 보기',
          vmid: 'og:btnname',
        },
      ],
    };
  },
  data() {
    return {
      badgeAni: false,
      //코치공통정보
      profileData: {
        aflcoImgFile: {
          urlPth: '',
        },
        badgeList: [],
        profImgFile: {
          urlPth: '',
        },
        cchSno: null,
        cchNm: '',
        cchId: '',
        brdt: '',
        cchStCd: '',
        cchStNm: '',
        arCd: '',
        arNm: '',
        sggArCd: '',
        sggArNm: '',
        emlAdr: '',
        sexCd: '',
        ccoCd: '',
        ccoNm: '',
        ptblTlno: '',
        pick: true,
        cchCtgCd: '',
        cchCtgNm: '',
        cchDvCd: '',
        cchDvNm: '',
        pstNm: '',
        chtgUseYn: false,
        vdeoUseYn: false,
        telCnslUseYn: false,
        cfntCnslUseYn: false,
        plfmRcmScr: 0,
        custChoTims: 0,
        cnslTims: 0,
        ltpdTims: 0,
        crrYcnt: 0,
        avgHrspScr: 0,
        categoryList: [],
      },
      like: false,
      hartNum: 1,
      tab: {
        list: [
          {
            title: '소개',
            id: 'introduction',
          },
          {
            title: '상담후기',
            id: 'review',
          },
          {
            title: '상담안내',
            id: 'faq',
          },
        ],
        active: 'introduction',
      },
      componentData: ['introduction', 'review', 'faq'],
    };
  },
  computed: {
    componentItem() {
      return this.componentData[
        Math.max(
          this.componentData.findIndex((el) => el === this.tab.active),
          0
        )
      ];
    },
  },
  mounted() {
    setTimeout(() => {
      this.badgeAni = true;
    }, 700);
  },
  updated() {
    //console.log('공통데이터 호출');
  },
  methods: {
    moveTo() {
      if (
        this.$store.getters['deviceInfo/DEVICE_CODE'].lginDvCd === 'CUS00504'
      ) {
        bridge.callNative.moveCoachConsulting(this.$route.query.seq);
      } else {
        //todo app
      }
    },
    snsShareOpen() {
      this.$_modalOpen({ name: 'sns-share' });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .contents {
  padding-bottom: 0;
}
.coach-profile-top {
  position: relative;
  background-color: #fff;
  margin: 0 -20px;
  padding: 0 0 20px;
  text-align: center;
  .photo {
    position: relative;
    padding-top: 77.7777%;
    background-color: lightgray;

    &:after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      padding-top: 13.3333%;
      content: '';
      display: block;
      background: url('../../../assets/images/img_mask_coach.svg') no-repeat 0
        100% / 100% auto;
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
    }
  }
  .btn-badge {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
    width: 50px;
    height: 50px;
    padding: 0;
    background: url('../../../assets/images/ic-badge-50.svg') no-repeat 0 0 /
      50px auto;
    text-align: left;
    animation: animateAppear 0.7s ease-out forwards;
    .txt {
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
      color: #fff;
      vertical-align: 2px;
    }
    &.ani-bounce {
      animation: animateBounce 6.8s linear infinite;
    }
  }
  .info {
    padding: 0 20px;
    .name {
      display: block;
      margin-top: 20px;
      font-size: 20px;
      line-height: 28px;
    }
    .coach-logo {
      height: 20px;
      margin: 5px auto 0;
      text-align: center;
      img {
        width: auto;
        height: 100%;
      }
    }
    .coach-pr {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: #888;
    }
  }

  .consult-type {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .consult-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 9px;
      .icon-consult {
        width: 32px;
        height: 32px;
        background-size: 32px auto;
        &.chat {
          background-image: url(../../../assets/images/ic-chatting-32-n.svg);
        }
        &.call {
          background-image: url(../../../assets/images/ic-telephone-32-n.svg);
        }
        &.meet {
          background-image: url(../../../assets/images/ic-meet-32-n.svg);
        }
        &.video {
          background-image: url(../../../assets/images/ic-video-32-n.svg);
        }
      }
      .txt {
        font-size: 12px;
        line-height: 18px;
        color: #bbb;
        font-weight: 600;
      }
      &.active {
        .txt {
          color: $mint-60;
        }
        .icon-consult {
          &.chat {
            background-image: url(../../../assets/images/ic-chatting-32-o.svg);
          }
          &.call {
            background-image: url(../../../assets/images/ic-telephone-32-o.svg);
          }
          &.meet {
            background-image: url(../../../assets/images/ic-meet-32-o.svg);
          }
          &.video {
            background-image: url(../../../assets/images/ic-video-32-o.svg);
          }
        }
      }
    }
  }
}
.view-util-group {
  display: flex;
  margin: 0 -20px;
  border-top: 8px solid #f7f7f7;
  border-bottom: 8px solid #f7f7f7;
  .btn-util {
    position: relative;
    flex: 0 1 50%;
    height: 50px;
    font-size: 14px;
    font-weight: 400;
    & + .btn-util {
      &:before {
        position: absolute;
        left: 0;
        top: 15px;
        content: '';
        display: inline-block;
        height: 20px;
        border-right: 1px solid #eee;
      }
    }
    .interest {
      height: 100%;
    }
    .icon-share {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      vertical-align: -3px;
      background: url(../../../assets/images/ic-16-share-gr-n.svg) no-repeat 0 0 /
        16px auto;
    }
  }
}
::v-deep .section {
  margin: 0 -20px;
  padding: 30px 20px;
  & + .section {
    border-top: 8px solid #f7f7f7;
  }
  .title-section {
    display: block;
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: #000;
  }
}
.flex-btn-group {
  .btn-primary-lg {
    &.purple {
      background-color: #7e29ff;
    }
    &.orange {
      background-color: #ff7031;
    }
  }
}
.tab-wrap {
  &.line {
    height: 51px;
  }
}
@keyframes animateAppear {
  0% {
    bottom: -10px;
    opacity: 0;
  }
  100% {
    bottom: 0;
    opacity: 1;
  }
}
@keyframes animateBounce {
  0% {
    bottom: 0;
  }
  70% {
    bottom: 0;
  }
  75% {
    bottom: 5px;
  }
  80% {
    bottom: 0;
  }
  85% {
    bottom: 5px;
  }
  90% {
    bottom: 0;
  }
  95% {
    bottom: 5px;
  }
  100% {
    bottom: 0;
  }
}
</style>
