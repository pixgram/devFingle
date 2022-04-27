<template>
  <div>
    <form-file-list v-model="form.files" :maxImgLength="3" />
    <!--  @update="updateFiles"  -->
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'guide-file',
  mixins: [guideMixin],
  data() {
    return {
      form: {
        files: [],
      },
    };
  },
  methods: {
    /*updateFiles(data) {
      this.form.files = [];
      for (let i = 0; i < data.length; i++) {
        this.form.files.push(data[i].file);
      }
    },*/
  },
};
</script>

<style scoped></style>
