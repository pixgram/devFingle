<template>
  <div>
    <h2 class="h2">Wide</h2>
    <hr class="wide-gray" />
    <highlightjs :code="code1" />
    <h2 class="h2">Wide type2</h2>
    <hr class="wide-gray2" />
    <highlightjs :code="code2" />
    <h2 class="h2">line</h2>
    <hr class="line-gray" />
    <highlightjs :code="code3" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'hr',
  mixins: [guideMixin],
  data() {
    return {
      code1: '<hr class="wide-gray" />',
      code2: '<hr class="wide-gray2" />',
      code3: '<hr class="line-gray" />',
    };
  },
};
</script>
<style scoped lang="scss">
hr {
  border-top: 0;
}
.wide-gray2 {
  border-top: 1px solid #eee;
}
</style>
