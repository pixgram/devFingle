<template>
  <modal
    :name="name"
    :type="type"
    @open="modalOpenEvent"
    @close="modalCloseEvent"
  >
    <template #header>
      <h2 class="modal-title">&nbsp;</h2>
    </template>
    <template #content>
      <view-detail :modal="true" />
      <modalAppDown name="app-down" />
    </template>
  </modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import viewDetail from '@/views/post/view-detail';

export default {
  name: 'post-view',
  components: {
    viewDetail,
    modalAppDown: () => import('@/views/post/modal/app-down.vue'),
  },
  props: {
    name: String,
    type: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('deviceInfo', ['DEVICE_INFO']),
    ...mapGetters('deviceInfo', ['DEVICE_CODE']),
  },
  methods: {
    modalOpenEvent() {
      //웹 체크
      if (this.DEVICE_CODE.lginDvCd === 'CUS00503') {
        this.$_modalOpen({ name: 'app-down' });
      }
    },
    modalCloseEvent() {
      if (this.$route.query.keyword) {
        this.$router.replace({
          query: { keyword: this.$route.query.keyword },
        });
      } else {
        this.$router.replace({
          query: { category: this.$route.query.category },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
