<template>
  <ul class="post-list">
    <li v-for="(item, index) in listData" :key="index">
      <button
        type="button"
        class="post-item"
        @click="$emit('postModal', item.postCtgrCd, item.postSno)"
      >
        <span class="img">
          <img :src="item.listFile.urlPth" alt="" @error="noImage" />
        </span>
        <span class="post-info">
          <span class="flex-flag-group">
            <span v-if="item.postCtgrCd" :class="categoryType(item.postCtgrCd)">
              {{ item.postCtgr }}
            </span>
            <template v-if="item.quizInclYn">
              <span v-if="item.quizCompYn" class="flag-gray-md">
                퀴즈 완료
              </span>
              <span v-else class="flag-darkgray-md"> 퀴즈 </span>
            </template>
          </span>
          <strong class="item-title" v-html="item.ttlNm"></strong>
          <ul class="viewer">
            <li class="hit">{{ item.inqTims }}</li>
            <!--            <li class="share" v-if="sharedPost && item.postSno === sharedPost">-->
            <!--              {{ item.cmmnTims + 1 }}-->
            <!--            </li>-->
            <!--            <li class="share" v-else>{{ item.cmmnTims }}</li>-->
            <li class="share">{{ item.cmmnTims }}</li>
            <li class="bookmark">{{ item.bkmkTims }}</li>
          </ul>
        </span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'post-tab-list',
  props: {
    listData: {
      type: Array,
      required: true,
    },
    // sharedPost: {
    //   type: Number,
    //   required: false,
    // },
  },
  methods: {
    categoryType(item) {
      switch (item) {
        case 'CTS00103': // 건강
          return 'flag-orange-md';
        case 'CTS00104': // 금웅 : 보라색
          return 'flag-purple-md';
        case 'CTS00105': // 핑글팁
          return 'flag-sub-md';
        default:
          // 보험
          return 'flag-sub-md';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.post-list {
  position: relative;
  box-sizing: border-box;
  & > li {
    & + li {
      margin-top: 30px;
    }
    .post-item {
      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 56%;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>
