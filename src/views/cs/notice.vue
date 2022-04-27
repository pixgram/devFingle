<template>
  <container>
    <ul class="notice-list">
      <li class="notice-item" v-for="(item, index) in listData" :key="index">
        <router-link :to="`/cs/notice/${item.bbsSno}`">
          <div class="board-info">
            <span class="board-label primary" v-if="item.impoYn">중요</span>
            <span class="board-label" v-if="item.bnftYn">혜택</span>
          </div>
          <strong class="title">
            <span class="txt">{{ item.ttlNm }}</span>
            <i class="icon-new-16" v-if="dayCount(item.regDtm, 14)"></i>
          </strong>
          <time class="date" :datetime="item.regDtm">
            {{ moment(item.regDtm) }}
          </time>
        </router-link>
      </li>
    </ul>
    <infinite-loading @infinite="infiniteHandler($event, fetchData())">
      <div slot="spinner" />
      <div slot="no-results">
        <no-data>
          <template #icon>
            <i class="icon-none" />
          </template>
          <template #text> 등록된 공지사항이 없습니다. </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
  </container>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList.js';
import { getNoticeList } from '@/api/modules/cs';
export default {
  name: 'notice-list',
  components: { infiniteLoading },
  mixins: [infiniteMixin],
  methods: {
    async fetchData() {
      try {
        const { data: response } = await getNoticeList({
          page: this.page,
          size: this.size,
        });
        return await response.list;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.notice-item {
  position: relative;
  padding: 15px 0;
  & + .notice-item {
    border-top: 1px solid #eee;
  }
  a {
    display: block;
    padding-right: 40px;
    &:before {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(../../assets/images/ic-next-20-gr-n.svg) no-repeat 0 0 /
        20px auto;
    }
  }
  .title {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    .txt {
      @include ellipsis;
      font-weight: 500;
    }
    .icon-new-16 {
      flex: 0 0 16px;
    }
  }
  .date {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    line-height: 18px;
    color: #888;
  }
}
</style>
