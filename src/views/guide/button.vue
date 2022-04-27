<template>
  <div>
    <p class="dsc">
      class로 스타일이 적용되며 Button의 태그는 고정이 아닌 상황에 맞게 사용하면
      됩니다. 예) &lt;button&gt;, &lt;a&gt;
    </p>
    <h2 class="h2">Size</h2>
    <button type="button" class="btn-primary-lg">Large</button>
    <button type="button" class="btn-primary-md">Medium</button>
    <button type="button" class="btn-primary-sm">Small</button>

    <highlightjs :code="code1" />

    <h2 class="h2">State</h2>
    <h3 class="h3">Disabled</h3>
    <button type="button" class="btn-primary-lg" disabled>Button</button>
    <a type="button" class="btn-primary-lg disabled">Button</a>
    <button type="button" class="btn-primary-md" disabled>Medium</button>
    <button type="button" class="btn-primary-sm" disabled>Small</button>
    <highlightjs :code="code2" />

    <h2 class="h2">Columns</h2>
    <h3 class="h3">1단</h3>
    <div class="flex-btn-group">
      <button type="button" class="btn-primary-lg">Button</button>
    </div>
    <highlightjs :code="code3" />

    <h3 class="h3">2단</h3>
    <div class="flex-btn-group">
      <button type="button" class="btn-primary-lg">Button</button>
      <button type="button" class="btn-primary-lg">Button</button>
    </div>
    <highlightjs :code="code4" />

    <h2 class="h2">Style</h2>
    <button type="button" class="btn-primary-lg">primary</button>
    <button type="button" class="btn-line-primary-lg">line-primary</button>
    <button type="button" class="btn-line-gray-lg">line-gray</button>
    <button type="button" class="btn-sub-lg">sub</button>
    <highlightjs :code="code5" />

    <h2 class="h2">Floating bottom</h2>
    <div class="test-bg">
      <div class="btm-btn-group">
        <div class="flex-btn-group">
          <button type="button" class="btn-primary-lg">primary</button>
        </div>
      </div>
    </div>
    <highlightjs :code="code6" />
    <hr />
    <h2 class="h2">Button Text</h2>
    <button type="button" class="btn-txt-primary">Button</button>
    <button type="button" class="btn-txt">Button</button>
    <highlightjs :code="code7" />
    <hr />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'button',
  mixins: [guideMixin],
  data() {
    return {
      code1:
        '<button type="button" class="btn-primary-lg">Large</button>\n' +
        '<button type="button" class="btn-primary-md">Medium</button>\n' +
        '<button type="button" class="btn-primary-sm">Small</button>\n' +
        '\n' +
        '<a href="#" class="btn-primary-lg">Large</a>\n' +
        '<a href="#" class="btn-primary-md">Medium</a>\n' +
        '<a href="#" class="btn-primary-sm">Small</a>',
      code2:
        '<button type="button" class="btn-primary-lg" disabled>Button</button> //속성으로 작성\n' +
        '<a type="button" class="btn-primary-lg disabled">Button</a> //클래스로 작성',
      code3:
        '<div class="flex-btn-group">\n' +
        '  <button type="button" class="btn-primary-lg">Button</button>\n' +
        '</div>',
      code4:
        '<div class="flex-btn-group">\n' +
        '   <button type="button" class="btn-primary-lg">Button</button>\n' +
        '  <button type="button" class="btn-primary-lg">Button</button>\n' +
        '</div>',
      code5:
        '<button type="button" class="btn-primary-lg">primary</button>\n' +
        '<button type="button" class="btn-line-primary-lg">line-primary</button>\n' +
        '<button type="button" class="btn-line-gray-lg">line-gray</button>',
      code6:
        '<div class="btm-btn-group">\n' +
        '  <div class="flex-btn-group">\n' +
        '    <button type="button" class="btn-primary-lg">primary</button>\n' +
        '  </div>\n' +
        '</div>',
      code7:
        '' +
        '<button type="button" class="btn-txt-primary">Button</button>\n' +
        '<button type="button" class="btn-txt">Button</button>',
    };
  },
};
</script>
<style scoped lang="scss">
[class^='btn'] + [class^='btn'] {
  margin-left: 10px;
}
.flex-btn-group {
  max-width: 360px;
}
.test-bg {
  max-width: 360px;
  background-color: #ccc;
}
.btm-btn-group {
  .flex-btn-group {
    left: 190px;
  }
}
</style>
