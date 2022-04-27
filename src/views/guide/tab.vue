<template>
  <div>
    <h2 class="h2">Default</h2>
    <sticky-item>
      <tab-item :list="tab.list" name="tab" :active.sync="tab.active" />
    </sticky-item>
    <div v-if="tab.active === '1'" class="guide-tab-cont">기본 탭 1</div>
    <div v-if="tab.active === '2'" class="guide-tab-cont">기본 탭 2</div>
    <highlightjs :code="code1" />
    <highlightjs :code="code2" />

    <h2 class="h2">Round Type</h2>
    <sticky-item>
      <tab-item
        :list="tab2.list"
        name="tab2"
        type="round"
        :active.sync="tab2.active"
      />
    </sticky-item>
    <div v-if="tab2.active === '1'" class="guide-tab-cont">기본 탭 1</div>
    <div v-if="tab2.active === '2'" class="guide-tab-cont">기본 탭 2</div>
    <highlightjs :code="code3" />
    <highlightjs :code="code4" />
    <div id="a" style="height: 1000px">1</div>
    <div id="b" style="height: 1000px">2</div>
    <div id="c" style="height: 1000px">3</div>
    <div id="d" style="height: 1000px">4</div>
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'tab',
  mixins: [guideMixin],
  data() {
    return {
      tab: {
        active: '4',
        list: [
          {
            title: '라우터 링크 탭',
            path: '/',
          },
          {
            title: '기본 탭',
            anchor: 'a',
          },
          {
            title: '기본 탭2',
            anchor: 'b',
          },
          {
            title: '기본 탭3',
            anchor: 'c',
          },
          {
            title: '기본 탭4',
            id: '4',
          },
          {
            title: '기본 탭5',
            id: '5',
          },
          {
            title: '기본 탭6',
            id: '6',
          },
          {
            title: 'a link 탭',
            url: 'www.naver.com',
          },
        ],
      },
      tab2: {
        active: '0',
        list: [
          {
            title: '라우터 링크 탭',
            path: '/',
            id: '0',
          },
          {
            title: '기본 탭',
            id: '1',
          },
          {
            title: '기본 탭2',
            id: '2',
          },
          {
            title: '기본 탭3',
            id: '3',
          },
          {
            title: '기본 탭4',
            id: '4',
          },
          {
            title: '기본 탭5',
            id: '5',
          },
          {
            title: '기본 탭6',
            id: '6',
          },
          {
            title: 'a link 탭',
            url: 'www.naver.com',
            id: '7',
          },
        ],
      },
      code1:
        '' +
        '<tab-item :list="tab.list" :active.sync="tab.active"/>\n' +
        '<div v-if="tab.active === 1">\n' +
        '  기본 탭 1\n' +
        '</div>\n' +
        '<div v-if="tab.active === 2">\n' +
        '  기본 탭 2\n' +
        '</div>',
      code2:
        '  tab: {\n' +
        "        active: '1',\n" +
        '        list: [\n' +
        '          {\n' +
        "            title: '라우터 링크 탭',\n" +
        "            path: '/',\n" +
        "            id: '0',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭',\n" +
        "            id: '1',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭2',\n" +
        "            id: '2',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭3',\n" +
        "            id: '3',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭4',\n" +
        "            id: '4',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭5',\n" +
        "            id: '5',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭6',\n" +
        "            id: '6',\n" +
        '          },\n' +
        '          {\n' +
        "            title: 'a link 탭',\n" +
        "            url: 'www.naver.com',\n" +
        "            id: '7',\n" +
        '          },\n' +
        '        ],\n' +
        '      },',
      code3:
        '' +
        '<tab-item :list="tab2.list" :active.sync="tab2.active" type="round" />\n' +
        '<div v-if="tab2.active === 1">\n' +
        '  기본 탭 1\n' +
        '</div>\n' +
        '<div v-if="tab2.active === 2">\n' +
        '  기본 탭 2\n' +
        '</div>',
      code4:
        ' tab2: {\n' +
        "        active: '0',\n" +
        '        list: [\n' +
        '          {\n' +
        "            title: '라우터 링크 탭',\n" +
        "            path: '/',\n" +
        "            id: '0',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭',\n" +
        "            id: '1',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭2',\n" +
        "            id: '2',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭3',\n" +
        "            id: '3',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭4',\n" +
        "            id: '4',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭5',\n" +
        "            id: '5',\n" +
        '          },\n' +
        '          {\n' +
        "            title: '기본 탭6',\n" +
        "            id: '6',\n" +
        '          },\n' +
        '          {\n' +
        "            title: 'a link 탭',\n" +
        "            url: 'www.naver.com',\n" +
        "            id: '7',\n" +
        '          },\n' +
        '        ],\n' +
        '      },',
    };
  },
};
</script>
<style scoped lang="scss">
.guide-tab-cont {
  padding: 20px;
}
</style>
