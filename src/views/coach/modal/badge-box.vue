<template>
  <modal name="badgeBox" @open="openCallback" @closeEnd="closeEndCallback">
    <template #header>
      <h2 class="modal-title">
        뱃지 현황
        <span class="flag-primary-sm">총 {{ badgeList.length }}개</span>
      </h2>
    </template>
    <template #content>
      <p class="title-4">핑글 정책에 따라 부여된 뱃지</p>
      <div class="box">
        <ul class="badge-list">
          <li
            class="badge-item"
            v-for="(item, index) in badgeList"
            :key="index"
          >
            <div class="icon-badge">
              <img :src="item.badgImgPth" :alt="item.badgNm" />
            </div>
            <strong class="name">{{ item.badgNm }}</strong>
            <!-- TODO 이정민 : api 추가되면 반영필요 -->
            <div class="txt">api 대기중</div>
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="flex-btn-group">
        <button
          type="button"
          class="btn-line-gray-md"
          @click="$_modalClose({ name: 'badgeBox' })"
        >
          확인
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'badge-box',
  props: ['badgeList'],
  data() {
    return {};
  },
  mounted() {
    //console.log('뱃지리스트', this.badgeList);
  },
  methods: {
    openCallback() {
      console.log('openCallback');
      console.log('뱃지리스트', this.badgeList);
    },
    closeEndCallback() {
      console.log('closeEndCallback');
    },
  },
};
</script>

<style scoped lang="scss">
.flag-primary-sm {
  margin-left: 5px;
  vertical-align: 1px;
}
.title-4 {
  color: #888;
}
.box {
  margin-top: 20px;
  padding: 20px 30px;
  background-color: #f7f7f7;
  border-radius: 20px;
}
.badge-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -20px;
}
.badge-item {
  width: 100px;
  box-sizing: border-box;
  text-align: center;
  margin-left: 20px;
  /*&:nth-child(odd) {
    margin-left: 20px;
  }*/
  .name {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    line-height: 20px;
  }
  .txt {
    margin-top: 2px;
    font-size: 12px;
    line-height: 18px;
    color: #888;
  }
  .icon-badge {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #fff;
  }
}
</style>
