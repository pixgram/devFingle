<template>
  <modal :name="name" :type="type" :dontClose="true">
    <template #content>
      아쉽지만 정답이 아니에요.<br />
      다시한번 풀어보세요!
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt-primary"
          @click="$_modalClose({ name: 'quiz-wrong' })"
        >
          확인
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'quiz-wrong',
  components: {
    modal: () => import('@/components/common/modal'),
  },
  mounted() {
    // console.log(this);
  },
  props: ['name', 'type'],
};
</script>

<style scoped lang="scss"></style>
