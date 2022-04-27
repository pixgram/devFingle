<template>
  <container headerType="titleOnly">
    <div class="result-top">
      <div class="type-area">
        <div class="image"></div>
        <div class="type-title">
          <p class="text mt0">모든 영역이 고르게 우수한</p>
          <h3 class="title-2 mt5">팔방미인형</h3>
        </div>
      </div>
      <h4 class="title-3">특징</h4>
      <p class="text">
        (고객이름)님은 유형별 특징 노출 영역 유형별 특징 노출 영역 유형별 특징
        노출 영역 유형별 특징 노출 영역 유형별 특징 노출 영역 유형별 특징 노출
        영역 유형별 특징 노출 영역 유형별 특징 노출 영역 유형별 특징 노출 영역
      </p>
    </div>
    <div class="result-body mt30">
      <div class="info-box">
        <strong class="title strength">강점</strong>
        <hr class="line-gray" />
        <p class="text">
          (고객이름)님은 강점 내용 노출 영역 강점 내용 노출 영역 강점 내용 노출
          영역 강점 내용 노출 영역 강점 내용 노출 영역 강점 내용 노출 영역 강점
          내용 노출 영역 강점 내용 노출 영역 강점 내용 노출 영역
        </p>
      </div>
      <div class="info-box">
        <strong class="title weak">취약점</strong>
        <hr class="line-gray" />
        <p class="text">
          (고객이름)님은 취약점 내용 노출 영역 취약점 내용 노출 영역 취약점 내용
          노출 영역 취약점 내용 노출 영역 취약점 내용 노출 영역 취약점 내용 노출
          영역 취약점 내용 노출 영역 취약점 내용 노출 영역 취약점 내용 노출 영역
          취약점 내용 노출 영역 취약점 내용 노출 영역 취약점 내용 노출 영역
          취약점 내용 노출 영역 취약점 내용 노출 영역
        </p>
      </div>
      <div class="flex-btn-group mt30">
        <button type="button" class="btn-line-gray-lg">
          스타일링에 대해 더 알아보기
        </button>
      </div>
    </div>
    <div class="result-type mt30">
      <strong class="title">이런 유형도 있어요!</strong>
      <ul class="list">
        <li v-for="item in list" :key="item.type">
          <div class="image">
            <img src="../../assets/images/img-character-50@2x.png" alt="" />
          </div>
          <p class="text ty2 mt15">{{ item.text }}</p>
          <strong class="sub-title">{{ item.name }}</strong>
        </li>
      </ul>
    </div>
    <hr class="wide-gray" />
    <div class="result-bottom mt30">
      <div class="share-area">
        <snsList :copyLinkType="true" />
      </div>
      <p class="text ty2 mt30">
        보험, 건강, 재무, 은퇴 진단을 받으면 스타일링 결과를<br />
        확인할 수 있어요.
      </p>
      <div class="flex-btn-group mt10">
        <button type="button" class="btn-primary-lg" @click="goto()">
          맞춤 스타일링 받으러 가기
        </button>
      </div>
    </div>
  </container>
</template>

<script>
import snsList from '@/components/sns-list';
import bridge from '@/utils/WebViewBridgeDefault';

export default {
  name: 'result',
  components: {
    snsList,
  },
  /* eslint-disable */
  metaInfo() {
    return {
      meta: [
        {
          property: 'og:title',
          content: '핑글 나만의 스타일링 서비스',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          content: '보험, 건강, 재무, 은퇴 진단으로 나의 라이프 스타일 유형을 알아보세요.',
          vmid: 'og:description',
        },
        {
          property: 'og:image',
          content: window.location.protocol + '//' + window.location.host + '/images/img_share_styling.png',
          vmid: 'og:image',
        },
        {
          property: 'og:shareurl',
          content: window.location.protocol + '//' + window.location.host + this.$route.fullPath,
          vmid: 'og:shareurl',
        },
        {
          property: 'og:btnname',
          content: '스타일링 결과 보기',
          vmid: 'og:btnname',
        },
      ],
    }
  },
  data() {
    return {
      list: [
        {
          type: 6,
          text: '재무관리에 큰 개선이 필요한',
          name: '플렉스형',
        },
        {
          type: 13,
          text: '건강 빼면 남는 게 없는',
          name: '건강의존형',
        },
      ],
    };
  },
  methods: {
    goto() {
      bridge.callNative.moveViewControl('native', 'CFGM0102T001', '');
    },
    copyTo() {
      const dummy = document.createElement('input');
      const currentUrl = window.document.location.href;
      document.body.appendChild(dummy);
      dummy.value = currentUrl;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      this.toast('링크가 복사되었어요.');
    },
  },
};
</script>

<style scoped lang="scss">
[class^='result'] {
  .title {
    font-size: 18px;
    line-height: 26px;
  }
  .text {
    margin-top: 15px;
    font-size: 14px;
    line-height: 20px;
    //word-break: keep-all;
    &.ty2 {
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      color: $gray-70;
    }
  }
  [class^='btn'] {
    font-size: 14px;
  }
}
.result-top {
  .type-area {
    position: relative;
    width: calc(100% + 40px);
    margin-left: -20px;
    padding: 30px 0 40px;
    background: #fdf6f0;
    box-sizing: border-box;
    .image {
      width: 100%;
      height: 240px;
      background: rgba(0, 0, 0, 0.3);
    }
    .type-title {
      position: absolute;
      left: 50%;
      bottom: -57px;
      width: calc(100% - 80px);
      padding: 15px 20px;
      text-align: center;
      border: 1px solid $gray-30;
      border-radius: 10px;
      background: $white;
      transform: translateX(-50%);
    }
    & + .title-3 {
      margin-top: 85px;
    }
  }
}
.result-body {
  width: calc(100% + 40px);
  margin-left: -20px;
  padding: 30px 20px;
  background: $gray-20;
  box-sizing: border-box;
  .info-box {
    padding: 15px 20px;
    border: 1px solid $gray-30;
    border-radius: 10px;
    background: $white;
    & + .info-box {
      margin-top: 20px;
    }
    .title {
      position: relative;
      display: block;
      padding: 3px 0;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 32px;
        height: 32px;
      }
      &.strength {
        &::before {
          background: url('../../assets/images/ic-styling-strength-32-o.svg')
            no-repeat center;
        }
      }
      &.weak {
        &::before {
          background: url('../../assets/images/ic-styling-weak-32-o.svg')
            no-repeat center;
        }
      }
    }
  }
}
.result-type {
  .list {
    display: flex;
    width: 100%;
    margin-top: 15px;
    li {
      flex: 0 0 calc(50% - 5px);
      box-sizing: border-box;
      .image {
        padding: 20px 0;
        border: 1px solid $gray-30;
        border-radius: 10px;
      }
      .sub-title {
        margin-top: 0;
        text-align: center;
      }
      & + li {
        margin-left: 10px;
      }
    }
  }
}
.result-bottom {
  .share-area {
    padding: 20px;
    background: $gray-20;
    border-radius: 20px;
  }
}
</style>
