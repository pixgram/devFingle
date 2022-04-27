<template>
  <container>
    <fade-title />
    <div class="summary-group">
      <div class="right">
        <form-select
          type="sort"
          v-model="sortData.value"
          :options="sortData.options"
          @formChange="changeSort"
        />
      </div>
    </div>
    <ul class="event-list">
      <li
        v-for="(item, index) in listData"
        :key="index"
        :class="{ new: dayCount(item.regDtm, 7), end: item.endYn }"
      >
        <router-link :to="`/cs/event/${item.evntBbsSno}`">
          <span class="thumb">
            <img
              :src="item.listFile.urlPth"
              :alt="item.ttlNm"
              @error="noImage"
            />
          </span>
          <div class="info-box">
            <strong class="title">
              {{ item.ttlNm }}
            </strong>
            <div class="date-box">
              <span class="d-day">
                <template v-if="item.endYn"> 종료 </template>
                <template v-else-if="dDay(item.evntEndDtm) === 0">
                  D-DAY
                </template>
                <template v-else> D-{{ dDay(item.evntEndDtm) }} </template>
              </span>
              <span class="date">
                {{ moment(item.evntStrtDtm) }} ~
                {{ moment(item.evntEndDtm) }}</span
              >
            </div>
          </div>
        </router-link>
      </li>
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
          <template #text> 등록된 이벤트가 없습니다. </template>
        </no-data>
      </div>
      <div slot="no-more" />
    </infinite-loading>
  </container>
</template>
<script>
import infiniteLoading from 'vue-infinite-loading';
import { infiniteMixin } from '@/mixin/infiniteList.js';
import { getEventList } from '@/api/modules/cs';
export default {
  name: 'event-list',
  components: { infiniteLoading },
  mixins: [infiniteMixin],
  data() {
    return {
      sortData: {
        options: [
          {
            value: 'CLOSING',
            label: '최신순',
          },
          {
            value: 'LASTEST',
            label: '마감순',
          },
        ],
        value: 'CLOSING',
        t: {
          loginId: 73,
          splePswd:
            '9a0a54b2274598cf977c62af5dba40cc3f3067c982f2fed76768e1741e7e2053ec407ff955b23fe360e390e82a27db15a9d915b7245ab255cdaa0505ebba376a',
          secureKeyList: [
            'T',
            'T',
            'T',
            'T',
            'o',
            'i',
            'e',
            'a',
            'i',
            'b',
            'o',
            'r',
            'y',
            'e',
            'M',
            'l',
          ],
          deviceInfo: {
            appVer: '1.1.1',
            uuid: 'uuid-uuid-uuid-uuid',
            appMrkgUnqNo: 'app marketing unique number',
            appPushKeyVal: 'app push key data',
            mdelNm: 'SM-N981N',
            osCd: 'CUS00601',
            osVer: '11',
            instlDtm: '2021.12.03 12:00:00',
          },
        },
      },
    };
  },
  methods: {
    dDay(endDay) {
      //이벤트 종료 날짜로 오늘 날짜와 D-day 계산
      let year = this.$moment(endDay).format('YYYY');
      let month = this.$moment(endDay).format('MM');
      let day = this.$moment(endDay).format('DD');
      const setDate = new Date(year, month, day);
      let nowYear = this.$moment(new Date()).format('YYYY');
      let nowMonth = this.$moment(new Date()).format('MM');
      let nowDd = this.$moment(new Date()).format('DD');
      const now = new Date(nowYear, nowMonth, nowDd);
      const distance = setDate.getTime() - now.getTime();
      return Math.floor(distance / (1000 * 60 * 60 * 24));
    },
    async fetchData() {
      //이벤트 리스트 api 불러오기
      try {
        const { data: response } = await getEventList({
          page: this.page,
          size: this.size,
          sort: this.sortData.value,
        });
        console.log(response);
        return await response.list;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.event-list {
  margin-top: 5px;
  li + li {
    margin-top: 15px;
  }
  a {
    display: block;
  }
  .thumb {
    position: relative;
    display: block;
    padding-top: 50%;
    border-radius: 10px;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
    }
  }
  .info-box {
    padding: 15px 0 15px;
    .title {
      display: inline-block;
      max-width: 100%;
      padding-right: 17px;
      box-sizing: border-box;
      overflow: hidden;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .date-box {
      margin-top: 8px;
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
      .d-day {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 5px;
        background-color: $mint-50;
        font-size: 12px;
        line-height: 18px;
        font-weight: bold;
        color: $white;
      }
      .date {
        display: inline-block;
      }
      * + .date {
        position: relative;
        margin-left: 10px;
      }
    }
  }
  .new {
    .title {
      position: relative;
      &:after {
        position: absolute;
        right: 0;
        top: 2px;
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../assets/images/ic_new_16.svg) no-repeat;
      }
    }
  }
  .end {
    .date-box {
      .d-day {
        background-color: $gray-30;
        color: $gray-60;
      }
    }
  }
}
</style>
