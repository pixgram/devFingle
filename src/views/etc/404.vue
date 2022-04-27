<template>
  <div class="error-page">
    <div class="txt-box">
      <i class="icon-none" />
      <strong class="title">페이지를 찾을 수 없어요</strong>
      <p class="text">
        페이지가 사라졌거나 다른 페이지로<br />
        변경되었습니다. 메인 화면으로 이동해<br />
        다시 이용해주세요.
      </p>
    </div>
    <div class="flex-btn-group">
      <button type="button" @click="goBack" class="btn-primary-lg">
        이전 페이지
      </button>
    </div>
  </div>
</template>
<script>
import bridge from '@/utils/WebViewBridgeDefault';

export default {
  name: 'error-404',
  methods: {
    goBack() {
      bridge.callNative.closeWeb();
      this.$router.go(-2);
    },
  },
};
</script>
