<template>
  <div>
    <h2 class="h2">Default</h2>
    <form-select
      v-model="selectData1.value"
      :options="selectData1.options"
      title="통신사 선택"
      label="금융기관"
      placeholder="옵션 선택"
    />
    <highlightjs :code="code1" />

    <h2 class="h2">Border</h2>
    <form-select
      v-model="selectData3.value"
      :options="selectData3.options"
      border="border"
      placeholder="문의 유형을 선택해주세요"
    />
    <highlightjs :code="code6" />

    <h2 class="h2">No Title</h2>
    <form-select
      v-model="selectData2.value"
      :options="selectData2.options"
      label="금융기관"
      placeholder="옵션 선택"
    />
    <highlightjs :code="code2" />

    <h2 class="h2">Auto Width</h2>
    <form-select
      v-model="selectData2.value"
      :options="selectData2.options"
      title="통신사 선택"
      label="금융기관"
      :autoWidth="true"
      placeholder="옵션 선택"
    />
    <highlightjs :code="code3" />

    <h2 class="h2">Custom Slot</h2>
    <form-select
      v-model="selectData2.value"
      :options="selectData2.options"
      title="통신사 선택"
      label="금융기관"
      placeholder="옵션 선택"
    >
      <template #modalFooter>
        <div>
          <button type="button">취소</button>
          <button type="button">확인</button>
        </div>
      </template>
    </form-select>
    <highlightjs :code="code4" />
    <h2 class="h2">Sort</h2>
    <form-select
      type="sort"
      v-model="sortData.value"
      :options="sortData.options"
    />
    <highlightjs :code="code5" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'GuideSelect',
  mixins: [guideMixin],
  data() {
    return {
      code1:
        '<form-select\n' +
        '  v-model="selectData3.value"\n' +
        '  :options="selectData3.options"\n' +
        '  title="통신사 선택"\n' +
        '  label="금융기관"\n' +
        '  placeholder="옵션 선택3"\n' +
        '/>',
      code2:
        '<form-select\n' +
        '  v-model="selectDatlue"\n' +
        '  :options="selectData2.options"\n' +
        '  label="금융기관"\n' +
        '  placeholder="옵션 선택"\n' +
        '/>',
      code3:
        '<form-select\n' +
        '  v-model="selectData2.value"\n' +
        '  :options="selectData2.options"\n' +
        '  title="통신사 선택"\n' +
        '  label="금융기관"\n' +
        '  :autoWidth="true"\n' +
        '  placeholder="옵션 선택"\n' +
        '/>',
      code4:
        '<form-select\n' +
        '  v-model="selectData2.value"\n' +
        '  :options="selectData2.options"\n' +
        '  title="통신사 선택"\n' +
        '  label="금융기관"\n' +
        '  placeholder="옵션 선택"\n' +
        '>\n' +
        '  <template #modalFooter>\n' +
        '    <div>\n' +
        '      <button type="button">취소</button>\n' +
        '      <button type="button">확인</button>\n' +
        '    </div>\n' +
        '  </template>\n' +
        '</form-select>',
      code5:
        '<form-select\n' +
        ' type="sort"\n' +
        ' v-model="sortData.value"\n' +
        ' :options="sortData.options"\n' +
        '/>',
      code6:
        '<form-select\n' +
        '  v-model="selectData3.value"\n' +
        '  :options="selectData3.options"\n' +
        '  border="border"\n' +
        '  placeholder="문의 유형을 선택해주세요"\n' +
        '/>',
      selectData1: {
        options: [
          {
            value: '3-1',
            label: 'SKT',
          },
          {
            value: '3-2',
            label: 'KT',
          },
          {
            value: '3-3',
            label: 'LG U+',
          },
          {
            value: '3-4',
            label: 'SKT 알뜰폰',
            disabled: true,
          },
          {
            value: '3-5',
            label: 'KT 알뜰폰',
          },
        ],
        required: true,
        value: '',
      },
      selectData2: {
        options: [
          {
            value: '4-1',
            label: 'option4-1',
          },
          {
            value: '4-2',
            label:
              'option4-2 option4-2 option4-2 option4-2 option4-2 option4-2 option4-2 option4-2 option4-2',
          },
          {
            value: '4-3',
            label: 'option4-3',
          },
          {
            value: '4-4',
            label: 'option4-4',
            disabled: true,
          },
        ],
        required: true,
        value: '',
      },
      selectData3: {
        options: [
          {
            value: '4-1',
            label: '회원가입/로그인',
          },
          {
            value: '4-2',
            label: '스타일링',
          },
          {
            value: '4-3',
            label: '보험조회',
          },
          {
            value: '4-4',
            label: '보험금 청구',
          },
          {
            value: '4-5',
            label: '보험몰',
          },
          {
            value: '4-6',
            label: '핑글코치',
          },
        ],
        required: true,
        value: '',
      },
      sortData: {
        options: [
          {
            value: '상담많은순',
            label: '상담많은순',
          },
          {
            value: '인기순',
            label: '인기순',
          },
          {
            value: '평점높은순',
            label: '평점높은순',
          },
        ],
        value: '평점높은순',
      },
    };
  },
};
</script>
<style scoped lang="scss">
.code {
  min-height: 170px;
}
</style>
