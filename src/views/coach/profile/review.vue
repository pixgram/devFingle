<template>
  <div>
    <strong class="item-title"> 상담 만족도 </strong>
    <total-rating :scoreStatistics="scoreStatistics" />
    <hr class="wide-gray" />
    <div class="title-group">
      <strong class="item-title"> 상담 후기 </strong>
      <div class="summary-group mt5">
        <div class="right">
          <form-select
            type="sort"
            v-model="sortData.value"
            :options="sortData.options"
          />
        </div>
      </div>
    </div>

    <comment-list :list="listData" />

    <infinite-loading @infinite="infiniteHandler($event, fetchData())">
      <div slot="spinner" />
      <div slot="no-results">
        <no-data>
          <template #icon>
            <i class="icon-ellipsis" />
          </template>
          <template #text> 첫 상담후기를 남겨주세요. </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
  </div>
</template>
<script>
import commentList from '@/components/comment-list';
import totalRating from '@/components/total-rating';
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList.js';
import { getCoachReview } from '@/api/modules/coach';
export default {
  name: 'coach-review',
  props: ['profileData'],
  components: {
    commentList,
    totalRating,
    infiniteLoading,
  },
  mixins: [infiniteMixin],
  data() {
    return {
      scoreStatistics: [],
      sortData: {
        options: [
          {
            value: 'newest',
            label: '최신',
          },
          {
            value: 'score',
            label: '평점높은순',
          },
        ],
        value: 'score',
      },
      totalElements: 50,
      page: 1,
      size: 10,
      listData: [
        {
          cchCnslSno: null,
          answCtt: '',
          hrspScr: null,
          cnslCtt: '',
          regDtm: '',
          mdfDtm: '',
          cchCtgrCd: '',
          cchCtgrNm: '',
          cnslLtpdStCd: '',
          cnslLtpdStNm: '',
          custSno: null,
          custNm: '',
          cchSno: null,
          cchNm: '',
          cchCtgCd: '',
          cchCtgNm: '',
        },
      ],
    };
  },
  async mounted() {
    this.listData = await this.fetchData();
  },
  methods: {
    async fetchData() {
      //핑글코치 상담후기 API
      try {
        const { data: response } = await getCoachReview({
          cchSno: this.$route.query.seq,
          infoFlag: this.profileData.cchSno === null,
          scoreFlag: true,
          orderType: this.sortData.value,
          page: this.page,
          size: this.size,
        });
        console.log('상담후기 response', response);
        this.scoreStatistics = await response.scoreStatistics;
        if (response.info) {
          this.$emit('update:profileData', response.info);
        }

        return await response.list;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.title-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  .item-title {
    margin-top: 0;
  }
}
.comment-list {
}
</style>
