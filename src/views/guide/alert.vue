<template>
  <div>
    <h2 class="h2">Default</h2>
    <button
      type="button"
      class="btn-primary-md"
      @click="$_alert('alert\nalert\nalert\nalert\nalert')"
    >
      Alert
    </button>
    <highlightjs :code="code0" />
    <hr />
    <h2 class="h2">Callback</h2>
    <button type="button" class="btn-primary-md" @click="alertFn">Alert</button>
    <highlightjs :code="code1_1" />
    <br /><br />
    <button type="button" class="btn-primary-md" @click="confirmFn">
      Confirm
    </button>
    <highlightjs :code="code2_1" />
    <highlightjs :code="code2_2" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'alert',
  mixins: [guideMixin],
  data() {
    return {
      code0:
        '<button\n' +
        '  type="button"\n' +
        '  class="btn-primary-md"\n' +
        '  @click="$_alert(\'alert\\nalert\\nalert\\nalert\\nalert\')"\n' +
        '>\n' +
        '  Alert\n' +
        '</button>',

      code1_1:
        '<button type="button" class="btn-primary-md" @click="alertFn">Alert</button>',
      code1_2:
        'async alertFn() {\n' +
        '  await this.$_alert("alert\\nalert\\nalert\\nalert\\nalert");\n' +
        '  console.log("확인1");\n' +
        '},',
      code2_1:
        '<button type="button" class="btn-primary-md" @click="confirmFn">\n' +
        '  Confirm\n' +
        '</button>',
      code2_2:
        'async confirmFn() {\n' +
        '  const cfm = await this.$_confirm(\n' +
        '    "confirm\\nconfirm\\nconfirm\\nconfirm\\nconfirm"\n' +
        '  );\n' +
        '  if (cfm) {\n' +
        '    console.log("확인2");\n' +
        '  } else {\n' +
        '    console.log("취소3");\n' +
        '  }\n' +
        '},',
    };
  },
  methods: {
    async alertFn() {
      await this.$_alert('alert\nalert\nalert\nalert\nalert');
      console.log('확인');
    },
    async confirmFn() {
      const cfm = await this.$_confirm(
        'confirm\nconfirm\nconfirm\nconfirm\nconfirm'
      );
      if (cfm) {
        console.log('확인');
      } else {
        console.log('취소');
      }
    },
  },
};
</script>
