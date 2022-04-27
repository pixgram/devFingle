<template>
  <div>
    <h2 class="h2">Variables</h2>

    <highlightjs :code="code1" />
    <h2 class="h2">Grayscale</h2>
    <ul class="colors">
      <li class="bg-gray-10"></li>
      <li class="bg-gray-20"></li>
      <li class="bg-gray-30"></li>
      <li class="bg-gray-40"></li>
      <li class="bg-gray-50"></li>
      <li class="bg-gray-70"></li>
    </ul>
    <h2 class="h2">mint</h2>
    <ul class="colors">
      <li class="bg-mint-10"></li>
      <li class="bg-mint-20"></li>
      <li class="bg-mint-30"></li>
      <li class="bg-mint-40"></li>
      <li class="bg-mint-50"></li>
      <li class="bg-mint-60"></li>
    </ul>

    <h2 class="h2">orange</h2>
    <ul class="colors">
      <li class="bg-orange-05"></li>
      <li class="bg-orange-10"></li>
      <li class="bg-orange-20"></li>
      <li class="bg-orange-30"></li>
      <li class="bg-orange-40"></li>
    </ul>
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'color',
  mixins: [guideMixin],
  data() {
    return {
      code1:
        '$white: #fff;\n' +
        '$black: #000;\n' +
        '\n' +
        '$gray-10: #fafafa;\n' +
        '$gray-20: #f7f7f7;\n' +
        '$gray-30: #eee;\n' +
        '$gray-40: #ddd;\n' +
        '$gray-50: #bbb;\n' +
        '$gray-70: #444;\n' +
        '\n' +
        '$mint-10: #effaf7;\n' +
        '$mint-20: #def8f2;\n' +
        '$mint-30: #adeddc;\n' +
        '$mint-40: #72e1c5;\n' +
        '$mint-50: #00d4ac;\n' +
        '$mint-60: #00bc99;\n' +
        '\n' +
        '$orange-10: #ffd9ca;\n' +
        '$orange-20: #b22dcc;\n' +
        '$orange-30: #ff7031;\n' +
        '$orange-40: #fe5600;',
    };
  },
};
</script>
<style scoped lang="scss">
.colors {
  display: flex;
  li {
    height: 50px;
    flex: 0 0 50px;
  }
}
</style>
