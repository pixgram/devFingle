<template>
  <div>
    <h2 class="h2">Default</h2>
    <accordion-element>
      <template #title>타이틀영역</template>
      <template #cont>
        <ul>
          <li>컨텐츠영역</li>
          <li>컨텐츠영역</li>
          <li>컨텐츠영역</li>
        </ul>
        <p>아아아</p>
      </template>
    </accordion-element>
    <highlightjs language="javascript" code="var x = 5;" />
    <highlightjs :code="code1" />
    <hr />
    <h2 class="h2">Default Open</h2>
    <accordion-element :show="true">
      <template #title>타이틀영역2</template>
      <template #cont>
        <ul>
          <li>컨텐츠영역2</li>
          <li>컨텐츠영역2</li>
          <li>컨텐츠영역2</li>
        </ul>
        <p>아아아2</p>
      </template>
    </accordion-element>
    <highlightjs :code="code2" />
    <hr />
    <h2 class="h2">List</h2>
    <accordion-element :list="list" :show="0">
      <template #title="{ item }">
        {{ item.title }}
      </template>
      <template #cont="{ item }">
        {{ item.cont }}
      </template>
    </accordion-element>
    <highlightjs :code="code3" />
    <hr />
    <h2 class="h2">List Open</h2>
    <accordion-element :list="list" :show="0">
      <template #title="{ item }">
        {{ item.title }}
      </template>
      <template #cont="{ item }">
        {{ item.cont }}
      </template>
    </accordion-element>
    <highlightjs :code="code4" />
    <hr />
    <h2 class="h2">Auto Close</h2>
    <accordion-element :list="list" :auto="true">
      <template #title="{ item }">
        {{ item.title }}
      </template>
      <template #cont="{ item }">
        {{ item.cont }}
      </template>
    </accordion-element>
    <highlightjs :code="code5" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
import accordionElement from '@/components/accordion-element';
export default {
  name: 'accordion',
  mixins: [guideMixin],
  components: { accordionElement },
  data() {
    return {
      list: [
        { title: '타이틀1', cont: '컨텐츠1' },
        { title: '타이틀2', cont: '컨텐츠2' },
        { title: '타이틀3', cont: '컨텐츠3' },
        { title: '타이틀4', cont: '컨텐츠4' },
      ],
      code1:
        '<accordion-element>\n' +
        '  <template #title>타이틀영역</template>\n' +
        '  <template #cont>\n' +
        '    <ul>\n' +
        '      <li>컨텐츠영역</li>\n' +
        '      <li>컨텐츠영역</li>\n' +
        '      <li>컨텐츠영역</li>\n' +
        '    </ul>\n' +
        '    <p>아아아</p>\n' +
        '  </template>\n' +
        '</accordion-element>',
      code2:
        '<accordion-element :show="true">\n' +
        '  <template #title>타이틀영역2</template>\n' +
        '  <template #cont>\n' +
        '    <ul>\n' +
        '      <li>컨텐츠영역2</li>\n' +
        '      <li>컨텐츠영역2</li>\n' +
        '      <li>컨텐츠영역2</li>\n' +
        '    </ul>\n' +
        '    <p>아아아2</p>\n' +
        '  </template>\n' +
        '</accordion-element>',
      code3:
        '<accordion-element :list="list" :show="0">\n' +
        '  <template #title="{ item }">\n' +
        '    {{ item.title }}\n' +
        '  </template>\n' +
        '  <template #cont="{ item }">\n' +
        '    {{ item.cont }}\n' +
        '  </template>\n' +
        '</accordion-element>\n',
      code4:
        '<accordion-element :list="list" :show="0">\n' +
        '  <template #title="{ item }">\n' +
        '    {{ item.title }}\n' +
        '  </template>\n' +
        '  <template #cont="{ item }">\n' +
        '    {{ item.cont }}\n' +
        '  </template>\n' +
        '</accordion-element>',
      code5:
        '<accordion-element :list="list" :auto="true">\n' +
        '  <template #title="{ item }">\n' +
        '    {{ item.title }}\n' +
        '  </template>\n' +
        '  <template #cont="{ item }">\n' +
        '    {{ item.cont }}\n' +
        '  </template>\n' +
        '</accordion-element>',
    };
  },
};
</script>
<style scoped lang="scss"></style>
