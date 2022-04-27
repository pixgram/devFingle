<template>
  <div id="container">
    <button
      type="button"
      :class="{ 'menu-trigger': true, active: menuOpen }"
      @click="menuToggle"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <aside :class="{ active: menuOpen }">
      <h1 class="guide-logo">Front-End</h1>
      <guide-aside />
    </aside>
    <section id="contents">
      <h1 class="title-guide">{{ $route.meta.name }}</h1>
      <router-view />
    </section>
  </div>
</template>
<script>
import guideAside from '@/views/guide/layout/guide-aside';
import '@/views/guide/layout/guide.scss';

export default {
  name: 'guide-root',
  components: { guideAside },
  data() {
    return {
      menuOpen: false,
    };
  },
  watch: {
    '$route.path'() {
      this.menuOpen = false;
    },
  },
  methods: {
    menuToggle() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  flex-basis: 100%;
  padding-left: 160px;
  box-sizing: border-box;
  //display: flex;
}
.guide-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  font-size: 21px;
  font-weight: 600;
  text-align: center;
  line-height: 1.5;
  font-family: 'SpoqaHanSansNeo', sans-serif;
  /*color: #06b6d4;*/
  color: #fff;
  background-color: #1b2330;
  letter-spacing: 1px;
}
aside {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 50;
  width: 160px;
  overflow: auto;
  //flex: 0 0 160px;
  background-color: #252f3e;
  box-sizing: border-box;
  text-align: left;
  transition: transform 0.2s ease-in;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 10px 12px 2px rgba(0, 0, 0, 0.14);

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: $gray-40;
  }
}

.menu-trigger {
  position: fixed;
  top: 20px;
  left: 30px;
  width: 20px;
  height: 14px;
  transition: all 0.4s;
  box-sizing: border-box;
  transform: translateX(-40px);
  span {
    position: absolute;
    left: 0;
    display: inline-block;
    transition: all 0.4s ease-in;
    box-sizing: border-box;
    width: 100%;
    height: 2px;
    background-color: #000;
    border-radius: 2px;
    &:nth-of-type(1) {
      top: 0;
    }
    &:nth-of-type(2) {
      top: 6px;
    }
    &:nth-of-type(3) {
      bottom: 0;
    }
  }
  &.active {
    transform: rotate(360deg);
    span:first-child {
      transform: translateY(6px) rotate(-45deg);
    }
    span:nth-of-type(2) {
      transform: translateY(0) rotate(45deg);
    }
    span:nth-of-type(3) {
      opacity: 0;
    }
  }
}

#contents {
  padding: 50px 20px 30px;
  box-sizing: border-box;
  flex: 0 0 calc(100% - 160px);
  background: #fff;
}

@media screen and(max-width: 900px) {
  #container {
    padding-left: 0;
    display: flex;
    flex-direction: column;
  }

  /*aside {
    position: static;
    flex: 0 0 auto;
    width: auto;
  }*/
  aside {
    transform: translateX(-100%);
    &.active {
      transform: translateX(0);
    }
  }
  .menu-trigger {
    display: inline-block;
    transform: translateX(0);
    &.active {
      left: 180px;
    }
  }
}
</style>
