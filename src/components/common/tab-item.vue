<template>
  <div
    class="tab-wrap"
    :class="{
      line: type === 'line' || !type,
      show: moreVisible,
      'tab-main-wrap': type === 'main',
    }"
  >
    <ul
      ref="tabList"
      :class="{
        'tab-line': type === 'line' || !type,
        'tab-round': type === 'round',
        'tab-main': type === 'main',
      }"
    >
      <li
        ref="tabItem"
        v-for="(item, key) in list"
        :key="key"
        :class="{ active: active === item.id || active === item.anchor }"
      >
        <router-link :to="item.path" v-if="item.path">
          <span v-html="item.title" />
        </router-link>
        <a :href="item.url" v-else-if="item.url" target="_blank">
          <span v-html="item.title" />
        </a>
        <a
          :href="`#${item.anchor}`"
          v-else-if="item.anchor"
          @click="anchorEvent(item.anchor, $event)"
        >
          <span v-html="item.title" />
        </a>
        <button v-else @click="tabEvent(item.id)">
          <span v-html="item.title" />
        </button>
      </li>
    </ul>
    <button type="button" v-if="type === 'round'" class="more" @click="moreAll">
      <span class="blind">더보기</span>
    </button>

    <modal-tab-item-list
      name="tab-item-list"
      type="full"
      :list="list"
      :active.sync="active"
      :titleName="modalTitle"
      v-if="modalTitle"
      @update="tabEvent"
    />
  </div>
