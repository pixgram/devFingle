<template>
  <container :header="false" class="pb0">
    <div class="agree-wrap">
      <div class="agree-inner">
        <h1>{{ title }}</h1>
        <agree-conts @update="titleUpdate" />
      </div>
      <div class="fixed-btn-box">
        <button type="button" class="btn-primary-md" @click="closeAgree">
          확인
        </button>
      </div>
    </div>
  </container>
</template>

<script>
import bridge from '@/utils/WebViewBridgeDefault';
import agreeConts from '@/components/agree-contents';
export default {
  name: 'agree',
  components: {
    agreeConts,
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    titleUpdate(title) {
      this.title = title;
    },
    closeAgree() {
      bridge.callNative.closeWeb();
    },
  },
};
</script>

<style scoped lang="scss">
.pb0 {
  ::v-deep .contents {
    padding-bottom: 0;
  }
}
.agree-wrap {
  display: flex;
  flex-direction: column;
  margin: 0 -20px;
  box-sizing: border-box;
  overflow: hidden;
  .agree-inner {
    height: $h100;
    padding: 71px 20px calc($safeBottom + 90px);
    box-sizing: border-box;
    overflow: auto;
  }
  h1 {
    font-size: 24px;
    line-height: 30px;
  }

  .fixed-btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 20px calc($safeBottom + 20px);
    box-sizing: border-box;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      #fff 100%
    );
    [class^='btn-'] {
      width: 100%;
    }
  }
}
</style>
