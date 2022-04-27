<template>
  <modal name="sns-share" :type="type" :dontClose="true">
    <template #header><h2 class="modal-title">공유하기</h2></template>
    <template #content>
      <snsList />
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt-primary"
          @click="$_modalClose({ name: 'sns-share' })"
        >
          닫기
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import snsList from '@/components/sns-list';

export default {
  name: 'sns',
  components: {
    modal: () => import('@/components/common/modal'),
    snsList,
  },
  props: ['name', 'type'],
};
</script>

<style scoped lang="scss"></style>
