<template>
  <div>
    <h2 class="h2">&lt;form-textarea&gt;</h2>
    <form-textarea
      v-model="textarea.value"
      :maxlength="textarea.maxlength"
      :placeholder="textarea.placeholder"
    />
    <highlightjs :code="code1" />
    <highlightjs :code="code2" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'color',
  mixins: [guideMixin],
  data() {
    return {
      textarea: {
        value: '',
        maxlength: 100,
        placeholder: '스타일리스트 상담에 대한 후기를 남겨주세요.',
      },
      code1:
        '<form-textarea\n' +
        '  v-model="textarea.value"\n' +
        '  :maxlength="textarea.maxlength"\n' +
        '  :placeholder="textarea.placeholder"\n' +
        '/>',
      code2:
        '<script>\n' +
        'data() {\n' +
        '  return {\n' +
        '    textarea: {\n' +
        '      value: "",\n' +
        '      maxlength: 100,\n' +
        '      placeholder: "스타일리스트 상담에 대한 후기를 남겨주세요.",\n' +
        '    },\n' +
        '  };\n' +
        '},\n' +
        '<script/>',
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
