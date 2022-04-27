<template>
  <div>
    <h2 class="h2">Default</h2>
    <form-radio required val="a" name="radio3" v-model="radio3">
      가나다1
    </form-radio>
    <form-radio required val="b" name="radio3" v-model="radio3">
      가나다2
    </form-radio>
    <form-radio required val="c" name="radio3" v-model="radio3">
      가나다3
    </form-radio>
    <div>
      {{ radio3 }}
    </div>
    <highlightjs :code="code1" />

    <hr />

    <h3 class="h3">v-for 방식</h3>
    <ul>
      <li v-for="item in radio1.list" :key="item.value">
        <form-radio
          :disabled="item.disabled"
          :required="radio1.required"
          :val="item.value"
          name="radio1"
          v-model="radio1.value"
          @change="customEvt($event, item.label)"
        >
          {{ item.label }}
        </form-radio>
      </li>
    </ul>
    <div>
      {{ radio1.value }}
    </div>
    <highlightjs :code="code2" />

    <hr />

    <h2 class="h2">v-for</h2>
    <ul class="test-3">
      <li v-for="item in radio2.list" :key="item.value">
        <form-radio
          class="form-radio-btn"
          :disabled="item.disabled"
          :required="radio2.required"
          :val="item.value"
          name="radio2"
          v-model="radio2.value"
          @change="customEvt($event, item.label)"
        >
          {{ item.label }}
        </form-radio>
      </li>
    </ul>
    <div>
      {{ radio2.value }}
    </div>

    <highlightjs :code="code3" />

    <hr />

    <h2 class="h2">v-for : 세로 정렬</h2>
    <ul class="test-4">
      <li v-for="item in radio4.list" :key="item.value">
        <form-radio
          class="form-radio-btn"
          :disabled="item.disabled"
          :required="radio4.required"
          :val="item.value"
          name="radio2"
          v-model="radio4.value"
          @change="customEvt($event, item.label)"
        >
          {{ item.label }}
        </form-radio>
      </li>
    </ul>
    <div>
      {{ radio4.value }}
    </div>

    <highlightjs :code="code4" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'GuideRadio',
  mixins: [guideMixin],
  data() {
    return {
      radio1: {
        list: [
          {
            value: '1',
            label: '라디오1',
          },
          {
            value: '2',
            label: '라디오2',
          },
          {
            value: '3',
            label: '라디오3',
          },
          {
            value: '4',
            label: '라디오4',
            disabled: true,
          },
        ],
        required: true,
        value: '2',
      },
      radio2: {
        list: [
          {
            value: '1',
            label: '라디오1',
          },
          {
            value: '2',
            label: '라디오2',
            disabled: true,
          },
          {
            value: '3',
            label: '라디오3',
            className: 'test-class',
          },
          {
            value: '4',
            label: '라디오4',
          },
          {
            value: '5',
            label: '라디오5',
          },
          {
            value: '6',
            label: '라디오6',
          },
        ],
        value: null,
      },
      radio3: null,
      radio4: {
        list: [
          {
            value: '1',
            label: '라디오1',
          },
          {
            value: '2',
            label: '라디오2',
            disabled: true,
          },
          {
            value: '3',
            label: '라디오3',
            className: 'test-class',
          },
          {
            value: '4',
            label: '라디오4',
          },
          {
            value: '5',
            label: '라디오5',
          },
          {
            value: '6',
            label: '라디오6',
          },
        ],
        value: null,
      },
      code1:
        '<form-radio required val="test" name="radio3" v-model="radio3">\n' +
        '  가나다1\n' +
        '</form-radio>\n' +
        '<form-radio required val="test2" name="radio3" v-model="radio3">\n' +
        '  가나다2\n' +
        '</form-radio>\n' +
        '<form-radio required val="test3" name="radio3" v-model="radio3">\n' +
        '  가나다3\n' +
        '</form-radio>',
      code2:
        '<ul>\n' +
        '  <li v-for="item in radio1.list" :key="item.value">\n' +
        '    <form-radio\n' +
        '      :disabled="item.disabled"\n' +
        '      :required="radio1.required"\n' +
        '      :val="item.value"\n' +
        '      name="radio1"\n' +
        '      v-model="radio1.value"\n' +
        '      @change="customEvt($event, item.label)"\n' +
        '    >\n' +
        '      {{ item.label }}\n' +
        '    </form-radio>\n' +
        '  </li>\n' +
        '</ul>',
      code3:
        '<ul class="test-3">\n' +
        '  <li v-for="item in radio2.list" :key="item.value">\n' +
        '    <form-radio\n' +
        '      class="form-radio-btn"\n' +
        '      :disabled="item.disabled"\n' +
        '      :required="radio2.required"\n' +
        '      :val="item.value"\n' +
        '      name="radio2"\n' +
        '      v-model="radio2.value"\n' +
        '      @change="customEvt($event, item.label)"\n' +
        '    >\n' +
        '      {{ item.label }}\n' +
        '    </form-radio>\n' +
        '  </li>\n' +
        '</ul> ',
      code4:
        '<ul class="test-4">\n' +
        '  <li v-for="item in radio3.list" :key="item.value">\n' +
        '    <form-radio\n' +
        '      class="form-radio-btn"\n' +
        '      :disabled="item.disabled"\n' +
        '      :required="radio3.required"\n' +
        '      :val="item.value"\n' +
        '      name="radio3"\n' +
        '      v-model="radio3.value"\n' +
        '      @change="customEvt($event, item.label)"\n' +
        '    >\n' +
        '      {{ item.label }}\n' +
        '    </form-radio>\n' +
        '  </li>\n' +
        '</ul> ',
      data1: null,
    };
  },
  methods: {
    customEvt(event, val) {
      console.log(event, val);
    },
  },
};
</script>
<style scoped lang="scss">
.h3 {
  margin-bottom: 30px;
}
.test-3 {
  width: 640px;
  display: flex;
  & > li {
    flex-basis: 50%;
    box-sizing: border-box;
  }
}
.test-4 {
  width: 640px;
  & > li {
    box-sizing: border-box;
    & + li {
      margin-top: 10px;
    }
  }
}
</style>
