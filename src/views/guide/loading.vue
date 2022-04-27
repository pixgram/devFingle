<template>
  <div>
    <h2 class="h2">event</h2>
    <button @click="loading" class="btn-primary-sm">loading click</button>

    <highlightjs :code="code" />
    <h2 class="h2">script</h2>
    <highlightjs :code="code2" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'loading',
  mixins: [guideMixin],
  data() {
    return {
      code: '<button @click="loading" class="btn-primary-sm">loading click</button>',
      code2: 'this.loading(true);\n' + 'this.loading(false)',
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
