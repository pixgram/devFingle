<template>
  <label
    class="interest"
    :class="{ white: color === 'white', 'like-check': typeof num === 'number' }"
  >
    <input
      type="checkbox"
      class="interest-check"
      :checked="checked"
      v-on="listeners"
    />
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!--    <svg
      class="heart-svg"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      y="10"
    >-->
      <g fill="none" fill-rule="evenodd">
        <path
          class="heart"
          d="M11.566 2.25c.94.005 1.88.362 2.6 1.071a3.587 3.587 0 0 1 1.084 2.542 3.492 3.492 0 0 1-1.05 2.52l-3.884 3.822c-.14.137-.288.26-.444.366L8.84 13.585a1.245 1.245 0 0 1-1.652.09L1.799 8.382A3.492 3.492 0 0 1 .75 5.862a3.587 3.587 0 0 1 1.084-2.54 3.727 3.727 0 0 1 2.502-1.07 3.642 3.642 0 0 1 2.524.894l1.144 1.109.984-.968a3.632 3.632 0 0 1 2.578-1.037z"
          stroke="#888"
          stroke-width="1.5"
          fill="#FFF"
          fill-rule="evenodd"
        />
        <!--        <path
          class="heart"
          d="M39.2021069,22.7461102 C41.58069,25.0561854 41.6018804,28.7809772 39.2494372,31.0656655 L30.050145,40 L30,39.95 L29.949855,40 L20.7505628,31.0656655 C18.3981195,28.7809772 18.41931,25.0561854 20.797893,22.7461102 C23.1764761,20.436035 27.0117307,20.4154548 29.364174,22.7001432 L29.364174,22.7001432 L30,23.317 L30.635826,22.7001432 C32.9882692,20.4154548 36.8235239,20.436035 39.2021069,22.7461102 Z"
          stroke="#ddd"
          stroke-width="1.5"
          stroke-linejoin="round"
        />-->
        <circle
          class="main-circ"
          fill="#00d4ac"
          opacity="0"
          cx="30"
          cy="30"
          r="1.5"
        />

        <g class="grp7" opacity="0" transform="translate(7 6)">
          <circle class="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
          <circle class="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
        </g>

        <g class="grp6" opacity="0" transform="translate(0 28)">
          <circle class="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
          <circle class="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
        </g>

        <g class="grp3" opacity="0" transform="translate(52 28)">
          <circle class="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
          <circle class="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
        </g>

        <g class="grp2" opacity="0" transform="translate(44 6)">
          <circle class="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
          <circle class="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
        </g>

        <g class="grp5" opacity="0" transform="translate(14 50)">
          <circle class="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
          <circle class="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
        </g>

        <g class="grp4" opacity="0" transform="translate(36 51)">
          <circle class="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
          <circle class="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
        </g>

        <g class="grp1" opacity="0" transform="translate(24)">
          <circle class="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
          <circle class="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
        </g>
      </g>
    </svg>
    <template v-if="num || num === 0">
      <span v-if="num > 999" class="num">999 +</span>
      <span v-else class="num">픽{{ num }}</span>
    </template>
  </label>
</template>

<script>
export default {
  name: 'heart',
  props: {
    color: String,
    checked: {
      type: [Boolean, Array],
      required: true,
    },
    num: Number,
    msg: String,
  },
  computed: {
    checkedType() {
      return typeof this.checked === 'boolean';
    },
    listeners() {
      return {
        ...this.$listeners,
        focusin: (event) => {
          this.focused = true;
          this.$emit('focusin', event);
        },
        focusout: (event) => {
          this.focused = false;
          this.$emit('focusout', event);
        },
        change: (event) => {
          this.numPlus();
          if (!this.checked && this.msg) {
            this.toast(this.msg);
          }
          if (this.checkedType) {
            this.$emit('formChange', event.target.checked);
            this.$emit('change', event);
          } else {
            const idx = this.checked.indexOf(this.val);
            let tmp = [...this.checked];
            if (idx !== -1) {
              tmp.splice(idx, 1);
            } else {
              tmp.push(this.val);
            }
            //console.log(tmp);
            this.$emit('formChange', tmp);
            this.$emit('change', event);
          }
        },
      };
    },
  },
  model: {
    prop: 'checked',
    event: 'formChange',
  },
  methods: {
    numPlus() {
      let num = this.num;
      if (!this.checked) {
        num = num + 1;
      } else {
        num = num - 1;
      }
      this.$emit('update:num', num);
    },
  },
};
</script>

