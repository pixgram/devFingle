<template>
  <container headerType="modal">
    <template v-if="thisItem.postCtgrCd">
      <view-detail v-model="thisItem" />
    </template>
  </container>
</template>
<script>
import viewDetail from './view-detail';
export default {
  name: 'post-view',
  components: { viewDetail },
  /* eslint-disable */
  metaInfo() {
    return {
      meta: [
        {
          property: 'og:title',
          content: '꼭 필요한 놓치면 안 될 꿀팁',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          content:
            '똑똑한 금융 생활을 위해 꼭 필요한 정보, 핑글의 엄선된 포스트를 만나보세요.',
          vmid: 'og:description',
        },
        {
          property: 'og:image',
          content:
            window.location.protocol +
            '//' +
            window.location.host +
            '/images/img_share_post.png',
          vmid: 'og:image',
        },
        {
          property: 'og:shareurl',
          content:
            window.location.protocol +
            '//' +
            window.location.host +
            this.$route.fullPath,
          vmid: 'og:shareurl',
        },
        {
          property: 'og:btnname',
          content: '포스트 확인하기',
          vmid: 'og:btnname',
        },
      ],
    };
  },
  data() {
    return {
      thisItem: {
        postCtgrCd: null,
        postSno: null,
      },
    };
  },
  created() {
    this.thisItem.postCtgrCd = this.$route.query.category;
    this.thisItem.postSno = this.$route.query.seq;
  },
};
</script>
<style scoped></style>
