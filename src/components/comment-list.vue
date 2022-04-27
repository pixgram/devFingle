<template>
  <ul class="comment-list">
    <li v-for="(item, key) in list" :key="key">
      <div class="questions" :class="{ on: moreOn.some((el) => el === key) }">
        <div class="info-group">
          <star-rating v-model="item.hrspScr" readonly size="sm" />
          <span class="name">{{ item.custNm }}</span>
          <span class="date">{{ moment(item.cnslDtm) }}</span>
        </div>
        <div class="desc-wrap" :class="{ max: moreBtn[key] === key }">
          <div class="desc" v-html="item.cnslCtt" ref="desc" />
          <button
            type="button"
            class="more"
            v-if="moreBtn[key] !== null"
            @click="moreClick(key, $event)"
          >
            <span class="blind">더보기</span>
          </button>
        </div>
      </div>
      <div v-if="item.cnslLtpdStNm === '답변후'" class="answer">
        <div class="info-group">
          <span class="name">{{ item.cchNm }} 핑글코치</span>
          <span class="date">{{ moment(item.answDtm) }}</span>
        </div>
        <span class="desc" v-html="item.answCtt"></span>
      </div>
    </li>
  </ul>
</template>
<script>
import starRating from '@/components/star-rating';
import { Cubic, gsap } from 'gsap/all';
export default {
  name: 'comment-list',
  props: ['list'],
  components: {
    starRating,
  },
  data() {
    return {
      moreOn: [],
      moreBtn: [],
      speed: 0.3,
    };
  },
  mounted() {},
  watch: {
    list() {
      this.$nextTick(() => {
        console.log('list');
        this.maxDesc();
      });
    },
  },
  methods: {
    maxDesc() {
      this.$refs.desc?.forEach((desc, index) => {
        this.moreBtn.push(desc.clientHeight > 60 ? index : null);
      });
    },
    moreClick(key, e) {
      const btn = e.target;
      const target = e.target.parentNode;
      const idx = this.moreOn.findIndex((el) => el === key);
      if (idx === -1) {
        gsap.fromTo(
          target,
          {
            height: '60px',
          },
          {
            height: 'auto',
            duration: this.speed,
            ease: Cubic.easeInOut,
          }
        );
        gsap.to(btn, {
          rotateX: '180deg',
          duration: this.speed,
          ease: Cubic.easeInOut,
        });
        this.moreOn.push(key);
      } else {
        gsap.to(target, {
          height: '60px',
          duration: this.speed,
          ease: Cubic.easeInOut,
          onComplete: () => {
            this.moreOn.splice(idx, 1);
          },
        });
        gsap.to(btn, {
          rotateX: '0deg',
          duration: this.speed,
          ease: Cubic.easeInOut,
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.comment-list {
  border-top: 1px solid $gray-30;
  margin: 0 -20px;
  & > li {
    padding: 30px 20px;
    & + li {
      border-top: 8px solid #f7f7f7;
    }
  }
  .questions {
    .info-group {
      display: flex;
      align-items: center;
      color: $gray-60;
      .name {
        font-size: 12px;
        line-height: 18px;
      }
      .date {
        font-size: 12px;
        line-height: 18px;
        &:before {
          content: '';
          display: inline-block;
          width: 1px;
          height: 12px;
          margin: 0 10px;
          background-color: #ddd;
        }
      }
    }
    .range-slider {
      margin-right: 10px;
    }
    /*.category-group {
      display: flex;
      margin-top: 10px;
      font-size: 13px;
      line-height: 18px;
      color: $gray-60;
      .category {
        flex: 0 0 auto;
      }
      .tag {
        position: relative;
        flex: 1 1 auto;
        margin-left: 10px;
        padding-left: 11px;
        &:before {
          position: absolute;
          top: 3px;
          left: 0;
          content: '';
          display: block;
          width: 1px;
          height: 12px;
          background-color: $gray-30;
        }
        li {
          display: inline-block;
          &:nth-last-child(n + 2) {
            &:after {
              content: ',';
              display: inline-block;
              margin-right: 2px;
            }
          }
        }
      }
    }*/
    .desc-wrap {
      position: relative;
      display: -webkit-box;
      margin-top: 10px;
      overflow: hidden;
      &.max {
        height: 60px;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .desc {
        padding-right: 30px;
        word-break: keep-all;
        font-size: 14px;
        line-height: 20px;
        color: $gray-70;
      }
      .more {
        position: absolute;
        bottom: -5px;
        right: -5px;
        display: block;
        width: 30px;
        height: 30px;
        background: url('../assets/images/ic-down-20-gr-n.svg') no-repeat 50%;
      }
    }
    &.on {
      .max {
        -webkit-line-clamp: inherit;
      }
    }
  }
  .answer {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
    background-color: #f7f7f7;
    font-size: 13px;
    line-height: 18px;
    .info-group {
      display: flex;
      margin-top: 9px;
      color: $gray-60;
      font-size: 12px;
      line-height: 18px;
      .date {
        position: relative;
        margin-left: 10px;
        padding-left: 11px;
        &:before {
          position: absolute;
          top: 3px;
          left: 0;
          content: '';
          display: block;
          width: 1px;
          height: 12px;
          background-color: $gray-30;
        }
      }
    }
  }
}
</style>
