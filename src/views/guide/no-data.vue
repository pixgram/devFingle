<template>
  <div>
    <h2 class="h2">Default type</h2>
    <no-data />
    <highlightjs :code="code1" />
    <hr />

    <h2 class="h2">Text type</h2>
    <no-data>
      <template #text> 텍스트 직접 입력 형식입니다 </template>
    </no-data>
    <highlightjs :code="code2" />
    <hr />

    <h2 class="h2">icon-none</h2>
    <no-data>
      <template #icon>
        <i class="icon-none" />
      </template>
      <template #text> 아이콘과 직접 입력 텍스트가 있는 형식입니다 </template>
    </no-data>
    <highlightjs :code="code3" />

    <hr />

    <h2 class="h2">icon-ellipsis</h2>
    <no-data>
      <template #icon>
        <i class="icon-ellipsis" />
      </template>
      <template #text>
        보다 나은 답변을 드리고자<br />
        핑글에서 문제점을 알아보고 있습니다.
      </template>
    </no-data>
    <highlightjs :code="code4" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'modal-guide',
  mixins: [guideMixin],
  data() {
    return {
      code1: '<no-data />',
      code2:
        '<no-data>\n' +
        '  <template #text>텍스트 직접 입력 형식입니다</template>\n' +
        '</no-data>',
      code3:
        '<no-data>\n' +
        '   <template #icon>\n' +
        '     <i class="icon-none" />\n' +
        '   </template>\n' +
        '   <template #text>아이콘과 직접 입력 텍스트가 있는 형식입니다</template>\n' +
        '</no-data>',
      code4:
        '<no-data>\n' +
        '    <template #icon>\n' +
        '      <i class="icon-ellipsis" />\n' +
        '    </template>\n' +
        '    <template #text>\n' +
        '      보다 나은 답변을 드리고자<br />\n' +
        '      핑글에서 문제점을 알아보고 있습니다.\n' +
        '    </template>\n' +
        '</no-data>',
    };
  },
};
</script>
<style scoped lang="scss"></style>
