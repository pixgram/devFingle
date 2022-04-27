<template>
  <div>
    <h2 class="h2">Default</h2>
    <highlightjs :code="code1" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'toast',
  mixins: [guideMixin],
  data() {
    return {
      code1: 'this.toast("토스트 알럿입니다.");',
    };
  },
  mounted() {
    this.toast('토스트 알럿입니다.');
  },
};
</script>
<style scoped></style>
