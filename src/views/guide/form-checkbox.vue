<template>
  <div>
    <h2 class="h2">Default</h2>
    <form-checkbox v-model="check" :required="true"> 체크박스 </form-checkbox>
    <highlightjs :code="code1" />
    <hr />
    <h2 class="h2">Check All & List</h2>
    <form-checkbox-all
      v-model="agree.all"
      :checkboxList="
        agree.list.filter((el) => !el.disabled).map((el) => el.value)
      "
      :checkedArray.sync="agree.checked"
    >
      전체선택
    </form-checkbox-all>
    <ul class="check-list">
      <li class="check-item" v-for="(item, index) in agree.list" :key="index">
        <form-checkbox
          :val="item.value"
          v-model="agree.checked"
          :disabled="false"
          :required="true"
        >
          {{ item.label }}
        </form-checkbox>
        <button
          v-if="item.modal"
          type="button"
          class="btn-open-modal"
          title="약관 팝업 열기"
          @click="$_modalOpen({ name: item.modal })"
        >
          모달 오픈
        </button>
      </li>
    </ul>
    <highlightjs :code="code2" />
    <hr />

    <modalExample4 name="agreeModal" type="full" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'GuideCheckbox',
  mixins: [guideMixin],
  data() {
    return {
      check: false,
      agree: {
        all: false,
        checked: [],
        list: [
          {
            value: 'checkList-1',
            label: '서비스 이용 약관',
            modal: 'agreeModal',
          },
          {
            value: 'checkList-2',
            label: '개인정보 이용동의 약관',
          },
          {
            value: 'checkList-3',
            label: '고유식별정보 처리에 관한 약관',
          },
          {
            value: 'checkList-4',
            label: '통신사 이용 약관',
          },
        ],
      },
      code1:
        '<form-checkbox v-model="check" :required="true"> 체크박스 </form-checkbox>',
      code2:
        '<form-checkbox-all\n' +
        '  v-model="agree.all"\n' +
        '  :checkboxList="\n' +
        '    agree.list.filter((el) => !el.disabled).map((el) => el.value)\n' +
        '  "\n' +
        '  :checkedArray.sync="agree.checked"\n' +
        '>\n' +
        '  전체선택\n' +
        '</form-checkbox-all>\n' +
        '<ul class="check-list">\n' +
        '  <li class="check-item" v-for="(item, index) in agree.list" :key="index">\n' +
        '    <form-checkbox\n' +
        '      :val="item.value"\n' +
        '      v-model="agree.checked"\n' +
        '      :disabled="false"\n' +
        '      :required="true"\n' +
        '    >\n' +
        '      {{ item.label }}\n' +
        '    </form-checkbox>\n' +
        '    <button\n' +
        '      v-if="item.modal"\n' +
        '      type="button"\n' +
        '      class="btn-open-modal"\n' +
        '      title="약관 팝업 열기"\n' +
        '      @click="$_modalOpen({ name: item.modal })"\n' +
        '    >\n' +
        '      모달 오픈\n' +
        '    </button>\n' +
        '  </li>\n' +
        '</ul>',
    };
  },
  components: {
    modalExample4: () => import('@/views/guide/modal/example4.vue'),
  },
};
</script>
<style scoped lang="scss">
.code {
  min-height: 170px;
}
</style>
