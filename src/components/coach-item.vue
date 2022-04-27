<template>
  <li class="coach-item">
    <router-link :to="`/coach-detail/?seq=${coachData.cchSno}`">
      <div class="info">
        <div class="thumb">
          <img
            v-if="coachData.profImgFile"
            :src="coachData.profImgFile.urlPth"
            :alt="coachData.cchNm"
            @error="noImage"
          />
        </div>
        <strong class="name">
          {{ coachData.cchNm }}{{ coachData.cchDvNm }}
          <!-- <i class="icon-new-16" v-if="coachData.newestFlag">신규</i>-->
        </strong>
        <ul class="consult-info">
          <li
            :class="{
              'consult-item': true,
              chat: true,
              active: coachData.chtgUseYn,
            }"
          >
            채팅상담
          </li>
          <li
            :class="{
              'consult-item': true,
              call: true,
              active: coachData.telCnslUseYn,
            }"
          >
            전화상담
          </li>
          <li
            :class="{
              'consult-item': true,
              meet: true,
              active: coachData.cfntCnslUseYn,
            }"
          >
            대면상담
          </li>
          <li
            :class="{
              'consult-item': true,
              video: true,
              active: coachData.vdeoUseYn,
            }"
          >
            화상상담
          </li>
        </ul>
      </div>
      <ul class="category-list" v-if="categoryList.length > 0">
        <li
          class="flag-gray-sm"
          v-for="(item, index) in categoryList"
          :key="index"
        >
          {{ item.cchCtgrNm }}
        </li>
      </ul>
    </router-link>
  </li>
</template>

<script>
/*import heart from '@/components/heart.vue';*/
export default {
  name: 'coach-item',
  /*  components: { heart },*/
  props: ['coachData'],
  data() {
    return {
      like: false,
      categoryList: [],
    };
  },
  mounted() {
    //console.log(this.coachData.categoryList);
    if (this.coachData.categoryList.length === 0) {
      this.categoryList = [];
    } else if (this.coachData.categoryList.length > 5) {
      this.categoryList = this.coachData.categoryList.slice(0, 5);
    } else {
      this.categoryList = this.coachData.categoryList;
    }
  },
};
</script>

<style scoped lang="scss">
.coach-item {
  position: relative;
  border-top: 1px solid $gray-30;
  &:last-child {
    border-bottom: 1px solid $gray-30;
  }
  a {
    display: block;
    padding: 20px;
    min-height: 176px;
    box-sizing: border-box;
  }
  .thumb {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }
  .info {
    height: 70px;
    padding-left: 90px;
    overflow: hidden;
    .name {
      display: block;
      margin-top: 8px;
      font-size: 18px;
      line-height: 26px;
      font-weight: bold;
    }
  }
  .category-list {
    height: 58px;
    overflow: hidden;
    margin-top: 8px;
    margin-left: -7px;
    align-items: center;
    li {
      display: inline-block;
      margin-top: 7px;
      margin-left: 7px;
    }
  }
}
.consult-info {
  display: flex;
  margin-top: 5px;
  .consult-item {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    vertical-align: -2px;
    background: no-repeat 0 0 / 16px auto;
    text-indent: -9999px;
    &.chat {
      background-image: url('../assets/images/ic-chatting-16-gr-n.svg');
      &.active {
        background-image: url('../assets/images/ic-chatting-16-o.svg');
      }
    }
    &.call {
      background-image: url('../assets/images/ic-telephone-16-gr-n.svg');
      &.active {
        background-image: url('../assets/images/ic-telephone-16-o.svg');
      }
    }
    &.video {
      background-image: url('../assets/images/ic-video-16-gr-n.svg');
      &.active {
        background-image: url('../assets/images/ic-video-16-o.svg');
      }
    }
    &.meet {
      background-image: url('../assets/images/ic-meet-16-gr-n.svg');
      &.active {
        background-image: url('../assets/images/ic-meet-16-o.svg');
      }
    }
  }
}
</style>
