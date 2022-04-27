<template>
  <tiny-editor :api-key="apiKey" :init="initConfig" />
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
  name: 'editor',
  components: {
    tinyEditor: Editor,
  },
  data() {
    return {
      apiKey: 'no-api-key',
      initConfig: {
        height: this.$props.height,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help',
      },
    };
  },
  props: {
    height: Number,
  },
};
</script>

<style scoped></style>
