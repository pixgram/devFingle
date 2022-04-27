<template>
  <div class="error-page">
    <div class="txt-box">
      <i class="icon-none" />
      <strong class="title">시스템 점검 안내</strong>
      <p class="text">
        서비스 이용에 불편을 드려 죄송합니다.<br />
        안정적인 서비스 제공을 위해 정기적인 시스템 점검을 진행 중입니다.<br />
        점검시간 동안 사이트 일부 서비스 사용이 제한되니 양해 부탁드립니다.
      </p>
    </div>
    <div class="flex-btn-group">
      <router-link to="/" class="btn-primary-lg">메인</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inspection',
};
</script>
