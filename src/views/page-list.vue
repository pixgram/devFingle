<template>
  <div class="page-list-wrap">
    <h1>B2C 페이지 리스트</h1>
    <ul class="page-list">
      <li>
        <div class="column menu">메뉴</div>
        <div class="column name">페이지 명</div>
        <div class="column path">path</div>
      </li>
      <li v-for="(item, index) in routesList" :key="index">
        <div class="column menu">
          <template v-if="item.pageInfo.show">
            {{ item.pageInfo.depth1 }}
          </template>
        </div>
        <div class="column name">
          {{ item.pageInfo.depth2 }}
        </div>
        <div class="column path">
          <router-link :to="item.path">
            {{ item.path }}
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import router from '@/router/index';
export default {
  name: 'page-list',
  data() {
    return {
      routesList: null,
    };
  },
  mounted() {
    this.routesList = router.options.routes.filter((el) => {
      if (el.pageInfo) {
        return el;
      }
    });

    let menuName = '';
    this.routesList.forEach((el) => {
      const menuArr = el.pageInfo.menuName.split('/');
      if (menuName !== menuArr[0]) {
        el.pageInfo.show = true;
      }
      menuName = menuArr[0];
      el.pageInfo.depth1 = menuArr[0];
      el.pageInfo.depth2 = menuArr[1];
    });
  },
};
</script>
<style scoped lang="scss">
.page-list-wrap {
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
}
h1 {
  font-size: 36px;
}
.page-list {
  margin-top: 20px;
  border: 1px solid $gray-40;
  border-width: 1px 1px 0;
  li:first-child {
    background: $gray-20;

    .column {
      &.path {
        color: $black;
      }
    }
  }
  li {
    display: flex;
    border-bottom: 1px solid $gray-40;
    .column {
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 12px;
      &.menu {
        flex: 0 0 150px;
      }
      &.name {
        flex: 0 0 200px;
      }
      &.path {
        flex: 1 1 auto;
        color: blue;
      }
    }
  }
}
</style>
