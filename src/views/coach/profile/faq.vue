<template>
  <div>
    <div class="title-group">
      <h2 class="title-4">자주 묻는 질문</h2>
      <button
        type="button"
        class="btn-txt2"
        @click="$_modalOpen({ name: 'directInquiry' })"
      >
        직접 문의 하기
      </button>
    </div>

    <accordion-element :list="listData" :show="0" class="faq-list">
      <template #title="{ item }">
        <span class="title" v-html="item.qustCtt" v-if="item.qustCtt" />
      </template>
      <template #cont="{ item }">
        <div class="answer" v-html="item.answCtt" v-if="item.answCtt" />
      </template>
    </accordion-element>
    <infinite-loading @infinite="infiniteHandler($event, fetchData())">
      <div slot="spinner" />
      <div slot="no-results">
        <no-data>
          <template #icon>
            <i class="icon-ellipsis" />
          </template>
          <template #text> 등록된 문의가 없습니다.</template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>

    <!-- 직접문의하기 팝업 -->
    <directInquiry />
  </div>
</template>
<script>
import accordionElement from '@/components/accordion-element';
import directInquiry from '@/views/coach/modal/direct-inquiry';
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList.js';
import { getCoachFaq } from '@/api/modules/coach';
export default {
  name: 'coach-faq',
  components: { accordionElement, directInquiry, infiniteLoading },
  mixins: [infiniteMixin],
  props: ['profileData'],
  data() {
    return {
      moreOn: [],
      totalElements: 0,
      page: 1,
      size: 10,
      list: [],
      totalPages: 0,
      isEmpty: false,
      isPrev: false,
      isNext: false,
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
    //this.listData = await this.fetchData();
    //await this.fetchData();
  },
  methods: {
    async fetchData() {
      //핑글코치 상담후기 API
      try {
        const { data: response } = await getCoachFaq({
          cchSno: this.$route.query.seq,
          infoFlag: this.profileData.cchSno === null,
          scoreFlag: false,
          page: this.page,
          size: this.size,
        });
        console.log('상담안내 res', response);
        if (response.info) {
          this.$emit('update:profileData', response.info);
        }
        return await response.list;
      } catch (e) {
        console.log(e);
      }
    },
    moreClick(key) {
      const idx = this.moreOn.findIndex((el) => el === key);
      if (idx === -1) {
        this.moreOn.push(key);
      } else {
        this.moreOn.splice(idx, 1);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.title-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 23px;
}
</style>
