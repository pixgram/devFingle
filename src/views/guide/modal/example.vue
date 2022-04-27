<template>
  <modal
    :name="name"
    :classes="classes"
    :type="type"
    :dontClose="true"
    @open="openCallback"
    @openEnd="openEndCallback"
    @close="closeCallback"
    @closeEnd="closeEndCallback"
  >
    <template #header>
      <h2 class="modal-title">모달 예제1</h2>
    </template>
    <template #content>
      <input
        type="text"
        :value="testData"
        @input="$emit('update:testData', $event.target.value)"
      />
      <button type="button" class="btn-line-gray-md" @click="test">
        중첩모달 열기
      </button>
    </template>
    <template #footer>
      <div class="flex-btn-txt-group">
        <button
          type="button"
          class="btn-txt"
          @click="
            $_modalClose({
              name: name,
              value: false,
              transitionCallback: true,
              speed: 1,
            })
          "
        >
          취소
        </button>
        <button
          type="button"
          class="btn-txt-primary"
          @click="$_modalClose({ name: name, value: true })"
        >
          확인
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'example1',

  props: ['name', 'classes', 'type', 'testData'],

  methods: {
    async test() {
      const t = await this.$_modalOpen({ name: 'example2' });
      console.log(t);
    },
    openCallback() {
      console.log('openCallback');
    },
    openEndCallback() {
      console.log('openEndCallback');
    },
    closeCallback() {
      console.log('closeCallback');
    },
    closeEndCallback() {
      console.log('closeEndCallback');
    },
  },
};
</script>

<style scoped lang="scss">
.bullet-list {
  margin-top: 20px;
}
</style>
