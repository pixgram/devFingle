<template>
  <container class="home" :header="false">
    home
    <div style="padding: 10px">
      <button class="btn-primary-sm" type="button" @click="getToken">
        get Token
      </button>
    </div>
    <div style="font-size: 15px; padding: 30px; background-color: #efd525">
      <span style="display: block; padding-bottom: 10px; color: #fe5600"
        >위 버튼에 대한 콜백함수 실행시 업데이트 됩니다.</span
      >
      callBackUpdate: {{ bridgeCallBackTest }}
    </div>

    <div>
      <a href="http://localhost:8080/mall" target="_blank">새창</a>
      <router-link to="/cs/faq">faq</router-link>

      <!--      <editor :height="300" />-->
    </div>

    <button type="button" @click="$_modalOpen({ name: 'counseling_review' })">
      modal
    </button>

    <counselingReview name="counseling_review" />
  </container>
</template>
<script>
import bridge from '@/utils/WebViewBridgeDefault';
export default {
  name: 'Home',
  computed: {
    bridgeCallBackTest() {
      return this.$store.getters['bridgeStore/token'];
    },
  },
  methods: {
    getToken() {
      // 네이티브 함수 호출
      console.log(13242);
      bridge.getToken();
    },
  },
  components: {
    counselingReview: () => import('@/views/coach/modal/counseling-review'),
  },
};
</script>