</template>
<script>
import { gsap, Cubic } from 'gsap/all';
import { mapState } from 'vuex';
import modalTabItemList from './modal/tab-list';
export default {
  name: 'tab',
  props: ['list', 'type', 'active', 'name', 'modalTitle'],
  components: { modalTabItemList },
  data() {
    return {
      moreVisible: false,
      anchorActive: false,
    };
  },
  watch: {
    active() {
      this.$nextTick(function () {
        this.scrollMove();
      });
    },
  },
  computed: {
    ...mapState('sticky', ['stickyList', 'stickyHeight']),
    anchorList() {
      return this.list.filter((el) => el.anchor);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.scrollMove();
    });
  },
  created() {
    if (this.$route.query[this.name]) {
      this.$emit('update:active', this.$route.query[this.name]);
    }

    window.removeEventListener('scroll', this.anchorScroll, false);
    window.addEventListener('scroll', this.anchorScroll, false);
  },
  activated() {
    window.removeEventListener('scroll', this.anchorScroll, false);
    window.addEventListener('scroll', this.anchorScroll, false);
  },
  destroyed() {
    window.removeEventListener('scroll', this.anchorScroll, false);
  },
  deactivated() {
    window.removeEventListener('scroll', this.anchorScroll, false);
  },
  methods: {
    anchorScroll() {
      if (!this.anchorActive) return;
      this.anchorList.forEach((el) => {
        const targetY = this.offset(document.getElementById(el.anchor)).y;
        const targetH = this.offset(document.getElementById(el.anchor)).h;
        if (
          window.pageYOffset + this.stickyHeight >= targetY &&
          window.pageYOffset + this.stickyHeight < targetY + targetH
        ) {
          this.anchorEvent(el.anchor);
        }
      });
    },
    anchorEvent(id, e) {
      if (e) e.preventDefault();
      if (!document.getElementById(id)) return;

      const targetY = this.offset(document.getElementById(id)).y;
      const stickyH = this.stickyList.reduce((a, { height, start, top }) => {
        return targetY + top >= start ? a + height : a;
      }, 0);

      // 타깃이 제일 아래쪽에 있을 때 스크롤이 되지 않아 활성화 표시가 되지 않는 현상 수정
      if (targetY < document.body.scrollHeight - window.innerHeight) {
        this.anchorActive = true;
      } else {
        if (
          document.body.scrollHeight - window.innerHeight - window.scrollY >
          0
        ) {
          this.anchorActive = false;
        }
      }

      if (e) window.scrollTo(0, targetY - stickyH + 1);

      this.$emit('update:active', id);
      this.$router
        .replace({
          query: { ...this.$route.query, [this.name]: id },
        })
        .catch(() => {});
    },
    tabEvent(id) {
      console.log(id);
      if (id === this.$route.query[this.name]) return;
      this.$emit('update:active', id);
      this.$router.replace({
        query: { ...this.$route.query, [this.name]: id },
      });
    },
    moreAll() {
      if (this.modalTitle) {
        this.$_modalOpen({ name: 'tab-item-list' });
      } else {
        this.moreVisible = !this.moreVisible;
      }
      if (this.moreVisible) {
        this.$nextTick(function () {
          this.scrollMove();
        });
      }
    },
    scrollMove() {
      this.$nextTick(() => {
        const idx = this.list.findIndex((el) => el.id === this.active);
        let xValue = 0;
        if (idx !== -1) {
          xValue = this.$refs.tabItem[idx].offsetLeft;
          gsap.to(this.$refs.tabList, {
            scrollTo: { x: xValue - 20 },
            duration: 0.3,
            ease: Cubic.easeInOut,
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.tab-wrap {
  position: relative;
  width: auto !important;
  box-sizing: border-box;
  padding: 7px 0 15px;
  background: $white;
  &:before {
    /* opacity: 0;*/
    content: '';
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    will-change: opacity;
    background-color: $gray-30;
  }
  &.line {
    padding: 0;
    height: 61px;
    &:before {
      background: $gray-30;
    }
  }
}
ul {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  box-sizing: border-box;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none; // IE에서 스크롤바 감춤
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
  li {
    scroll-snap-align: start;
  }
}
.tab-line {
  padding: 0 10px;
  scroll-padding-left: 15px;
  border-bottom: 1px solid #eee;
  li:last-child {
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: -15px;
      width: 15px;
      top: 0;
      height: 1px;
    }
  }
  button,
  a {
    display: block;
    padding: 0 10px;
    font-size: 16px;
    color: #888;
    line-height: 50px;
    white-space: nowrap;
    font-weight: 500;
  }
  span {
    display: block;
    padding: 0 5px;
  }
  .active {
    button,
    a {
      position: relative;
      color: $black;
      font-weight: bold;
      &:after {
        position: absolute;
        left: 10px;
        bottom: 0;
        right: 10px;
        content: '';
        display: inline-block;
        border-bottom: 4px solid $mint-50;
      }
    }
    span {
    }
  }
}
.tab-round {
  padding: 0 53px 0 20px;
  scroll-padding-left: 20px;
  background: $white;
  li {
    position: relative;
    margin: 8px 5px 0 0;
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: -53px;
      width: 53px;
      top: 0;
      height: 1px;
    }
  }
  button,
  a {
    display: block;
    padding: 8px 15px 7px;
    border-radius: 18px;
    border: 1px solid $gray-30;
    font-size: 13px;
    line-height: 18px;
    color: gray;
    background: transparent;
    white-space: nowrap;
  }
  .active {
    button,
    a {
      color: $white;
      background: $mint-50;
      font-weight: bold;
      border: none;
    }
  }
}
.tab-main-wrap {
  /*  height: 50px;*/
  padding-bottom: 0;
  &:before {
    opacity: 1;
    background: $gray-30;
  }
}
.tab-main {
  padding: 0 0 0 12px;
  li {
    margin: 0 10px;
    button {
      width: 100%;
      padding: 11px 5px;
      text-align: center;
      font-size: 16px;
      line-height: 24px;
      color: $gray-60;
      font-weight: 500;
    }
    border-bottom: 4px solid transparent;
  }
  .active {
    button {
      font-weight: bold;
      color: $black;
    }
    border-bottom: 4px solid $mint-50;
  }
}
.more {
  z-index: 3;
  position: absolute;
  top: 15px;
  right: 0;
  display: inline-flex;
  width: 53px;
  height: 38px;
  align-items: center;
  background: url(#{$images}/img-tab-gradation.svg) center no-repeat;
  // background: linear-gradient(to right, transparent, white 20px);
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    margin-left: 20px;
    transition: all ease-in-out 0.3s;
    background: url(#{$images}/ic-down-20-bk-n.svg) center no-repeat;
  }
}
.show {
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.04);
  &:before {
    opacity: 0;
  }
  ul {
    padding: 0 50px 0 20px;
    flex-wrap: wrap;
    li {
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .more {
    &:before {
      transform: rotate(180deg);
    }
  }
}
</style>
