<template>
  <div>
    <h2 class="h2">Blind</h2>
    <span class="blind">텍스트 숨김</span>
    <highlightjs :code="code1" />
    <h2 class="h2">Heading</h2>
    <h2 class="title-1">안녕하세요. 32pt 입니다.</h2>
    <h3 class="title-2">안녕하세요. 24pt 입니다.</h3>
    <h3 class="title-2-rgl">안녕하세요. <strong>24pt</strong> 입니다.</h3>
    <h4 class="title-3">안녕하세요. 20pt 입니다.</h4>
    <highlightjs :code="code9" />
    <h2 class="h2">Title</h2>
    <strong class="sub-title">font 16 Title</strong>
    <strong class="sub-title"
      >font 16 Title <span class="opt-text">(선택)</span></strong
    >
    <highlightjs :code="code6" />
    <strong class="item-title">font 14 Title</strong>
    <highlightjs :code="code7" />
    <h2 class="h2">단일 텍스트</h2>
    <p class="desc-text">텍스트 설명 입니다</p>
    <highlightjs :code="code8" />
    <h2 class="h2">Bullet</h2>
    <ul class="bullet-list">
      <li class="bullet-text">안내사항입니다.<br />안내사항입니다.</li>
      <li class="bullet-text">안내사항입니다.</li>
    </ul>
    <highlightjs :code="code2" />
    <h2 class="h2">Bullet SM</h2>
    <ul class="bullet-list-sm">
      <li class="bullet-text">안내사항입니다.<br /></li>
      <li class="bullet-text">안내사항입니다.</li>
    </ul>
    <highlightjs :code="code3" />
    <h2 class="h2">Bullet Title Case</h2>
    <strong class="item-title">타이틀</strong>
    <ul class="bullet-list">
      <li class="bullet-text">안내사항입니다.<br /></li>
      <li class="bullet-text">안내사항입니다.</li>
    </ul>
    <highlightjs :code="code4" />
    <h2 class="h2">Bullet SM Title Case</h2>
    <strong class="item-title">타이틀</strong>
    <ul class="bullet-list-sm">
      <li class="bullet-text">안내사항입니다.<br /></li>
      <li class="bullet-text">안내사항입니다.</li>
    </ul>
    <highlightjs :code="code5" />

    <h2 class="h2">Gray Box Bullet SM Title Case</h2>
    <div class="box-list">
      <strong class="item-title">타이틀</strong>
      <ul class="bullet-list-sm">
        <li class="bullet-text">안내사항입니다.<br /></li>
        <li class="bullet-text">안내사항입니다.</li>
        <li class="bullet-text mint-60">안내사항입니다.</li>
      </ul>
    </div>
    <highlightjs :code="code6" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'font',
  mixins: [guideMixin],
  data() {
    return {
      code1: '<span class="blind">텍스트 숨김</span>',
      code2:
        '' +
        '<ul class="bullet-list">\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.<br>안내사항입니다.\n' +
        '  </li>\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.\n' +
        '  </li>\n' +
        '</ul>',
      code3:
        '' +
        '<ul class="bullet-list-sm">\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.<br>\n' +
        '  </li>\n' +
        '   <li class="bullet-text">\n' +
        '     안내사항입니다.\n' +
        '  </li>\n' +
        '</ul>',
      code4:
        '' +
        '<strong class="item-title">타이틀</strong>\n' +
        '<ul class="bullet-list">\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.<br>\n' +
        '  </li>\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.\n' +
        '  </li>\n' +
        '</ul>',
      code5:
        '' +
        '<strong class="item-title">타이틀</strong>\n' +
        '<ul class="bullet-list-sm">\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.<br>\n' +
        '  </li>\n' +
        '  <li class="bullet-text">\n' +
        '    안내사항입니다.\n' +
        '  </li>\n' +
        '</ul>',
      code6:
        '<div class="box-list">\n' +
        '    <strong class="item-title">타이틀</strong>\n' +
        '    <ul class="bullet-list-sm">\n' +
        '      <li class="bullet-text">안내사항입니다.<br /></li>\n' +
        '      <li class="bullet-text">안내사항입니다.</li>\n' +
        '      <li class="bullet-text mint-60">안내사항입니다.</li>\n' +
        '   </ul>\n' +
        '</div>\n',
      code7:
        '<strong class="sub-title">타이틀</strong>\n' +
        '<strong class="sub-title">타이틀<span class="opt-text">(선택)</span></strong>',
      code8: '<strong class="item-title">타이틀</strong>',
      code9: '<p class="desc-text">텍스트 설명 입니.</p>',
      code10:
        '<h2 class="title-1">안녕하세요. 32pt 입니다.</h2>\n' +
        '<h3 class="title-2">안녕하세요. 24pt 입니다.</h3>\n' +
        '<h4 class="title-3">안녕하세요. 20pt 입니다.</h4>',
    };
  },
};
</script>
<style scoped></style>
다
