<template>
  <modal :name="name" :type="type" @open="open">
    <template #header><h2 class="modal-title">모달 예제4</h2></template>
    <template #content>
      <ul class="bullet-list box">
        <li class="bullet-item">정보고지형 모달</li>
        <li class="bullet-item">
          Content 영역 Padding은 컨텐츠에 따라 변동됩니다.
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt"
          @click="$_modalClose({ name: name, speed: 0 })"
        >
          취소
        </button>
        <button type="button" class="btn-txt-primary" @click="toast">
          Toast Open
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import bus from '@/utils/bus';

export default {
  name: 'example4',

  props: ['name', 'type', 'agreeModalSeq'],
  methods: {
    toast() {
      bus.$emit('toast', { msg: '가나다', time: 3000 });
    },
    open() {
      this.api(this.agreeModalSeq);
    },
  },
};
</script>

<style scoped lang="scss">
.bullet-list {
  margin-top: 20px;
}
</style>
