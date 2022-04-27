<template>
  <modal name="alert" :dontClose="true">
    <template #content>
      <div class="alert-txt">{{ msg }}</div>
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt"
          v-if="confirmState"
          @click="close(false)"
        >
          취소
        </button>
        <button type="button" class="btn-txt-primary" @click="close(true)">
          확인
        </button>
      </div>
    </template>
  </modal>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'alert',

  computed: {
    ...mapState('modal', ['modalList']),
    alertObj() {
      return this.modalList[
        this.modalList.findIndex((el) => el.name === 'alert')
      ];
    },
    msg() {
      return this.alertObj.msg;
    },
    confirmState() {
      return this.alertObj.confirm;
    },
  },
  methods: {
    close(state) {
      this.$_modalClose({ name: 'alert', value: state });
    },
  },
};
</script>
<style scoped lang="scss">
.alert-txt {
  white-space: pre-wrap;
}
</style>
