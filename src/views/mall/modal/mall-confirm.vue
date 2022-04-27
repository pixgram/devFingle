<template>
  <modal :name="name" :classes="classes" :type="type" :dontClose="true">
    <template #content>
      <div class="txt">
        <img :src="img" :alt="title" @error="noImage" />
        <span>
          <strong>{{ title }}</strong> (으)로<br />이동하시겠습니까?
        </span>
      </div>
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
  name: 'mallConfirm',

  props: ['name', 'classes', 'type', 'img', 'title'],

  methods: {},
};
</script>

<style scoped lang="scss">
.txt {
  display: flex;
  img {
    height: 40px;
    width: 40px;
    border: none;
    margin-right: 10px;
  }
}
</style>
