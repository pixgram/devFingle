<template>
  <div>
    <p class="dsc">inline-flex로 width는 auto입니다.</p>

    <h2 class="h2">Large</h2>
    <p class="dsc">14px / Bold</p>
    <span class="flag-primary-lg">메뉴</span>
    <span class="flag-line-lg">메뉴</span>
    <span class="flag-sub-lg">메뉴</span>
    <span class="flag-orange-lg">메뉴</span>
    <span class="flag-purple-lg">메뉴</span>
    <span class="flag-darkgray-lg">메뉴</span>
    <span class="flag-gray-lg">메뉴</span>
    <span class="flag-primary-lg disabled">비활성</span>

    <highlightjs :code="code4" />

    <h2 class="h2">Medium</h2>
    <p class="dsc">12px / Bold</p>
    <span class="flag-primary-md">메뉴</span>
    <span class="flag-line-md">메뉴</span>
    <span class="flag-sub-md">메뉴</span>
    <span class="flag-orange-md">메뉴</span>
    <span class="flag-purple-md">메뉴</span>
    <span class="flag-darkgray-md">메뉴</span>
    <span class="flag-gray-md">메뉴</span>
    <span class="flag-primary-md disabled">비활성</span>

    <highlightjs :code="code1" />

    <h2 class="h2">Small</h2>
    <p class="dsc">12px / Regular</p>
    <span class="flag-primary-sm">카테고리</span>
    <span class="flag-line-sm">카테고리</span>
    <span class="flag-sub-sm">카테고리</span>
    <span class="flag-orange-sm">카테고리</span>
    <span class="flag-purple-sm">카테고리</span>
    <span class="flag-darkgray-sm">카테고리</span>
    <span class="flag-gray-sm">카테고리</span>
    <span class="flag-primary-sm disabled">비활성</span>

    <highlightjs :code="code2" />

    <h2 class="h2">Group</h2>
    <div class="flex-flag-group">
      <span class="flag-sub-md">메뉴</span>
      <span class="flag-orange-md">메뉴</span>
    </div>

    <highlightjs :code="code3" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'flag',
  mixins: [guideMixin],
  data() {
    return {
      code1:
        '<span class="flag-primary-md">메뉴</span>\n' +
        '<span class="flag-line-md">메뉴</span>\n' +
        '<span class="flag-sub-md">메뉴</span>\n' +
        '<span class="flag-orange-md">메뉴</span>\n' +
        '<span class="flag-purple-md">메뉴</span>\n' +
        '<span class="flag-darkgray-md">메뉴</span>\n' +
        '<span class="flag-gray-md">메뉴</span>\n' +
        '<span class="flag-primary-md disabled">비활성</span>',
      code2:
        '<span class="flag-primary-sm">카테고리</span>\n' +
        '<span class="flag-line-sm">카테고리</span>\n' +
        '<span class="flag-sub-sm">카테고리</span>\n' +
        '<span class="flag-orange-sm">카테고리</span>\n' +
        '<span class="flag-purple-sm">카테고리</span>\n' +
        '<span class="flag-darkgray-sm">카테고리</span>\n' +
        '<span class="flag-gray-sm">카테고리</span>\n' +
        '<span class="flag-primary-sm disabled">비활성</span>',
      code3:
        '<div class="flex-flag-group">\n' +
        '   <span class="flag-sub-md">메뉴</span>\n' +
        '   <span class="flag-orange-md">메뉴</span>\n' +
        '</div>',
      code4:
        '<span class="flag-primary-lg">메뉴</span>\n' +
        '<span class="flag-line-lg">메뉴</span>\n' +
        '<span class="flag-sub-lg">메뉴</span>\n' +
        '<span class="flag-orange-lg">메뉴</span>\n' +
        '<span class="flag-purple-lg">메뉴</span>\n' +
        '<span class="flag-darkgray-lg">메뉴</span>\n' +
        '<span class="flag-gray-lg">메뉴</span>\n' +
        '<span class="flag-primary-lg disabled">메뉴</span>',
    };
  },
};
</script>

<style scoped></style>
