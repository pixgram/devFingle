<template>
  <page-transition>
    <div>
      <h2 class="h2">Default</h2>
      <sticky-item>
        <div style="background: red">
          스티키 첫번째<br />
          스티키 첫번째<br />
          스티키 첫번째<br />
        </div>
      </sticky-item>
      <highlightjs :code="code1" />

      <hr />

      <sticky-item>
        <div style="background: blue">
          스티키 두번째<br />
          스티키 두번째<br />
          스티키 두번째<br />
        </div>
      </sticky-item>
      <highlightjs :code="code2" />

      <hr />

      <sticky-item>
        <div style="background: pink">스티키 세번째<br /></div>
      </sticky-item>
      <highlightjs :code="code3" />

      <hr />

      <h2 class="h2">Component type</h2>
      <sticky-component />
      <highlightjs :code="code4" />

      <div style="height: 1000px"></div>
    </div>
  </page-transition>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
import PageTransition from '@/components/page-transition';
export default {
  name: 'GuideSticky',
  mixins: [guideMixin],
  components: {
    PageTransition,
    stickyComponent: () => import('@/views/guide/sticky/item.vue'),
  },
  data() {
    return {
      code1:
        '<sticky-item>\n' +
        '  <div style="background: red">\n' +
        ' 스티키 내용 입력\n' +
        '  </div>\n' +
        '</sticky-item>',
      code2:
        '<sticky-item>\n' +
        '  <div style="background: blue">\n' +
        '    스티키 두번째<br />\n' +
        '    스티키 두번째<br />\n' +
        '    스티키 두번째<br />\n' +
        '  </div>\n' +
        '</sticky-item>',
      code3:
        '<sticky-item>\n' +
        '  <div style="background: pink">스티키 세번째<br /></div>\n' +
        '</sticky-item>',
      code4: '<stickyComponent />',
    };
  },
};
</script>
<style scoped></style>
