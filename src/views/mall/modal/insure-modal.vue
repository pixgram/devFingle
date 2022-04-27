<template>
  <modal :name="name" type="full" @close="modalClose">
    <template #header>
      <h2 class="modal-title">{{ data.insPd.insPdNm }}</h2>
    </template>
    <template #content>
      <div v-html="data.insPd.insGurtCtt"></div>
    </template>
    <template #footer v-if="data.insPd.exrLinkPth">
      <div class="flex-btn-group">
        <button type="button" class="btn-primary-md" @click="linkTo(data)">
          보험료 확인하기
        </button>
      </div>
      <mall-confirm name="exrlink-confirm" :img="confirmImg" :title="confirmTitle" />
    </template>
  </modal>
</template>

<script>
import bridge from '@/utils/WebViewBridgeDefault';
import mallConfirm from '@/views/mall/modal/mall-confirm';

export default {
  name: 'insure-modal',
  components: {
    mallConfirm
  },
  props: {
    data: Object,
    name: String
  },
  data() {
    return {
      confirmImg: '',
      confirmTitle: '',
    };
  },
  methods: {
    modalClose() {
      this.$emit('update');
    },
    async linkTo(item) {
      this.confirmImg = item.files ? item.files[0].urlPth : '';
      this.confirmTitle = item.insPd.inscoNm;

      const t = await this.$_modalOpen({ name: 'exrlink-confirm' });

      if (t) {
        // - 브릿지이동 외부 링크
        bridge.callNative.moveViewControl('outlink', '', item.exrLinkPth);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
