<template>
  <modal :name="name" :type="type">
    <template #header>
      <h2 class="modal-title">
        <span class="mint-50">타이틀</span> 글자 수 제한 없이 노출 됩니다
      </h2>
    </template>
    <template #content>
      <div class="bg"></div>
    </template>
    <template #footer>
      <div class="flex-btn-group">
        <button
          type="button"
          class="btn-line-gray-md"
          @click="$_modalClose({ name: name })"
        >
          취소
        </button>

        <button
          type="button"
          class="btn-primary-md"
          @click="$_modalClose({ name: name })"
        >
          확인
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'example3',

  props: ['name', 'type'],
  data() {
    return {
      testInp: '',
    };
  },
  methods: {
    /* contentAdd() {
      this.$emit('contentAdd', this.testInp);
      this.testInp = null;
      this.$_modalClose(this.name);
    },*/
  },
};
</script>

<style scoped lang="scss">
.bullet-list {
  margin-top: 20px;
}
.bg {
  height: 217px;
  background-color: $gray-40;
}
</style>
