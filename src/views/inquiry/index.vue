<template>
  <container headerType="modal">
    <template v-if="insuranceData">
      <div class="inquiry-info">
        <img
          :src="require('@/assets/images/logo.png')"
          alt=""
          class="thumb"
          @error="noImage"
        />
        <span class="info">
          <strong class="name">{{ insuranceData.insKdCdVal }}</strong>
          <span class="company">{{ insuranceData.resCompanyNm }}</span>
        </span>
      </div>
      <div class="inquiry-cont">
        <p class="subscript">{{ insuranceData.resInsuranceName }}</p>
        <ul class="inquiry-name">
          <li>계약자 : {{ insuranceData.resContractor }}</li>
          <li>피보험자 : 박하나</li>
        </ul>
        <div class="inquiry-payment">
          <div class="flex-flag-group">
            <span class="flag-primary-sm">
              {{ insuranceData.resContractStatus }}
            </span>
            <span class="flag-gray-sm">
              {{ insuranceData.resPaymentCycle }}
            </span>
          </div>
          <span class="payment-price">
            {{ insuranceData.paymentCycle }}
            <strong>{{ priceUnit(insuranceData.resPremium) }}</strong> 원
          </span>
        </div>
      </div>

      <div class="flex-btn-group mt30">
        <button type="button" class="btn-line-gray-lg">보험금 청구하기</button>
      </div>

      <hr class="wide-gray" />

      <strong class="sub-title">계약정보</strong>

      <hr class="line-gray" />

      <ul class="between-list">
        <li>
          <span class="title">증권번호</span>
          <span class="cont">{{ insuranceData.resPolicyNumber }}</span>
        </li>
        <li>
          <span class="title">계약자</span>
          <span class="cont">{{ insuranceData.resContractor }}</span>
        </li>
        <li>
          <span class="title">피보험자</span>
          <span class="cont">박*나</span>
        </li>
      </ul>

      <hr class="wide-gray" />

      <strong class="sub-title">
        보험료 납입현황
        <span class="payment-year">
          {{ moment(insuranceData.commStartDate) }}
          - {{ moment(insuranceData.commEndDate) }} ({{
            insuranceData.resPaymentPeriod
          }}납)
        </span>
      </strong>

      <div class="progress-bar">
        <div class="result">
          <span class="bar" :style="{ width: percent + '%' }">
            <strong class="percent-num"> {{ percent }}% </strong>
          </span>
        </div>
      </div>

      <hr class="line-gray" />
      <!-- TODO 김소연: @현 페이지 삭제 필요(이모션 프론트에서 제외) -->
      <ul class="between-list">
        <li>
          <span class="title">납입완료</span>
          <span class="cont">
            <span class="price">1,000,000,000</span> 원
          </span>
        </li>
        <li>
          <span class="title">납입예정</span>
          <span class="cont">
            <span class="price">1,000,000,000</span> 원
          </span>
        </li>
        <li>
          <span class="title">총 보험료</span>
          <span class="cont mint">
            <span class="price">1,000,000,000</span> 원
          </span>
        </li>
      </ul>

      <hr class="wide-gray" />

      <strong class="sub-title">보장내용</strong>

      <hr class="line-gray" />

      <ul class="between-list">
        <li>
          <span class="title">보장명칭</span>
          <span class="cont">자동차실손상해보험</span>
        </li>
        <li>
          <span class="title">보장금액</span>
          <span class="cont"><span class="price">1,000</span>만원</span>
        </li>
      </ul>

      <hr class="line-gray" />

      <ul class="between-list">
        <li>
          <span class="title">보장명칭</span>
          <span class="cont">질병사망</span>
        </li>
        <li>
          <span class="title">보장금액</span>
          <span class="cont"><span class="price">3,000</span>만원</span>
        </li>
      </ul>

      <hr class="line-gray" />

      <ul class="between-list">
        <li>
          <span class="title">보장명칭</span>
          <span class="cont">질병사망및고도휴우장해</span>
        </li>
        <li>
          <span class="title">보장금액</span>
          <span class="cont"><span class="price">3,000</span>만원</span>
        </li>
      </ul>

      <hr class="line-gray" />

      <ul class="between-list">
        <li>
          <span class="title">보장명칭</span>
          <span class="cont">[갱신형] 조혈모세포이식수술비</span>
        </li>
        <li>
          <span class="title">보장금액</span>
          <span class="cont"><span class="price">1,000</span>만원</span>
        </li>
      </ul>
    </template>
  </container>
