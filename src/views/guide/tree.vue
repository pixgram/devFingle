<template>
  <div>
    <treeItem :treeData="treeData" />
    <highlightjs :code="code1" />
    <highlightjs langguage="js" :code="code2" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'tree-guide',
  mixins: [guideMixin],
  components: {
    treeItem: () => import('@/components/common/tree'),
  },
  data() {
    return {
      treeData: [
        {
          name: '트리트리1',
        },
        { name: '트리트리2' },
        {
          name: '트리트리3',
          children: [
            {
              name: '트리트리3-1',
              children: [{ name: '트리트리3-1-1' }, { name: '트리트리3-1-2' }],
            },
            { name: '트리트리3-2' },
            { name: '트리트리3-3' },
            {
              name: '트리트리3-4',
              children: [{ name: '트리트리3-4-1' }, { name: '트리트리3-4-2' }],
            },
          ],
        },
      ],
      code1: ' <treeItem :treeData="treeData"></treeItem>',
      code2:
        'treeData: [\n' +
        '  {\n' +
        '    name: "트리트리1",\n' +
        '  },\n' +
        '  { name: "트리트리2" },\n' +
        '  {\n' +
        '    name: "트리트리3",\n' +
        '    open: false,\n' +
        '    children: [\n' +
        '      {\n' +
        '        name: "트리트리3-1",\n' +
        '        open: false,\n' +
        '        children: [{ name: "트리트리3-1-1" }, { name: "트리트리3-1-2" }],\n' +
        '      },\n' +
        '      { name: "트리트리3-2" },\n' +
        '      { name: "트리트리3-3" },\n' +
        '      {\n' +
        '        name: "트리트리3-4",\n' +
        '        open: false,\n' +
        '        children: [{ name: "트리트리3-4-1" }, { name: "트리트리3-4-2" }],\n' +
        '      },\n' +
        '    ],\n' +
        '  },\n' +
        '],',
    };
  },
};
</script>

<style scoped lang="scss">
.tree-item {
  cursor: pointer;
}

.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
