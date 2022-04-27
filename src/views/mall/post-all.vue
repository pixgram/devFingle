<template>
  <container>
    <fade-title>보험몰 콘텐츠</fade-title>
    <ul class="mallList">
      <mall-list v-for="item in listData" :key="item" :item="item" />
    </ul>

    <infinite-loading
      @infinite="infiniteHandler($event, fetchData())"
      :identifier="infiniteId"
    >
      <div slot="spinner" />
      <div slot="no-results">
        <no-data>
          <template #icon>
            <i class="icon-none" />
          </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
  </container>
</template>

<script>
import mallList from '@/components/mall-list';
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList';
import { getInsureCategoryList } from '@/api/modules/mall';

export default {
  name: 'post-all',
  components: {
    mallList,
    infiniteLoading,
  },
  mixins: [infiniteMixin],
  inheritAttrs: false,
  data() {
    return {
      noMoreItem: false,
      listData: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const { data: response } = await getInsureCategoryList({
          page: this.page,
          size: this.size,
          postCtgrCd: 'CTS00106',
        });

        if (response.list.length == 0) {
          //불러오는 데이터가 없는 경우
          this.noMoreItem = true;
        }
        return response.list;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.mallList {
  li {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
}
</style>
