<template>
  <ul class="tree">
    <li class="tree-item" v-for="(item, index) in tree" :key="index">
      <div @click="toggle(index)">
        {{ item.name }} {{ item.open }}
        <span v-if="item.children">[{{ item.open ? '-' : '+' }}]</span>
      </div>
      <template v-if="item.children && item.open">
        <!-- 재귀 컴포넌트 호출 -->
        <treeItem :treeData="item.children"></treeItem>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TreeItem',
  props: ['treeData'],
  data() {
    return {
      tree: [],
    };
  },
  created() {
    this.tree = this.treeData.map((el) => {
      return {
        ...el,
        open: false,
      };
    });
  },
  methods: {
    toggle(idx) {
      console.log(this.tree[idx].open);
      //현재 선택한 인덱스를 open 값을 현재의 반대 값을 넣는다.
      //true면 false, false면 true
      this.tree[idx].open = !this.tree[idx].open;
    },
  },
};
</script>

<style scoped lang="scss">
li {
  cursor: pointer;
  li {
    padding-left: 15px;
  }
}
.tree-item {
}
</style>
