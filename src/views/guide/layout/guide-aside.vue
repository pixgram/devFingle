<template>
  <ul class="menu-list">
    <li :key="index" v-for="(item, index) in test">
      <router-link
        v-if="!item.newWindow"
        :to="item.path"
        :disabled="!item.disabled"
        :event="!item.disabled ? 'click' : ''"
        :class="{ disabled: item.disabled }"
      >
        {{ item.name }}
      </router-link>
      <a
        v-else
        :href="item.path"
        :disabled="!item.disabled"
        :event="!item.disabled ? 'click' : ''"
        :class="{ disabled: item.disabled }"
        target="_blank"
      >
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'guide-aside',
  data() {
    return {
      test: [
        { name: 'Accordion', path: '/guide/accordion' },
        { name: 'Alert', path: '/guide/alert' },
        { name: 'Button', path: '/guide/button' },
        { name: 'Checkbox', path: '/guide/form-checkbox' },
        { name: 'Color', path: '/guide/color' },
        { name: 'Coach', path: '/guide/coach' },
        { name: 'Font', path: '/guide/font' },
        { name: 'FileUpload', path: '/guide/form-file-list' },
        { name: 'Flag', path: '/guide/flag' },
        { name: 'Grid', path: '/guide/grid', newWindow: true },
        { name: 'Heart', path: '/guide/heart' },
        { name: 'Hr', path: '/guide/hr' },
        { name: 'Image', path: '/guide/image', disabled: true },
        { name: 'infinity-loading', path: '/guide/infinity-loading' },
        { name: 'Input', path: '/guide/form-input' },
        { name: 'List Type', path: '/guide/list', disabled: true },
        { name: 'Loading', path: '/guide/Loading' },
        { name: 'Lottie', path: '/guide/lottie' },
        { name: 'Modal', path: '/guide/modal' },
        { name: 'Modal-List', path: '/guide/modal-list' },
        { name: 'Moment', path: '/guide/moment' },
        { name: 'No data', path: '/guide/no-data' },
        { name: 'Radio', path: '/guide/form-radio' },
        { name: 'Review', path: '/guide/review' },
        { name: 'Search', path: '/guide/form-search' },
        { name: 'Select', path: '/guide/form-select' },
        { name: 'Star', path: '/guide/star' },
        { name: 'Sticky', path: '/guide/sticky' },
        { name: 'Tab', path: '/guide/tab' },
        { name: 'Table', path: '/guide/table' },
        { name: 'Textarea', path: '/guide/textarea' },
        { name: 'Thumb', path: '/guide/thumb' },
        { name: 'Toast', path: '/guide/toast' },
        { name: 'Tree', path: '/guide/tree' },
        { name: 'Vuex', path: '/guide/vuex', disabled: true },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.menu-list {
  /*display: flex;
  flex-direction: column;
  flex-wrap: wrap;*/
  padding: 10px;
  li {
  }
}

a {
  position: relative;
  display: block;
  padding: 10px 23px;
  color: #bec1c5;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;
  letter-spacing: 0;
  &.disabled {
    opacity: 0.25;
  }
}

a.router-link-active {
  color: #fff;
  font-weight: 700;
  background-color: #3b4452;
  border-radius: 5px;
}

a:before {
  content: '';
  position: absolute;
  left: 10px;
  top: 11px;
  margin-top: 7px;
  width: 4px;
  height: 4px;
  border: 1px solid #8997bd;
  border-radius: 50%;
  background: rgba(48, 62, 103, 0.2);
  box-sizing: border-box;
}

a.router-link-active:before {
  background: #7680ff;
  border-color: #7680ff;
}

li + li {
}
@media screen and (max-width: 900px) {
}
</style>
