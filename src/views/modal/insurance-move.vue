<template>
  <modal name="sns-share" :type="type">
    <template #content>
      <strong class="mint-60">{{ insPdsData.inscoNm }}</strong> (으)로
      이동합니다. 이동하시겠습니까?
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt-primary"
          @click="$_modalClose({ name: name })"
        >
          취소
        </button>
        <button type="button" class="btn-txt-primary" @click="moveOutLink">
          확인
        </button>
      </div>
    </template>
  </modal>
</template>
<script>
import bridge from '@/utils/WebViewBridgeDefault';
export default {
  name: 'insurance-move',
  props: ['type', 'name', 'insPdsData'],
  methods: {
    moveOutLink() {
      bridge.callNative.moveViewControl(
        'outlink',
        '',
        this.insPdsData.exrLinkPth
      );
    },
  },
};
</script>
<style scoped lang="scss"></style>
