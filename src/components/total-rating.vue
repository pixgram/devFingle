<template>
  <div class="total-ranting">
    <div class="star" v-if="totalScore">
      <span class="num" v-if="scoreStatistics.length === 0">0</span>
      <span class="num" v-else>{{ totalScore }}</span>
      <star-rating v-model="totalScore" step="0.5" readonly size="sm" />
    </div>
    <ul class="ranting-list">
      <li
        v-for="(item, key) in sortRating"
        :key="key"
        :class="{ max: maxVal === item.scoreCount }"
      >
        <span class="key">{{ item.hrspScr }}점</span>
        <span class="numerical-wrap">
          <span
            class="numerical"
            :style="{ width: val(item.scoreCount) + '%' }"
            >{{
          }}</span>
        </span>
        <span class="val">{{ item.scoreCount }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import starRating from '@/components/star-rating';
export default {
  name: 'total-rating',
  props: ['scoreStatistics'],
  components: {
    starRating,
  },
  data() {
    return {
      maxVal: 0,
      //totalScore: 5,
    };
  },
  computed: {
    sortRating() {
      const array = [...this.scoreStatistics];
      return array.sort((a, b) => b.hrspScr - a.hrspScr);
    },
    totalScore() {
      try {
        const sumScore = this.scoreStatistics.reduce(
          (a, { scoreCount, hrspScr }) => {
            return a + scoreCount * hrspScr;
          },
          0
        );
        const everyone = this.scoreStatistics.reduce((a, { scoreCount }) => {
          console.log(scoreCount, a);
          return scoreCount + a;
        }, 0);
        return (sumScore / everyone).toFixed(1);
      } catch (e) {
        return 0;
      }
    },
  },
  updated() {
    console.log('만족도', this.scoreStatistics);
  },
  methods: {
    val(val) {
      const max = this.scoreStatistics.map((el) => {
        return el.scoreCount;
      });
      const total = max.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      });
      this.maxVal = Math.max(...max);
      return (val / total) * 100;
    },
  },
};
</script>
<style scoped lang="scss">
.total-ranting {
  display: flex;
  margin: 15px 0 0;
  padding: 20px 25px;
  border-radius: 10px;
  background-color: #f7f7f7;
  .star {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    .num {
      font-size: 32px;
      line-height: 40px;
      font-weight: bold;
    }
  }
  .ranting-list {
    flex: 1 1 auto;
    padding-left: 30px;
    margin-left: 22px;
    border-left: 1px solid $gray-30;
    font-size: 12px;
    line-height: 18px;
    color: $gray-60;
    li {
      display: flex;
      align-items: center;
      .key {
        flex: 0 0 auto;
      }
      .numerical-wrap {
        position: relative;
        display: block;
        margin: 0 7px 0 6px;
        flex: 1 1 auto;
        height: 6px;
        background: $gray-40;
        border-radius: 3px;
        overflow: hidden;
        .numerical {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          background: #ffaf00;
          border-radius: 3px;
          height: 100%;
        }
      }
      .val {
        flex: 0 0 30px;
      }
      &.max {
        .key {
          color: #000;
        }
        .val {
          color: #000;
        }
      }
    }
  }
}
</style>
