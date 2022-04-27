<template>
  <div class="no-data">
    <template v-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <template>
      <p v-if="$slots.other">
        <slot name="other"></slot>
      </p>
      <p>
        <slot name="text">데이터가 없습니다.</slot>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: ['noData'],
};
</script>

<style scoped lang="scss">
.no-data {
  padding: 80px 20px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: $gray-60;
  .point {
    color: $mint-30;
  }
  & > i {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
  }
}
.icon-none {
  background: url(../../assets/images/ic-nodata-60.svg) no-repeat center / 60px
    auto;
}
.icon-ellipsis {
  background: url(../../assets/images/ic-noanswer-60.svg) no-repeat center /
    60px auto;
}
</style>
