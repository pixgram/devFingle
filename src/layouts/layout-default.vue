<template>
  <div id="wrap">
    <page-transition>
      <keep-alive :include="keepAliveList">
        <router-view />
      </keep-alive>
    </page-transition>
  </div>
</template>
<script>
import PageTransition from '@/components/page-transition';
//import { mapMutations } from 'vuex';
import keepAliveList from '@/utils/keep-alive-list';
export default {
  name: 'LayoutDefault',
  components: { PageTransition },
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  /*methods: {
    ...mapMutations('fadeTitle', ['TITLE_OPACITY']),
  },*/
  data() {
    return {
      keepAliveList: null,
    };
  },
  created() {
    this.keepAliveList = keepAliveList;
  },
};
</script>
