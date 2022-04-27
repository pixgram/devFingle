<template>
  <!--
    type: a
    텍스트만 있는 경우(일반보험)
  -->
  <button
    type="button"
    class="insure-item"
    v-if="type === '일반보험'"
    v-on="listeners"
  >
    <span class="info">
      <span class="img">
        <img :src="img" alt="" @error="noImage" />
      </span>
      <span class="tit-area">
        <span class="tit" v-html="title"></span>
        <span class="name" v-html="category"></span>
      </span>
    </span>
    <div>
      <span class="desc" v-html="desc"></span>
      <span v-if="guide" class="guide" v-html="guide"></span>
    </div>
  </button>
  <!-- /type: a -->
  <!--
    type: b
    배경이미지를 포함한 경우(자동차보험)
  -->
  <button
    type="button"
    class="insure-item type-b"
    :style="[
      img === ''
        ? {
            background:
              'url(' +
              require('@/assets/images/img-logo-fingle-gr-100.svg') +
              ') center no-repeat',
            height: '100px',
            border: '1px solid #eee',
          }
        : { 'background-image': `url(${img})` },
    ]"
    v-else
    v-on="listeners"
  >
    <!--    <span class="info">-->
    <!--      <span class="tit-area">-->
    <!--        <span class="name" v-html="category"></span>-->
    <!--      </span>-->
    <!--    </span>-->
    <!--    <span class="desc" v-html="desc"></span>-->
    <!--    <span v-if="guide" class="guide" v-html="guide"></span>-->
  </button>
  <!-- type: b -->
</template>

<script>
export default {
  name: 'insure-item.vue',
  props: {
    type: {
      type: String,
      default: '일반보험',
    },
    img: {
      type: String,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    desc: {
      type: String,
    },
    guide: {
      type: String,
    },
    insPdSno: {
      type: Number,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
      };
    },
  },
  methods: {
    linkTo() {
      // this.$emit('click', this.insPdSno);
    },
  },
};
</script>

<style scoped lang="scss">
.insure-item {
  display: block;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid $gray-30;
  border-radius: 10px;
  padding: 20px;
  text-align: left;
  .info {
    display: flex;
    align-items: center;
    .img {
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .tit-area {
      display: block;
      margin-left: 10px;
      overflow: hidden;
      .tit {
        @include ellipsis;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
      }
      .name {
        @include ellipsis;
        font-size: 12px;
        line-height: 18px;
        color: $gray-60;
      }
    }
  }
  .desc {
    @include ellipsis(2);
    margin: 15px 0 0;
    font-size: 14px;
    line-height: 20px;
  }
  .guide {
    @include ellipsis();
    margin: 10px 0 0;
    font-size: 12px;
    line-height: 18px;
    color: $gray-60;
  }

  &.type-b {
    background-color: #00d4ac;
    padding: 20px 25px;
    border: none;

    .tit-area {
      width: 100%;
      margin-left: 0;

      .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .desc {
      display: -webkit-box;
      font-size: 16px;
      line-height: 24px;
      margin-top: 5px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .info,
    .desc,
    .guide {
      width: calc(100% - 104px);
    }
  }
}
</style>
