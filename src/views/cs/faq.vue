<template>
  <container>
    <fade-title />
    <sticky-item>
      <form-input
        type="search"
        placeholder="핑글 앱에 궁금한 점을 검색해보세요."
        v-model="keyword"
        ref="searchInput"
        @keydown.enter="search"
      >
        <button type="button" class="search" @click="search">검색</button>
      </form-input>
      <tab-item
        :list="category.list"
        name="category"
        :active.sync="category.active"
        type="round"
      />
    </sticky-item>
    <hr class="wide-gray mt0" />

    <template>
      <div v-if="afterKeyword && totalElements" class="search-total">
        <span class="mint-50">‘{{ afterKeyword }}’</span>에 대한 검색결과가
        {{ totalElements }}건 있습니다.
      </div>
      <accordion-element :list="listData" class="faq-list">
        <template #title="{ item }">
          <span class="title" v-html="item.ttlNm" />
        </template>
        <template #cont="{ item }">
          <div class="answer" v-html="item.htmlCtt" />
        </template>
      </accordion-element>
    </template>
    <infinite-loading
      @infinite="infiniteHandler($event, fetchData())"
      :identifier="infiniteId"
    >
      <div slot="spinner" />
      <div slot="no-results">
        <no-data v-if="afterKeyword">
          <template #icon>
            <i class="icon-none" />
          </template>
          <template #text>
            <template>
              ‘{{ afterKeyword }}’ 에 대한 검색 결과가 없습니다.
            </template>
          </template>
        </no-data>
        <no-data v-else>
          <template #icon>
            <i class="icon-ellipsis" />
          </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
    <router-link to="/cs/qa" class="box-link">
      <img
        :src="require('@/assets/images/img-banner-faq-54@2x.jpg')"
        alt="원하는 답변을 찾지 못하셨나요? 1:1문의를 이용해 보세요"
      />
    </router-link>
  </container>
</template>
<script>
import FadeTitle from '@/components/common/fade-title';
import accordionElement from '@/components/accordion-element';
import { getfaqList, getfaqCategory } from '@/api/modules/cs';
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList';
export default {
  name: 'faq',
  components: { FadeTitle, accordionElement, infiniteLoading },
  mixins: [infiniteMixin],
  data() {
    return {
      afterKeyword: '',
      keyword: '',
      totalElements: '',
      category: {
        active: '',
        list: [{ id: '', title: '전체' }],
      },
    };
  },
  async created() {
    this.keyword = this.$route.query.keyword || '';
    this.category.active = this.$route.query.category || '';
    await this.fetchCategory();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    this.changeSort();
    next();
  },
  methods: {
    search() {
      this.keyword = this.$refs.searchInput.value;
      this.$router
        .push({
          query: { ...this.$route.query, keyword: this.keyword },
        })
        .catch(() => {});
    },
    async fetchCategory() {
      try {
        const { data: response } = await getfaqCategory();
        response.list.forEach((el) => {
          this.category.list.push({ id: el.cd, title: el.cdNm });
        });
      } catch (e) {
        console.log(e);
      }
    },
    async fetchData() {
      // faq 데이터 조회 api
      try {
        const { data: response } = await getfaqList({
          faqCtgrCd: this.$route.query.category
            ? this.$route.query.category
            : '',
          keyword: this.keyword,
          page: this.page,
          size: this.size,
        });
        this.totalElements = response.totalElements;
        this.afterKeyword = this.keyword;
        const res = response.list;
        console.log(res);
        if (this.keyword.length > 0) {
          res.forEach((el) => {
            el.ttlNm = el.ttlNm.replaceAll(
              this.keyword,
              `<span class="mint-50">${this.keyword}</span>`
            );
          });
          res.forEach((el) => {
            el.htmlCtt = el.htmlCtt.replaceAll(
              this.keyword,
              `<span class="mint-50">${this.keyword}</span>`
            );
          });
        }
        return res;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.search-total {
  & + .faq-list {
    ::v-deep.accordion-item {
      &:first-child {
        &:before {
          display: block;
        }
      }
    }
  }
}
.faq-list {
  margin-top: 0;
  ::v-deep.accordion-item {
    &:first-child {
      &:before {
        display: none;
      }
    }
  }
}
.box-link {
  display: block;
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 10px;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
</style>
