<template>
  <ul class="sns-list">
    <li class="item">
      <button type="button" class="btn-sns" @click="shareTo('kakao')">
        <span class="icon-kakao"></span>
        <span class="text">카카오톡</span>
      </button>
    </li>
    <li class="item" v-if="!isDeskTop">
      <button type="button" class="btn-sns" @click="shareTo('sms')">
        <span class="icon-sms"></span>
        <span class="text">문자</span>
      </button>
    </li>
    <template v-if="copyLinkType">
      <li class="item">
        <button type="button" class="btn-sns" @click="shareTo('link')">
          <span class="icon-copy"></span>
          <span class="text">링크복사</span>
        </button>
      </li>
    </template>
    <template v-else>
      <li class="item">
        <button type="button" class="btn-sns" @click="shareTo('link')">
          <span class="icon-copy"></span>
          <span class="text">링크복사</span>
        </button>
      </li>
    </template>
  </ul>
</template>

<script>
import { share } from '@/utils/share.js';
export default {
  name: 'sns-list',
  props: {
    copyLinkType: Boolean,
  },
  data() {
    return {
      isDeskTop: false
    }
  },
  async created() {
    const loadedKakaoApi = await share.loadScript(
      'https://developers.kakao.com/sdk/js/kakao.js'
    );

    if (loadedKakaoApi) {
      if (!window.Kakao.isInitialized()) {
        share.kakao.init();
      }
    }

    if ("ontouchstart" in document.documentElement) {
      this.isDeskTop = false;
    } else {
      this.isDeskTop = true;
    }
  },
  methods: {
    async shareTo(snsName) {
      const shareData = {
        title: this.getFromMetaOg('title'),
        description: this.getFromMetaOg('description'),
        linkUrl: this.getFromMetaOg('shareurl'),
        imgUrl: this.getFromMetaOg('image'),
        buttonName: this.getFromMetaOg('btnname'),
      };
      const result = await share.sendTo(snsName, shareData);
      if (snsName === 'link' && result) {
        this.toast('링크가 복사되었어요.');
      }
    },
    getFromMetaName(name) {
      return document.querySelector(`meta[name=${name}]`).content;
    },
    getFromMetaOg(name) {
      return document.querySelector('meta[property="og:' + name + '"]').content;
    },
  },
};
</script>

<style scoped lang="scss">
.sns-list {
  display: flex;
  justify-content: center;
  padding: 0 15px;
  .item {
    flex: 0 0 80px;
    .btn-sns {
      display: block;
      width: 100%;
      [class^='icon'] {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
        border-radius: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 40px auto;
      }
      .text {
        display: block;
        margin-top: 10px;
        font-size: 13px;
        line-height: 18px;
        color: $gray-60;
        font-weight: 400;
      }
      [class*='kakao'] {
        background-image: url(../assets/images/ic-kakao-60-n.svg);
      }
      [class*='sms'] {
        background-image: url(../assets/images/ic-message-60-n.svg);
      }
      [class*='link'] {
        background-image: url(../assets/images/ic-share-40-n.svg);
      }
      [class*='copy'] {
        background-image: url(../assets/images/ic-link-60-n.svg);
      }
    }
    & + .item {
      margin-left: 5px;
    }
  }
}
</style>
