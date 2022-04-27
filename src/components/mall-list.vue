<template>
  <li>
    <router-link to="/">
      <p class="desc" v-html="item.ttlNm"></p>
      <span class="thumb"><img :src="item.listImgPth" alt="" /></span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'mall-list',
  props: ['item'],
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
a {
  display: flex;
}

.desc {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin: auto 0;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 20px;
  text-align: left;
  flex: 1;
}

.thumb {
  margin-left: 20px;
  display: block;
  border-radius: 10px;
  width: 80px;
  height: 80px;
  background: black; // Todo :이미지 들어오면 background 색 뺴기
}
.thumb img {
  width: 100%;
}
</style>
