<template>
  <container headerType="modal">
    <fade-title />
    <div class="info-box">
      <span class="flag-gray-md">{{ viewData.cnslStCdNm }}</span>
      <div class="info">
        <span class="info-item">{{ viewData.cnslFldCdNm }}</span>
        <span class="info-item">{{ viewData.cchCnslDvCdNm }}</span>
        <span class="info-item">
          {{ moment(viewData.regDtm, 'hasTime') }}
        </span>
      </div>
    </div>
    <hr class="line-gray mt20" />
    <div class="view">
      <div class="view-info">
        <star-rating v-model="viewData.hrspScr" readonly size="sm" />
        <span class="date">
          {{ moment(viewData.cnslDtm) }}
        </span>
      </div>
      <div class="view-contents" v-html="viewData.cnslCtt"></div>
      <div class="response-box" v-if="viewData.answCtt">
        <div class="response-content">
          {{ viewData.answCtt }}
        </div>
        <div class="info">
          <span class="info-item">
            {{ viewData.cchNm }} {{ viewData.cchDvCdNm }}
          </span>
          <span class="info-item"> YYYY.MM.DD </span>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
import { getCounselingReview } from '@/api/modules/mypage';
import starRating from '@/components/star-rating';
export default {
  name: 'counseling-review-view',
  data() {
    return {
      viewData: {
        /*        answCtt: '답변 002 입니다.',
        cchCnslDvCdNm: '대면',
        cchCtgCd: 'COA00101',
        cchCtgCdNm: '보험',
        cchDvCd: 'COA00201',
        cchDvCdNm: '보험 전문가',
        cchNm: '이름 001',
        cchSno: 1,
        cnslCtt: '후기입니다1',
        cnslDtm: '2021-11-30',
        cnslEndDtm: 'string',
        cnslFldCdNm: '건강 상담',
        cnslLtpdSno: 4,
        cnslLtpdStCd: 'COA01501',
        cnslSno: 1,
        cnslStCdNm: '상담취소',
        hrspScr: 5,*/
      },
    };
  },
  props: ['name'],
  components: {
    starRating,
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await getCounselingReview({
          cnslLtpdSno: this.$route.params.seq,
        });
        if (response.code === 'SUC001') {
          this.viewData = response.data;
        } else {
          //await this.$router.push('/404');
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.info-box {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .info {
    margin-left: 10px;
  }
}
.info {
  .info-item {
    font-size: 12px;
    line-height: 18px;
    color: $gray-60;
    + .info-item {
      position: relative;
      margin-left: 10px;
      padding-left: 11px;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 1px;
        height: 14px;
        background: #eee;
        transform: translateY(-50%);
      }
    }
  }
}
.view {
  margin-top: 20px;
  .view-info {
    display: flex;
    align-items: center;
    .date {
      margin-left: 10px;
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
    }
  }
  .view-contents {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  .response-box {
    margin-top: 15px;
    padding: 15px;
    font-size: 14px;
    line-height: 20px;
    background: $gray-20;
    border-radius: 10px;
    box-sizing: border-box;
    .info {
      margin-top: 5px;
    }
  }
}
</style>
