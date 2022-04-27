<template>
  <modal :name="name" :type="type">
    <template #header>
      <h2 class="modal-title">앱 다운로드 팝업</h2>
    </template>
    <template #content>
      핑글에서 유익한 콘텐츠들을 만나보고 나만을 위한 포스트를 발견해보세요.
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button type="button" class="btn-txt-primary">포스트 보러 가기</button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'app-down',
  components: {
    modal: () => import('@/components/common/modal'),
  },
  mounted() {
    // console.log(this);
  },
  props: ['name', 'type'],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
