<template>
  <div class="sticky-wrap" ref="stickyItem">
    <div class="sticky-item">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sticky',
};
</script>
<style scoped lang="scss">
.sticky-wrap {
  //will-change: position, top, left;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
}
.sticky-item {
  > * {
    z-index: 2;
    width: 100%;
    background: $white;
  }
}
.fixed {
  .tab-wrap {
    &:before {
      opacity: 1;
    }
  }
}
</style>
