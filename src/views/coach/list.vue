<template>
  <container>
    <fade-title />
    <sticky-item>
      <tab-item
        :list="categoryInherit.list"
        type="main"
        name="categoryInherit"
        :active.sync="categoryInherit.active"
      />
      <tab-item
        :list="category.list"
        :modalTitle="modalTitle"
        type="round"
        name="category"
        :active.sync="category.active"
        style="height: 65px"
        ref="tab"
      />
    </sticky-item>
    <hr class="wide-gray mt0" />
    <div class="filter-group">
      <div class="consult">
        <form-checkbox
          :subType="true"
          v-for="(item, index) in counselState"
          :val="item.value"
          :key="index"
          v-model="counselStateChecked"
        >
          {{ item.label }}
        </form-checkbox>
      </div>
      <div class="sort">
        <form-select
          type="sort"
          v-model="orderType.active"
          :options="orderType.options"
        />
      </div>
    </div>
    <counselingReview name="counseling_review" />

    <ul class="coach-list">
      <coachItem
        v-for="(item, index) in listData"
        :key="index"
        :coachData="item"
      />
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
          <template #text> 조회된 핑글코치가 없습니다. </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
    <transition @leave="leave">
      <div
        class="btm-btn-group character"
        :class="{ hide: characterVisible }"
        v-if="characterVisible"
      >
        <!--    <div class="flex-btn-group">
          <router-link to="#" class="btn-character">
            핑글코치만의 특별함은?
          </router-link>
          <button type="button" class="character-close" @click="btnHide">
            닫기
          </button>
        </div>-->
      </div>
    </transition>
  </container>
</template>
<script>
import coachItem from '@/components/coach-item';
import { gsap } from 'gsap/all';
import { getCoachCategory, getCoachList } from '@/api/modules/coach';
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList';

export default {
  name: 'coach-search-list',
  mixins: [infiniteMixin],
  components: {
    counselingReview: () => import('@/views/coach/modal/counseling-review'),
    coachItem,
    infiniteLoading,
  },
  data() {
    return {
      characterVisible: true,
      category: {
        active: '',
        list: [],
      },
      categoryInherit: {
        //상위 카테고리
        active: '',
        list: [],
      },
      orderType: {
        active: '',
        options: [
          {
            value: '',
            label: '핑글 추천 순',
          },
          {
            value: 'popular',
            label: '인기 순',
          },
          {
            value: 'counsel',
            label: '상담 많은 순',
          },
          {
            value: 'score',
            label: '별점 높은 순',
          },
          {
            value: 'career',
            label: '경력 높은 순',
          },
          {
            value: 'newest',
            label: '최근 등록 순',
          },
        ],
      },
      counselStateChecked: [
        'chtgUseYn',
        'telCnslUseYn',
        'cfntCnslUseYn',
        'vdeoUseYn',
      ],
      counselState: [
        {
          label: '채팅',
          value: 'chtgUseYn',
        },
        {
          label: '전화',
          value: 'telCnslUseYn',
        },
        {
          label: '대면',
          value: 'cfntCnslUseYn',
        },
        {
          label: '화상',
          value: 'vdeoUseYn',
        },
      ],
      cfntCnslUseYn: true, //대면 상담 사용 여부
      chtgUseYn: true, //채팅 상담 사용 여부
      telCnslUseYn: true, //전화 상담 사용 여부
      vdeoUseYn: true, //화상 상담 사용 여부
      modalTitle: null,
    };
  },
  async created() {
    console.log(this.$route.query.categoryInherit);
    console.log(this.$route.query.category);
    // this.categoryInherit.active = this.$route.query.categoryInherit || '';
    // this.category.active = this.$route.query.category || '';
    this.cfntCnslUseYn = this.$route.query.cfntCnslUseYn || true;
    this.chtgUseYn = this.$route.query.chtgUseYn || true;
    this.telCnslUseYn = this.$route.query.telCnslUseYn || true;
    this.vdeoUseYn = this.$route.query.vdeoUseYn || true;
    await this.categoryData(true);
    await this.categoryData(false);
    this.changeSort(2);
  },
  async beforeRouteUpdate(to, from, next) {
    console.log(to.query, from.query);
    if (to.query.categoryInherit !== from.query.categoryInherit) {
      await this.categoryData(false);
    }
    this.changeSort(1);
    next();
  },
  watch: {
    'orderType.active'() {
      this.changeSort(3);
    },
    counselStateChecked(a, b) {
      console.log(a, b);
      if (a.length === 0 && b.length === 1) {
        this.counselStateChecked.push(b[0]);
      }
      if (a.length !== b.length) {
        this.changeSort(4);
      }
    },
    'categoryInherit.active'() {
      if (this.categoryInherit.list.length === 0) return;
      const idx = this.categoryInherit.list.findIndex((el) => {
        return el.id === this.categoryInherit.active;
      });
      this.modalTitle = this.categoryInherit.list[idx].title;
    },
  },
  methods: {
    btnHide() {
      this.leave();
      this.characterVisible = false;
    },
    leave(el) {
      gsap.to(el, 0.2, {
        opacity: 0,
      });
    },
    async categoryData(init) {
      // 최초의 카테고리 조회 api
      try {
        const { data: response } = await getCoachCategory({
          cd: init ? '' : this.categoryInherit.active,
        });
        if (init) {
          this.categoryInherit.list = response.list.map((tab) => {
            return { id: tab.cd, title: tab.cdNm };
          });
          const idx = this.categoryInherit.list.findIndex(
            (el) => el.id === this.$route.query.categoryInherit || ''
          );
          this.categoryInherit.active =
            this.categoryInherit.list[Math.max(idx, 0)].id;
          //this.category.active = '';

          this.modalTitle = this.categoryInherit.list[Math.max(idx, 0)].title;
          console.log(this.modalTitle);
        } else {
          this.category.list = response.list.map((tab) => {
            return { id: tab.cd, title: tab.cdNm };
          });
          this.category.list.unshift({ id: '', title: '전체' });
          const idx = this.category.list.findIndex(
            (el) => el.id === this.category.active
          );
          this.category.active = this.category.list[Math.max(idx, 0)].id;
          this.$refs.tab.scrollMove(1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async fetchData() {
      console.log(this.category.active);
      console.log(this.categoryInherit.active);
      // 핑글 고 데이터 조회 api
      try {
        const { data: response } = await getCoachList({
          category: this.category.active,
          categoryInherit: this.categoryInherit.active,
          cfntCnslUseYn:
            this.counselStateChecked.indexOf('cfntCnslUseYn') !== -1,
          chtgUseYn: this.counselStateChecked.indexOf('chtgUseYn') !== -1,
          orderType: this.orderType.active,
          page: this.page,
          size: this.size,
          telCnslUseYn: this.counselStateChecked.indexOf('telCnslUseYn') !== -1,
          vdeoUseYn: this.counselStateChecked.indexOf('vdeoUseYn') !== -1,
        });
        console.log(response);
        return response.list;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
th,
td {
  outline: 1px solid blue;
}
.filter-group {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  .consult {
    ::v-deep .form-checkbox {
      padding-left: 20px;
      font-size: 12px;
      line-height: 18px;
      font-weight: 600;
      color: #bbb;
      & + .form-checkbox {
        margin-left: 5px;
      }
      &.checked {
        color: $mint-60;
      }
      .icon-checkbox-sub {
        margin-right: 0;
      }
    }
  }
  .sort {
  }
}
</style>
