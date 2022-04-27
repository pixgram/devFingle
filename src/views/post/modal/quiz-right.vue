<template>
  <modal :name="name" :type="type" :dontClose="true">
    <template #header>
      <h2 class="modal-title">축하합니다 정답입니다!</h2>
    </template>
    <template #content>
      퀴즈를 맞혀 <strong class="mint-60">{{ point }} 베리</strong>를
      획득하셨어요.
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button type="button" class="btn-txt-primary" @click="modalClose">
          확인
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'quiz-right',
  components: {
    modal: () => import('@/components/common/modal'),
  },
  mounted() {
    // console.log(this);
  },
  props: ['name', 'type', 'point'],
  methods: {
    modalClose() {
      this.$emit('quize-right');
      this.$_modalClose({ name: 'quiz-right' });
    },
  },
};
</script>

<style scoped lang="scss"></style>
