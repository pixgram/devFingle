<template>
  <div class="container">
    <app-header
      v-if="header"
      :title="title"
      :type="headerType"
      class="header"
    />
    <div class="contents">
      <slot />
    </div>
  </div>
</template>
<script>
import { layouts } from '@/utils/path';
export default {
  name: 'LayoutDefaultContainer',
  props: {
    header: {
      type: Boolean,
      default: true,
    },
    headerType: String,
    title: String,
  },
  components: {
    appHeader: layouts('app-header'),
  },
};
</script>
<style scoped lang="scss"></style>
