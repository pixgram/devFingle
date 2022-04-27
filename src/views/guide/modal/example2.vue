<template>
  <modal :name="name" :type="type" :dontClose="true">
    <template #header><h2 class="modal-title">모달 예제2</h2></template>
    <template #content>
      <ul class="bullet-list">
        <li class="bullet-item">alert, confirm Style 동일</li>
        <li class="bullet-item">서브 글자 수 제한없이 노출됩니다.</li>
      </ul>

      <modalExample4 name="example4" type="bottom" />
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
export default {
  name: 'example2',
  components: {
    modal: () => import('@/components/common/modal'),
    modalExample4: () => import('@/views/guide/modal/example4.vue'),
  },
  mounted() {
    console.log(this);
  },
  props: ['name', 'type'],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
