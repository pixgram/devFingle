<template>
  <modal :name="name" :type="type">
    <template #header><h2 class="modal-title">모달 예제5</h2></template>
    <template #content>
      <ul class="bullet-list">
        <li class="bullet-item">Full Modal</li>
      </ul>
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt"
          @click="$_modalOpen({ name: 'example4' })"
        >
          중첩모달 열기
        </button>
        <button
          type="button"
          class="btn-txt-primary"
          @click="$_modalClose({ name: 'example2' })"
        >
          닫기
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import bus from '@/utils/bus';

export default {
  name: 'example5',

  props: ['name', 'type'],
  methods: {
    toast() {
      bus.$emit('toast', { msg: '가나다', time: 3000 });
    },
  },
};
</script>

<style scoped lang="scss">
.bullet-list {
  margin-top: 20px;
}
</style>
