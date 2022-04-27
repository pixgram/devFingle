<template>
  <modal
    name="runApp"
    type="bottom"
    @open="openCallback"
    @closeEnd="closeEndCallback"
  >
    <template #content>
      <p>
        핑글앱을 다운받아 보세요!<br />
        핑글코치에게 상담신청을 할 수 있습니다.
      </p>
    </template>
    <template #footer>
      <div class="flex-btn-group">
        <button type="button" class="btn-primary-md" @click="runAppFn">
          핑글 앱 실행하기
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'runApp',
  data() {
    return {};
  },
  methods: {
    runAppFn() {
      //TODO 이정민: 앱 경로 나오면 적용
      console.log('앱실행');
    },
    openCallback() {
      console.log('openCallback');
    },
    closeEndCallback() {
      console.log('closeEndCallback');
    },
  },
};
</script>

<style scoped lang="scss"></style>