<style scoped lang="scss">
.interest {
  position: relative;
  display: inline-block;
  width: 30px;
  -webkit-tap-highlight-color: transparent;
  input[type='checkbox'] {
    width: 30px;
    height: 30px;
    margin: 0;
    opacity: 0;
  }
  &.white {
    .heart-svg {
      .heart {
        stroke: $white;
      }
    }
    input[type='checkbox']:checked + svg {
      .heart {
        fill: $white;
      }
      .main-circ {
        fill: $white;
      }
    }
    .num {
      color: $white;
    }
  }
  &.like-check {
    display: inline-flex;
    align-items: center;
    width: auto;
    .interest-check {
      position: absolute;
      left: 0;
      top: 0;
      flex: 0 0 auto;
    }
    .num {
      margin-left: 5px;
      font-size: 14px;
      text-align: center;
      font-weight: 400;
    }
  }
}

.heart-svg {
  position: absolute;
  left: -15px;
  top: -15px;
  transform: scale(1);
  cursor: pointer;
  overflow: visible;
  width: 60px;
  .heart {
    transform: scale(0.2);
    transform-origin: 50% 50%;
    animation: animateHeartOut 0.3s linear forwards;
  }
  .main-circ {
    transform-origin: 50% 50%;
  }
}

input[type='checkbox']:checked + svg {
  .heart {
    //transform: scale(0.2);
    fill: #f53b32;
    stroke: none;
    //animation: animateHeart 0.3s linear forwards 0.25s;
  }
  .main-circ {
    transition: all 2s;
    //animation: animateCircle 0.3s linear forwards;
    opacity: 1;
  }
  .grp1 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(0, -30px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(10px, -50px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp2 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(30px, -15px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(60px, -15px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp3 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(30px, 0px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(60px, 10px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp4 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(30px, 15px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(40px, 50px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp5 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(-10px, 20px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(-60px, 30px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp6 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(-30px, 0px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(-60px, -5px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp7 {
    opacity: 1;
    transition: 0.1s all 0.3s;
    .oval1 {
      transform: scale(0) translate(-30px, -15px);
      transform-origin: 0 0 0;
      transition: 0.5s transform 0.3s;
    }
    .oval2 {
      transform: scale(0) translate(-55px, -30px);
      transform-origin: 0 0 0;
      transition: 1.5s transform 0.3s;
    }
  }
  .grp2 {
    opacity: 1;
    transition: 0.1s opacity 0.3s;
  }
  .grp3 {
    opacity: 1;
    transition: 0.1s opacity 0.3s;
  }
  .grp4 {
    opacity: 1;
    transition: 0.1s opacity 0.3s;
  }
  .grp5 {
    opacity: 1;
    transition: 0.1s opacity 0.3s;
  }
  .grp6 {
    opacity: 1;
    transition: 0.1s opacity 0.3s;
  }
  .grp7 {
    opacity: 1;
    transition: 0.1s opacity 0.3s;
  }
}

@keyframes animateCircle {
  40% {
    transform: scale(10);
    opacity: 1;
    fill: $mint-60;
  }
  55% {
    transform: scale(11);
    opacity: 1;
    fill: $mint-50;
  }
  65% {
    transform: scale(12);
    opacity: 1;
    fill: $mint-50;
  }
  75% {
    transform: scale(13);
    opacity: 1;
    fill: transparent;
    stroke: $mint-40;
    stroke-width: 0.5;
  }
  85% {
    transform: scale(17);
    opacity: 1;
    fill: transparent;
    stroke: $mint-40;
    stroke-width: 0.2;
  }
  95% {
    transform: scale(18);
    opacity: 1;
    fill: transparent;
    stroke: $mint-30;
    stroke-width: 0.1;
  }
  100% {
    transform: scale(19);
    opacity: 1;
    fill: transparent;
    stroke: $mint-30;
    stroke-width: 0;
  }
}

@keyframes animateHeart {
  0% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes animateHeartOut {
  0% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
