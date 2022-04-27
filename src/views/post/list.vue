<template>
  <container>
    <fade-title />
    <sticky-item>
      <form-input
        type="search"
        placeholder="검색어를 입력해주세요."
        v-model="keyword"
        maxlength="20"
        ref="searchInput"
        @keydown.enter="search"
      >
        <button type="button" class="search" @click="search">검색</button>
      </form-input>
    </sticky-item>

    <sticky-item v-show="!afterKeyword">
      <tab-item
        :list="category.list"
        name="category"
        :active.sync="category.active"
      />
    </sticky-item>

    <!-- 추천 외 목록-->
    <template v-if="afterKeyword || category.active !== 'CTS00101'">
      <div class="post-wrap">
        <div v-if="afterKeyword && totalElements" class="search-total">
          <span class="mint-50">‘{{ afterKeyword }}’</span>에 대한 검색결과가
          {{ totalElements }}건 있습니다.
        </div>
        <post-tab-list :listData="listData" @postModal="openViewModal" />
        <!-- :sharedPost="sharedPost"-->
      </div>
      <infinite-loading
        @infinite="infiniteHandler($event, fetchData())"
        :identifier="infiniteId"
      >
        <div slot="spinner" />
        <div slot="no-results">
          <no-data v-if="afterKeyword && !listData.length">
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
    </template>
    <!-- 추천 목록 -->
    <template v-else>
      <div class="recommend-wrap">
        <post-recommend
          v-for="(group, key) in recommend"
          :key="key"
          :listData="group"
          :userName="custNm"
          @postModal="openViewModal"
        />
        <!-- :sharedPost="sharedPost" -->
      </div>
    </template>

    <modalView name="post-view" type="full" v-model="chosenItem" />
  </container>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList';
import postRecommend from '@/components/post-recommend';
import postTabList from '@/components/post-tab-list';
import {
  getRecPostList,
  getPostCategory,
  getPostList,
} from '@/api/modules/post';

