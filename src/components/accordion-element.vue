<template>
  <ul v-if="list" class="accordion-list">
    <li
      class="accordion-item"
      v-for="(item, key) in list"
      :key="key"
      :class="{ on: activeArray.some((el) => el === key) }"
    >
      <button class="accordion-title" @click="openCont(key)">
        <slot name="title" :item="item"></slot>
      </button>
      <transition @enter="accordionEnter" @leave="accordionLeave">
        <div class="accordion-body" v-if="activeArray.some((el) => key === el)">
          <div class="cont">
            <slot name="cont" :item="item"></slot>
          </div>
        </div>
      </transition>
    </li>
  </ul>
  <div class="accordion-item" v-else>
    <button class="accordion-title" @click="openCont()">
      <slot name="title"></slot>
    </button>
    <transition @enter="accordionEnter" @leave="accordionLeave">
      <div class="accordion-body" v-if="activeItem">
        <div class="cont">
          <slot name="cont"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { Cubic, gsap } from 'gsap/all';

export default {
  name: 'Accordion',
  props: ['list', 'auto', 'show'],
  data() {
    return {
      initOpen: false,
      activeArray: [],
      activeItem: false,
      accordionSpeed: 0.3,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.show || this.show === 0) {
        this.initOpen = true;
        this.openCont(this.show);
      }
    });
  },
  methods: {
    openCont(index) {
      if (this.auto) {
        if (this.activeArray.some((el) => el === index)) {
          this.activeArray = [];
        } else {
          this.activeArray = [];
          this.activeArray.push(index);
        }
      } else if (index === undefined) {
        this.activeItem = !this.activeItem;
      } else if (index === true) {
        this.activeItem = true;
      } else {
        const findIndex = this.activeArray.findIndex((el) => el === index);
        if (findIndex !== -1) {
          this.activeArray.splice(findIndex, 1);
        } else {
          this.activeArray.push(index);
        }
      }
    },
    accordionEnter(el, done) {
      if (!this.initOpen) {
        gsap.fromTo(
          el,
          {
            height: 0,
            opacity: 0,
            ease: Cubic.easeInOut,
          },
          {
            height: 'auto',
            opacity: 1,
            duration: this.accordionSpeed,
            ease: Cubic.easeInOut,
            onComplete: () => {
              if (done) {
                done();
              }
            },
          }
        );
      }
      this.initOpen = false;
    },
    accordionLeave(el, done) {
      gsap.fromTo(
        el,
        {
          ease: Cubic.easeInOut,
        },
        {
          height: 0,
          opacity: 0,
          duration: this.accordionSpeed,
          ease: Cubic.easeInOut,
          onComplete: () => {
            if (done) {
              done();
            }
          },
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
/*.accordion-list {
  margin-top: 30px;
}
div.accordion-item {
  margin-top: 30px;
}
.accordion-item {
  background: $gray-30;
  & + li {
    border-top: 1px solid $gray-70;
  }
}
.accordion-title {
  padding: 20px;
}
.accordion-body {
  overflow: hidden;
  .cont {
    border-top: 1px solid #333;
    padding: 20px;
  }
}*/
</style>
