<template>
  <modal :name="name" :type="type">
    <template #header>
      <h1 class="modal-title">modal header</h1>
    </template>
    <template #content>
      <ul class="bullet-list box">
        <li class="bullet-item">정보고지형 모달</li>
        <li class="bullet-item">
          Content 영역 Padding은 컨텐츠에 따라 변동됩니다.
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex-btn-group">
        <button
          type="button"
          class="btn-sub-lg"
          @click="$_modalClose({ name: name, speed: 0 })"
        >
          취소
        </button>
        <button
          type="button"
          class="btn-primary-md"
          @click="$_modalClose({ name: name, speed: 0 })"
        >
          확인
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import bus from '@/utils/bus';

export default {
  name: 'example6',

  props: ['name', 'type'],
  methods: {
    toast() {
      bus.$emit('toast', '가나다');
    },
  },
};
</script>

<style scoped lang="scss">
.bullet-list {
  margin-top: 20px;
}
</style>
