<template>
  <div>
    <h2 class="h2">Readonly</h2>
    <star-rating v-model="star" readonly />
    <highlightjs language="javascript" :code="javascript1" />
    <highlightjs :code="code1" />

    <h2 class="h2">Drag</h2>
    <star-rating v-model="star2" />
    <highlightjs :code="code2" />

    <h2 class="h2">Readonly Size SM</h2>
    <star-rating v-model="star3" readonly size="sm" />
    <highlightjs :code="code3" />

    <h2 class="h2">Drag Size SM</h2>

    <star-rating v-model="star4" size="sm" />
    <highlightjs :code="code4" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
import starRating from '@/components/star-rating';
export default {
  name: 'guide-star',
  mixins: [guideMixin],
  components: {
    starRating,
  },
  data() {
    return {
      star: 1,
      star2: 1,
      star3: 3,
      star4: 4,
      code1: '<star-rating v-model="star" readonly />',
      code2: '<star-rating v-model="star2" />',
      code3: '<star-rating v-model="star3" readonly size="sm" />',
      code4: '<star-rating v-model="star4" size="sm" />',
      javascript1:
        '' +
        'data() {\n' +
        '    return {\n' +
        '      star: 1,\n' +
        '   }\n' +
        ' }',
    };
  },
};
</script>
<style scoped></style>
