<template>
  <modal :name="name" :type="type">
    <template #content>
      <div>
        <h2>{{ titleName }}</h2>
        <ul class="item-list">
          <li
            v-for="(item, key) in list"
            :key="key"
            :class="{ active: active === item.id || active === item.anchor }"
          >
            <button type="button" @click="itemClick(item.id)">
              <span v-html="item.title" />
            </button>
          </li>
        </ul>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: 'tab-item-list',
  props: ['name', 'type', 'titleName', 'list', 'active'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    itemClick(id) {
      this.$emit('update', id);
      this.$_modalClose({ name: this.name });
    },
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin-top: 66px;
  font-size: 24px;
  line-height: 30px;
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  li {
    position: relative;
    margin: 15px 5px 0 0;
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: -53px;
      width: 53px;
      top: 0;
      height: 1px;
    }
  }
  button {
    display: block;
    padding: 8px 15px 7px;
    border-radius: 18px;
    border: 1px solid $gray-30;
    font-size: 13px;
    line-height: 18px;
    color: gray;
    background: transparent;
    white-space: nowrap;
  }
  .active {
    button {
      color: $white;
      background: $mint-50;
      font-weight: bold;
      border: none;
    }
  }
}
</style>