</template>

<script>
import { getInsuranceDetail } from '@/api/modules/inquiry';

export default {
  name: 'inquiry',
  data() {
    return {
      percent: 50,
      insuranceData: {
        commEndDate: '20200115 / 종신',
        commStartDate: 20100115,
        insKdCd: 'ANA00101',
        insKdCdVal: '의료실비보험',
        paymentCycle: '월',
        resCompanyNm: '하나손해보험',
        resCompanyNmCode: 'N10',
        resContractStatus: '정상',
        resContractor: '김하나',
        resInsuranceName: '무배당 하나 가득담은 종합건강보험(2104)',
        resNumber: 1,
        resPaymentCycle: '매월납',
        resPaymentPeriod: '10년',
        resPolicyNumber: 12340000,
        resPolicyNumberHid: '1234****',
        resPremium: 38000,
      },
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await getInsuranceDetail({
          custFmlySno: 1,
          insDvVal: 'N1020211061318', //보험 구분값
        });

        if (response.code === 'SUC001') {
          this.insuranceData = response.data;
        } else {
          this.insuranceData = null;
          //todo 에러면 브리짓 닫아야할까여 오픈범위 아님
        }
        console.log(response);
      } catch (error) {
        //todo 에러면 브리짓 닫아야할까여 오픈범위 아님
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.inquiry-info {
  display: flex;
  .thumb {
    height: 40px;
    width: 40px;
    box-sizing: border-box;
    border-radius: 30px;
    border: 1px solid $gray-30;
  }
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 16px;
      line-height: 24px;
      font-weight: bold;
    }
    .company {
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
    }
  }
}

.inquiry-cont {
  position: relative;
  .subscript {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    color: $gray-70;
  }
  .inquiry-name {
    display: flex;
    margin-top: 5px;
    li {
      position: relative;
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
      & + li {
        padding-left: 20px;
        &:before {
          position: absolute;
          left: 10px;
          top: 50%;
          content: '';
          display: inline-block;
          width: 1px;
          height: 12px;
          background: $gray-30;
          transform: translateY(-50%);
        }
      }
    }
  }
  .inquiry-payment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .payment-price {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      strong {
        margin: 0 2px 0 3px;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
}

.sub-title {
  position: relative;
  .payment-year {
    position: absolute;
    top: 50%;
    right: 0;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    color: $gray-60;
    transform: translateY(-50%);
  }
}

.between-list {
  margin-top: 15px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
      line-height: 20px;
    }
    .title {
      color: $gray-60;
    }
    .cont {
      max-width: 205px;
      text-align: right;
      &.mint {
        color: $mint-60;
        font-weight: bold;
      }
    }
    & + li {
      padding-top: 10px;
    }
  }
}

.progress-bar {
  padding: 35px 0 15px;
  .result {
    position: relative;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background-color: $gray-30;
    .bar {
      position: relative;
      display: flex;
      height: 6px;
      border-radius: 3px;
      background-color: $mint-50;
      &:after {
        position: absolute;
        right: -8px;
        top: 50%;
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('../../assets/images/ic-circle-bargraph-16.svg')
          no-repeat;
        transform: translateY(-50%);
      }
    }
    .percent-num {
      position: absolute;
      right: 0;
      bottom: -24px;
      font-size: 14px;
      line-height: 20px;
      color: $mint-60;
      transform: translateX(14px);
    }
  }
}
</style>
