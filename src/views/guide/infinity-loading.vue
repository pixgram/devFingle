<template>
  <div>
    <h2 class="h2">무한스크롤 로딩</h2>
    <highlightjs :code="code1" />
    <h2 class="h2">필터나 탭이 있을때 새 구성요소로 다시 재설정 할때</h2>
    <highlightjs :code="code2" />
    <highlightjs :code="code3" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'infinity-loading',
  mixins: [guideMixin],
  data() {
    return {
      code1:
        '<infinite-loading>\n' +
        '  <div slot="spinner">Loading...</div> //로딩중 커스텀\n' +
        '  <div slot="no-more">No more message</div> // 더 불러올게 없을때\n' +
        '  <div slot="no-results">No results message</div> //데이터가 없을때\n' +
        '  <div slot="no-more"/> \n' +
        '</infinite-loading> //메세지 사용하지 않을땐 빈 태그로',
      code2:
        '<form-select\n' +
        '      type="sort"\n' +
        '      v-model="sortData.value"\n' +
        '      :options="sortData.options"\n' +
        '      @formChange="changeSort"\n' +
        '/>\n' +
        '<infinite-loading\n' +
        '      @infinite="infiniteHandler($event, fetchData())"\n' +
        '      :identifier="infiniteId" //이 속성이 변경되면 구성요소가 재설정됨.\n' +
        '>',
      code3:
        'data() {\n' +
        '    return {\n' +
        '      infiniteId: +new Date(), //어떠한 변수 설정 \n' +
        '    }\n' +
        '}\n' +
        'methods: {\n' +
        '    changeSort() {\n' +
        '      this.page = 1;\n' +
        '      this.listData = [];\n' +
        '      this.infiniteId += 1; //데이터변수를 변경하여 재설정\n' +
        '    },\n' +
        '}',
      code4: '',
    };
  },
};
</script>

<style scoped></style>
