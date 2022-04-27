<template>
  <div>
    <h2 class="h2">Default</h2>
    <form-input type="search" v-model="searchVal">
      <button type="button" class="search" @click="searchFn">검색</button>
    </form-input>
    <highlightjs :code="code1" />
    <h2 class="h2">No Data Search</h2>
    <form-input type="search" v-model="searchVal">
      <button type="button" class="search" @click="searchFn">검색</button>
    </form-input>
    <template v-if="list.length === 0">
      <no-data v-if="searchNoData.length > 0">
        <template #icon>
          <i class="icon-none" />
        </template>
        <template #text>
          <template>
            ‘{{ searchNoData }}’ 에 대한 검색 결과가 없습니다.
          </template>
        </template>
      </no-data>
      <no-data v-else>
        <template #icon>
          <i class="icon-ellipsis" />
        </template>
        <template #text>
          <template>
            보다 나은 답변을 드리고자<br />
            핑글에서 문제점을 알아보고 있습니다.
          </template>
        </template>
      </no-data>
    </template>
    <highlightjs :code="code2" />
    <highlightjs language="javascript" :code="javaCode2" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'guide-input',
  mixins: [guideMixin],
  data() {
    return {
      list: [],
      searchVal: '',
      searchNoData: '',
      code1:
        '' +
        '<form-input type="search" v-model="searchVal">\n' +
        '    <button type="button" class="search">검색</button>\n' +
        '</form-input>',
      code2:
        '' +
        '<form-input type="search" v-model="searchVal">\n' +
        '  <button type="button" class="search" @click="searchFn">검색</button>\n' +
        '</form-input>\n' +
        '<template v-if="list.length === 0">\n' +
        '  <no-data v-if="searchNoData.length > 0">\n' +
        '    <template #icon>\n' +
        '      <i class="icon-none" />\n' +
        '    </template>\n' +
        '    <template #text>\n' +
        '      <template>\n' +
        '        ‘{{ searchNoData }}’ 에 대한 검색 결과가 없습니다.\n' +
        '      </template>\n' +
        '    </template>\n' +
        '  </no-data>\n' +
        '  <no-data v-else>\n' +
        '    <template #icon>\n' +
        '      <i class="icon-ellipsis" />\n' +
        '    </template>\n' +
        '    <template #text>\n' +
        '      <template>\n' +
        '        보다 나은 답변을 드리고자<br />\n' +
        '        핑글에서 문제점을 알아보고 있습니다.\n' +
        '      </template>\n' +
        '    </template>\n' +
        '  </no-data>\n' +
        '</template>',
      javaCode2:
        'data(){\n' +
        '  return{\n' +
        '    list: [],\n' +
        "    searchVal: '',\n" +
        "    searchNoData: '',\n" +
        '  }\n' +
        '},\n' +
        'methods: {\n' +
        '  searchFn() {\n' +
        '    if (this.searchNoData === this.searchVal) return;\n' +
        '    this.searchNoData = this.searchVal;\n' +
        '  },\n' +
        '},',
    };
  },
  methods: {
    searchFn() {
      if (this.searchNoData === this.searchVal) return;
      this.searchNoData = this.searchVal;
    },
  },
};
</script>
<style scoped></style>
