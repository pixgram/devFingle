<template>
  <sticky-item>
    <header>
      <button
        type="button"
        class="back"
        @click="goBack"
        v-if="type === 'default'"
      >
        <span class="blind">뒤로가기</span>
      </button>
      <h1 class="page-title" ref="title" :style="{ opacity: titleOpacity }">
        {{ title || metaTitle }}
      </h1>
      <button
        type="button"
        class="modal-close"
        v-if="type === 'modal'"
        @click="goBack"
      >
        <span class="blind">닫기</span>
      </button>
    </header>
  </sticky-item>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import bridge from '@/utils/WebViewBridgeDefault';
import bus from '@/utils/bus';

export default {
  name: 'AppHeader',
  data() {
    return {
      metaTitle: '',
    };
  },
  props: {
    type: {
      type: String,
      default: 'default',
      require: true,
      validator: function (value) {
        return ['default', 'modal', 'titleOnly'].indexOf(value) !== -1;
      },
    },
    title: String,
  },
  computed: {
    ...mapState(['canLeaveSite']),
    ...mapState('fadeTitle', ['titleOpacity']),
  },
  methods: {
    ...mapMutations('pageTransition', ['PAGE_DIRECTION']),
    async goBack() {
      if (!window.history.state?.pageNum) {
        if (!this.canLeaveSite) {
          const t = await new Promise((resolve) => {
            bus.$emit('pageLeave', resolve);
          });
          if (t) {
            bridge.callNative.closeWeb();
          }
        } else {
          bridge.callNative.closeWeb();
        }
      } else {
        this.PAGE_DIRECTION(-1);
        this.$router.go(-1);
      }
    },
    closeBridge() {
      bridge.callNative.closeWeb();
    },
  },
  mounted() {
    this.metaTitle = this.$route.meta.title || '';
  },
};
</script>
<style scoped lang="scss">
.header.sticky-wrap {
  z-index: 100;
}
header {
  display: flex;
  padding: 15px 10px 15px 20px;
  box-sizing: border-box;
  background-color: $white;
}
.back {
  flex: 0 0 auto;
  width: 24px;
  height: 26px;
  margin-right: 10px;
  background: url(../assets/images/ic-back-24-bk-n.svg) center no-repeat;
}
.page-title {
  font-size: 18px;
  line-height: 26px;
  font-weight: bold;
  color: $black;
  will-change: opacity;
}
.modal-close {
  z-index: 10;
  position: absolute;
  top: 11px;
  right: 15px;
  width: 34px;
  height: 34px;
  padding: 0;
  overflow: hidden;
  text-indent: -9999px;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -12px 0 0 -12px;
    width: 24px;
    height: 24px;
    background: url('../assets/images/ic-close-24-bk-n.svg') no-repeat;
  }
}
</style>