export default {
  name: 'post-list',
  components: {
    infiniteLoading,
    postRecommend,
    postTabList,
    modalView: () => import('@/views/post/modal/view.vue'),
  },
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
  mixins: [infiniteMixin],
  data() {
    return {
      custNm: '',
      afterKeyword: '',
      keyword: '',
      totalElements: '',
      totalPages: 999,
      // sharedPost: 0,
      chosenItem: {
        postCtgrCd: '',
        postSno: 0,
      },
      category: {
        active: this.$route.query.category,
        list: [
          {
            title: '추천',
            id: 'CTS00101',
          },
          {
            title: '보험',
            id: 'CTS00102',
          },
          {
            title: '건강',
            id: 'CTS00103',
          },
          {
            title: '금융',
            id: 'CTS00104',
          },
          {
            title: '핑글팁',
            id: 'CTS00105',
          },
        ],
      },
      listData: [
        {
          quizCompYn: false,
          postCtgrCd: '',
          postCtgr: '',
          ttlNm: '',
          inqTims: 0,
          cmmnTims: 0,
          postSno: 0,
          quizInclYn: false,
          bkmkTims: 0,
          listFile: {
            fileGrpSno: 0,
            fileSno: 0,
            orgFileNm: '',
            fileCpc: 0,
            fileTypNm: '',
            urlPth: '',
          },
        },
      ],
      recommend: [
        /*   {
          id: 'COA02301',
          title: `님에게 꼭 필요한 포스트`,
          cont: [
            {
              postRcmInqCd: '',
              postSno: 0,
              postCtgr: '',
              ttlNm: '',
              listImgPth: '',
              inqTims: 0,
              cmmnTims: 0,
              bkmkTims: 0,
              quizInclYn: false,
              quizCompYn: false,
              listFile: {
                fileGrpSno: 0,
                fileSno: 0,
                orgFileNm: '',
                fileCpc: 0,
                fileTypNm: '',
                urlPth: '',
              },
            },
          ],
        },*/
        {
          id: 'COA02302',
          title: '따끈따끈 최신 포스트',
          cont: [
            {
              postRcmInqCd: '',
              postSno: 0,
              postCtgr: '',
              ttlNm: '',
              listImgPth: '',
              inqTims: 0,
              cmmnTims: 0,
              bkmkTims: 0,
              quizInclYn: false,
              quizCompYn: false,
              listFile: {
                fileGrpSno: 0,
                fileSno: 0,
                orgFileNm: '',
                fileCpc: 0,
                fileTypNm: '',
                urlPth: '',
              },
            },
          ],
        },
        {
          id: 'COA02303',
          title: '지금 많이 보는 포스트',
          cont: [
            {
              postRcmInqCd: '',
              postSno: 0,
              postCtgr: '',
              ttlNm: '',
              inqTims: 0,
              cmmnTims: 0,
              bkmkTims: 0,
              quizInclYn: false,
              quizCompYn: false,
              listFile: {
                fileGrpSno: 0,
                fileSno: 0,
                orgFileNm: '',
                fileCpc: 0,
                fileTypNm: '',
                urlPth: '',
              },
            },
          ],
        },
      ],
    };
  },
  watch: {
    'category.active'() {
      this.changeSort();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    window.scrollTo(0, 0);
    this.changeSort();
    this.loadAction(to.query);
    next();
  },
  async created() {
    this.keyword = this.$route.query.keyword || '';
    await this.fetchCategory();
    await this.loadAction(this.$route.query);
  },
  mounted() {
    // bus.$on('update-share', (postNum) => (this.sharedPost = parseInt(postNum)));
  },
  methods: {
    openViewModal(category, postNo) {
      this.chosenItem.postSno = postNo;
      if (this.$route.query.category === undefined) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            modal: 'post-view',
            seq: postNo,
            category: category,
          },
        });
      } else {
        this.$router.replace({
          query: {
            ...this.$route.query,
            modal: 'post-view',
            seq: postNo,
          },
        });
      }
    },
    search() {
      if (!this.keyword) {
        this.$router.push('/post');
      } else {
        window.scrollTo(0, 0);
        this.$router
          .push({
            query: { keyword: this.keyword },
          })
          .catch(() => {});
      }
    },
    loadAction(routerQuery) {
      const { category, keyword } = routerQuery;
      console.log('routerQuery', routerQuery);
      if (keyword) {
        this.keyword = keyword;
        this.category.active = '';
      } else {
        this.category.active = category || 'CTS00101';
        this.afterKeyword = '';
        this.keyword = '';
        if (
          category === 'CTS00101' ||
          category === '' ||
          (!category && !keyword) ||
          category === 'COA02303' ||
          category === 'COA02302' ||
          category === 'COA02303'
        ) {
          this.category.active = 'CTS00101';
          this.fetchRecData();
        }
      }
    },
    async fetchCategory() {
      this.changeSort();
      try {
        this.category.list = [];
        const { data: response } = await getPostCategory();
        response.list.forEach((el) => {
          this.category.list.push({ id: el.cd, title: el.cdNm });
        });
        this.category.active =
          this.$route.query.category || this.category.list[0].id;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchRecData() {
      try {
        const { data: response } = await getRecPostList();
        this.custNm = response.custNm;
        response.list.forEach((el) => {
          this.recommend.forEach((standard) => {
            if (standard.id === el.postRcmInqCd) {
              standard.cont = el.dataList;
            }
          });
        });
        return this.recommend;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchData() {
      console.log('in');
      try {
        // if (this.page > this.totalPages) return;
        const { data: response } = await getPostList({
          postCtgrCd: this.category.active || '',
          page: this.page,
          size: this.size,
          keyword: this.keyword,
        });
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.afterKeyword = this.keyword;
        const list = response.list;
        if (this.keyword.length > 0) {
          list.forEach((el) => {
            el.ttlNm = el.ttlNm.replaceAll(
              this.keyword,
              `<span class="mint-50">${this.keyword}</span>`
            );
          });
        }
        return list;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-input {
  padding-top: 5px;
}

.tab-wrap.line {
  padding-top: 10px;
}

.search-total {
  padding: 0 0 20px;
  & ~ .post-wrap {
    padding-top: 0;
  }
}

::v-deep .viewer {
  display: flex;
  margin-top: 8px;
  li {
    position: relative;
    padding-left: 19px;
    background-position: left center;
    background-repeat: no-repeat;
    font-size: 12px;
    line-height: 18px;
    color: $gray-60;
    & + li {
      margin-left: 13px;
      &::before {
        display: block;
        content: '';
        position: absolute;
        top: 3px;
        left: -7px;
        width: 1px;
        height: 12px;
        background: $gray-30;
      }
    }
    &.date {
      padding-left: 0;
    }
    &.hit {
      background-image: url(../../assets/images/ic-lookup-14.svg);
    }
    &.share {
      background-image: url(../../assets/images/ic-share-14.svg);
    }
    &.bookmark {
      background-image: url(../../assets/images/ic-bookmark-14.svg);
    }
  }
}

.post-wrap {
  padding: 30px 0 0;
  .no-data {
    padding-top: 50px;
  }
}

::v-deep .post-item {
  overflow: hidden;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 0;
  .img {
    display: block;
    overflow: hidden;
    width: 100%;
    height: auto;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .post-info {
    display: block;
    margin: 15px 0 0;
    padding: 0;
    font-size: 12px;
    text-align: left;
    .item-title {
      margin: 10px 0 0;
      @include ellipsis(2);
    }
  }
}

.recommend-wrap {
  margin: 0 -20px;
}
</style>
