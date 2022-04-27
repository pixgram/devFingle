<template>
  <div>
    <h2 class="h2">Default</h2>
    <form-input
      v-model="inputValue"
      type="tel"
      label="전화번호1"
      placeholder="전화번호"
      maxlength="11"
    />
    <highlightjs :code="code1" />

    <h2 class="h2">Button</h2>
    <form-input
      v-model="inputValue2"
      type="tel"
      label="전화번호1"
      placeholder="전화번호"
      maxlength="11"
      :deleteBtn="true"
    >
      <button type="button" class="btn-sub-sm" @click="btnEvt">인증</button>
    </form-input>
    <highlightjs :code="code2" />

    <h2 class="h2">Countdown</h2>
    <form-input
      v-model="inputValue3"
      type="tel"
      label="전화번호"
      placeholder="전화번호 입력"
      maxlength="11"
    >
      <time>2:54</time>
    </form-input>
    <highlightjs :code="code3" />

    <h2 class="h2">Password</h2>
    <form-input
      v-model="inputValue4"
      type="password"
      label="주민등록번호"
      placeholder="주민등록번호"
      maxlength="13"
    />
    <highlightjs :code="code4" />

    <h2 class="h2">Error</h2>
    <form-input
      v-model="inputValue5"
      type="text"
      label="타이틀"
      placeholder="내용 입력"
      error="에러메세지 노출됩니다."
    />
    <highlightjs :code="code5" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'guide-input',
  mixins: [guideMixin],
  data() {
    return {
      inputValue: '',
      inputValue2: '',
      inputValue3: '',
      inputValue4: '',
      inputValue5: '',
      code1:
        '<form-input\n' +
        '  v-model="inputValue"\n' +
        '  type="tel"\n' +
        '  label="전화번호1"\n' +
        '  placeholder="전화번호"\n' +
        '  maxlength="11"\n' +
        '/>',
      code2:
        '<form-input\n' +
        '  v-model="inputValue2"\n' +
        '  type="tel"\n' +
        '  label="전화번호1"\n' +
        '  placeholder="전화번호"\n' +
        '  maxlength="11"\n' +
        '  :deleteBtn="true"\n' +
        '>\n' +
        '  <button type="button" class="btn-sub-sm" @click="btnEvt">인증</button>\n' +
        '</form-input>',
      code3:
        '<form-input\n' +
        '  v-model="inputValue3"\n' +
        '  type="tel"\n' +
        '  label="전화번호"\n' +
        '  placeholder="전화번호 입력"\n' +
        '  maxlength="11"\n' +
        '>\n' +
        '  <time>2:54</time>\n' +
        '</form-input>',
      code4:
        '<form-input\n' +
        '  v-model="inputValue4"\n' +
        '  type="password"\n' +
        '  label="주민등록번호"\n' +
        '  placeholder="주민등록번호"\n' +
        '  maxlength="13"\n' +
        '/>',
      code5:
        '<form-input\n' +
        '  v-model="inputValue5"\n' +
        '  type="text"\n' +
        '  label="타이틀"\n' +
        '  placeholder="내용 입력"\n' +
        '  error="에러메세지 노출됩니다."\n' +
        '/>',
    };
  },
  methods: {
    btnEvt() {
      alert('인증');
    },
  },
};
</script>
<style scoped lang="scss">
.code {
  min-height: 220px;
}
</style>
