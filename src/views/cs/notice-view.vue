<template>
  <container>
    <div class="board-head">
      <div class="board-info">
        <span class="board-label primary" v-if="viewData.impoYn">중요</span>
        <span class="board-label" v-if="viewData.bnftYn">혜택</span>
      </div>
      <h2 class="board-title">
        {{ viewData.ttlNm }}
        <i class="icon-new-16" v-if="dayCount(viewData.regDtm, 14)"></i>
      </h2>
      <time class="date">
        {{ moment(viewData.regDtm) }}
      </time>
    </div>

    <div class="board-content" v-html="viewData.htmlCtt"></div>
  </container>
</template>

<script>
import { getNoticeView } from '@/api/modules/cs';

export default {
  name: 'notice-view',
  data() {
    return {
      viewData: {
        bbsSno: Number,
      },
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    newly() {
      const today = new Date(); //오늘
      const lately = new Date(today.setDate(today.getDate() + 14)); //오늘부터 14일 경과
      const dateFormat = this.$moment(lately).format('YYYY-MM-DD'); //날짜포맷수정
      console.log(dateFormat);
      if (lately < today) {
        console.log('최근아님');
      }
      return today;
    },
  },
  methods: {
    async fetchData() {
      //공지사항 상세 api 불러오기
      try {
        const res = await getNoticeView({
          bbsSno: this.$route.params.seq,
        });
        if (res.code === 'SUC001') {
          this.viewData = res.data;
        } else {
          // todo 데이터 없음 케이스
          this.viewData = null;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.board-head {
  padding-top: 10px;
  padding-bottom: 20px;
  .board-info {
  }
  .board-title {
    font-size: 18px;
    line-height: 26px;
    margin-top: 10px;
  }
  .date {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    line-height: 18px;
    color: #888;
  }
}

.board-content {
  padding: 20px 0;
  border-top: 1px solid #eee;
  font-size: 14px;
  line-height: 24px;
  white-space: pre-line;
  color: #444;
  ::v-deep img {
    display: block;
    width: auto;
    max-width: 100%;
    margin-bottom: 20px;
  }
}
</style>
