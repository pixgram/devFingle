<template>
  <h1 class="fade-title" ref="title">
    <slot>{{ title }}</slot>
  </h1>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'fade-title',
  data() {
    return {
      title: '',
    };
  },
  destroyed() {
    this.FADE_TARGET(null);
  },
  deactivated() {
    this.FADE_TARGET(null);
  },
  mounted() {
    this.title = this.$route.meta.title || '';
    this.FADE_TARGET(this.$refs.title);
  },
  activated() {
    this.FADE_TARGET(this.$refs.title);
  },
  methods: {
    ...mapMutations('fadeTitle', ['FADE_TARGET']),
  },
};
</script>
<style scoped lang="scss">
.fade-title {
  line-height: 30px;
  padding: 15px 0;
  font-size: 24px;
}
</style>
