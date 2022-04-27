<template>
  <div class="error-page">
    <div class="txt-box">
      <i class="icon-none" />

      <strong class="title">서버에 오류가 발생했어요!</strong>
      <p class="text">
        일시적으로 서버에 문제가 발생하여<br />
        서비스 이용이 원활하지 않습니다.<br />
        잠시 후, 다시 이용해 주세요
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
  name: 'error-500',
  methods: {
    goBack() {
      bridge.callNative.closeWeb();
      this.$router.go(-2);
    },
  },
};
</script>
