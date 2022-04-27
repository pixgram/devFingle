<template>
  <div>
    <h2 class="h2">핑글코치 단일 타입</h2>
    <coachItem :coachData="coachDataSingle" tag="div" />
    <highlightjs :code="code1" />
    <h2 class="h2">핑글코치 리스트 타입 (array)</h2>
    <ul>
      <coachItem
        v-for="(item, index) in coachData"
        :key="index"
        :coachData="item"
      />
    </ul>
    <highlightjs :code="code2" />
    <h3 class="h3">Import</h3>
    <highlightjs :code="code3" />
  </div>
</template>

<script>
import coachItem from '@/components/coach-item';
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'coach',
  components: { coachItem },
  mixins: [guideMixin],
  data() {
    return {
      coachDataSingle: {
        category: 'A',
        subCategory: [
          '헬스트레이너',
          '영양사',
          '간호사',
          '종합건강보험',
          '실손의료비',
        ],
        name: '전문가명노출 전문가명노출 전문가명노출 전문가명노출 전문가명노출 전문가명노출',
        counselNum: '32',
        subscript: '서브텍스트 최대 두줄 노출',
        starNum: '3.8',
        badge: ['32년경력', 'GA자격'],
        picture: String,
        wish: '',
      },
      coachData: [
        {
          category: 'A',
          subCategory: [
            '헬스트레이너',
            '영양사',
            '간호사',
            '종합건강보험',
            '실손의료비',
          ],
          name: '전문가명노출 전문가명노출 전문가명노출 전문가명노출 전문가명노출 전문가명노출',
          counselNum: '32',
          subscript: '서브텍스트 최대 두줄 노출',
          starNum: '3.8',
          badge: ['32년경력', 'GA자격'],
          picture: String,
          wish: '',
        },
        {
          category: 'B',
          subCategory: [
            '헬스트레이너',
            '영양사',
            '간호사',
            '종합건강보험',
            '실손의료비',
          ],
          name: '전문가명노출 전문가명노출 전문가명노출 전문가명노출 전문가명노출 전문가명노출',
          counselNum: '32',
          subscript: '서브텍스트 최대 두줄 노출',
          starNum: '3.8',
          badge: ['32년경력', 'GA자격'],
          picture: String,
          wish: '',
        },
      ],
      code1:
        '<template>\n' +
        '  <div>\n' +
        '    <coachItem :coachData="coachData" />\n' +
        '  </div>\n' +
        '</template>',
      code2:
        '<template>\n' +
        '  <div>\n' +
        '    <coachItem\n' +
        '        v-for="(item, index) in coachData"\n' +
        '        :key="index"\n' +
        '        :coachData="item"\n' +
        '     />\n' +
        '  </div>\n' +
        '</template>',
      code3:
        "import coachItem from '@/components/coach/index';\n" +
        'export default {\n' +
        '    components: { coachItem },\n' +
        '}\n',
    };
  },
};
</script>

<style scoped lang="scss"></style>
