<template>
  <span
    :class="{
      'form-select': true,
      disabled: disabled,
      focused: focused || open,
      placeholder: placeholderVisible,
      error: error,
      autoWidth: autoWidth,
      sort: type === 'sort',
      border: border === 'border',
    }"
  >
    <span class="label" v-if="label">
      <transition name="label-fade">
        <span v-show="value !== ''">{{ label }}</span>
      </transition>
    </span>
    <span class="wrap">
      <template>
        <span class="value" ref="value" v-if="!input">
          {{ selectedLabel }}
        </span>
        <span class="input-value" v-else>
          <form-input
            name="selectInput"
            :value="value"
            ref="selectInput"
            :maxlength="maxlength"
            @input="$emit('formChange', $event.target.value)"
            @formChange="$emit('formChange', '')"
          />
          <button type="button" class="btn-list" @click="inputBtnChange">
            리스트
          </button>
        </span>
      </template>
      <select
        ref="select"
        :value="value"
        v-bind="$attrs"
        v-on="listeners"
        :disabled="disabled"
        :name="selectName"
      >
        <option
          v-for="(item, index) in options"
          :key="index"
          :disabled="item.disabled"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
      <p class="error-msg" v-if="error">{{ error }}</p>
    </span>

    <modal
      :name="selectName"
      type="bottom"
      :classes="['select']"
      :close="false"
    >
      <template #header v-if="title || $scopedSlots.modalHeader">
        <slot name="modalHeader">
          <h2 class="modal-title">{{ title }}</h2>
        </slot>
      </template>
      <template #content>
        <slot name="modalContent">
          <ul class="select-list">
            <li
              v-for="(item, index) in options"
              :key="index"
              :class="{ active: item.value === value, disabled: item.disabled }"
            >
              <button type="button" @click="selected(item)">
                <span
                  class="option-label"
                  v-if="html"
                  v-html="item.label"
                ></span>
                <span class="option-label" v-else>{{ item.label }}</span>
                <span class="option-label-sub" v-if="item.labelSub">
                  {{ item.labelSub }}
                </span>
              </button>
            </li>
          </ul>
        </slot>
      </template>
      <template #footer>
        <slot name="modalFooter" />
      </template>
    </modal>
  </span>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Select',
  data() {
    return {
      input: false,
      selectName: null,
      open: false,
      focused: false,
      inputValue: '',

      //isMobile: /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),
    };
  },
  mounted() {
    this.setSelectName();
  },
  inheritAttrs: false,
  props: {
    type: String,
    border: String,
    val: String,
    value: String,
    options: Array,
    disabled: Boolean,
    placeholder: String,
    label: String,
    labelSub: String,
    maxlength: Number,
    name: String,
    autoWidth: {
      type: Boolean,
      default: false,
    },
    html: Boolean,
    valueType: Boolean,
    title: String,
    error: String,
  },
  watch: {
    modalList(val) {
      this.open = val.some((el) => el.name === this.selectName);
    },
    value(val) {
      const t = this.options.every((el) => el.value !== val);
      const s = this.options.some((el) => el.input);
      const b = val === '';
      this.input = (t || b) && s;
    },
    visibility(val) {
      this.open = val;
      this.focused = val;
    },
  },
  computed: {
    ...mapState('modal', ['modalList']),
    visibility() {
      return this.modalList.some((el) => el.name === this.selectName);
    },
    placeholderVisible() {
      return (!this.value || this.value === '') && this.type !== 'sort';
    },
    selectedLabel() {
      if (this.valueType) {
        return this.value;
      } else {
        const idx = this.options.findIndex((el) => el.value === this.value);
        return this.options[idx]?.label || this.placeholder;
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        focusin: (event) => {
          this.open = true;
          this.focused = true;
          this.$_modalOpen({
            name: this.selectName,
          });
          this.$emit('focusin', event);
        },
        focusout: (event) => {
          this.open = false;
          this.focused = false;
          /*this.modalClose({
            name: this.selectName,
          });*/
          this.$emit('close', this.value);
          this.$emit('focusout', event);
        },
        keydown: (event) => {
          if (event.keyCode === 13) {
            event.preventDefault();
            this.$_modalOpen({
              name: this.selectName,
            });
            this.open = !this.open;
          }
          this.$emit('keydown', event);
        },
        mousedown: (event) => {
          event.preventDefault();
          this.$_modalOpen({
            name: this.selectName,
          });
          this.open = true;
          this.$emit('mousedown', event);
        },
        change: (event) => {
          console.log(event);
          this.$emit('formChange', event.target.value);
          this.$emit('change', event);
        },
      };
    },
  },
  methods: {
    inputFocus() {
      this.$nextTick(() => {
        // console.log(this.$refs.selectInput.$refs.input);
        // this.$refs.selectInput.$refs.input.focus();
      });
    },
    selected(el) {
      if (el.disabled) return;
      this.input = el.input;
      if (this.input) {
        this.inputFocus();
      }
      this.$emit('formChange', el.value);
      this.$emit('change');
      this.$_modalClose({
        name: this.selectName,
      });
      this.$emit('close', this.value);
      this.open = false;
      if (this.input) {
        setTimeout(() => {
          //this.$refs.selectInput.$refs.input.focus();
        }, 300);
      }
    },
    setSelectName() {
      this.selectName =
        this.name || `select-${Math.floor(Math.random() * 10000)}`;
    },
    inputBtnChange() {
      this.$refs.select.focus();
    },
  },
  model: {
    event: 'formChange',
  },
};
</script>
<style lang="scss" scoped>
.form-select {
  $selectHeight: 40px;
  display: inline-block;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;
  max-width: 100%;
  .label {
    display: block;
    height: 18px;
    span {
      display: inline-block;
      line-height: 18px;
      font-size: 13px;
      color: $gray-50;
    }
  }
  .wrap {
    min-width: 100%;
    max-width: 100%;
    position: relative;
    display: inline-block;
    select {
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      padding: 7px 25px 7px 0;
      line-height: 18px;
      letter-spacing: 0;
      font-size: 14px;
      cursor: pointer;
      appearance: none;
    }
    .value {
      position: relative;
      display: inline-block;
      padding: 7px 25px 6px 0;
      width: 100%;
      min-width: 100%;
      height: $selectHeight;
      box-sizing: border-box;
      border-radius: 0;
      border-bottom: 1px solid $gray-40;
      transition: border 0.3s ease-in;
      cursor: pointer;
      line-height: 26px;
      font-size: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: top;

      &:before {
        content: '';
        position: absolute;
        top: 10px;
        right: 0;
        width: 20px;
        height: 20px;
        background: url(#{$images}/icon-checkbox.svg) no-repeat 0 0 / 20px auto;
        cursor: pointer;
      }
    }
    .error-msg {
      margin-top: 2px;
      color: red;
      font-size: 12px;
      line-height: 18px;
      text-align: right;
    }
    /*.delete {
      z-index: 3;
      position: absolute;
      top: 0;
      right: 0;
    }*/
    .input-value {
      z-index: 3;
      position: relative;
      display: flex;
      align-items: center;
      .form-input {
        .input {
          flex: 1 1 auto;
        }
      }
      .btn-list {
        overflow: hidden;
        display: block;
        width: 16px;
        height: $selectHeight;
        flex: 0 0 16px;
        text-indent: -9999px;
        /*background: url(#{$images}/ic-down-16-bl.svg) no-repeat center / 16px
          auto;*/
        cursor: pointer;
      }
    }
  }
  &.autoWidth {
    width: auto;
  }
  &.focused {
    .value {
      border-color: $mint-50 !important;
    }
  }
  &.error {
    .value {
      border-color: red !important;
    }
  }
  &.disabled {
    color: $gray-40;
  }
  &.placeholder {
    .value {
      color: $gray-50;
    }
  }
  &.sort {
    $selectHeight: 28px;
    width: auto;
    .wrap {
      width: auto;
      min-width: auto;

      select {
        height: $selectHeight;
        padding: 9px 18px 9px 0;
        line-height: 18px;
      }
      .value {
        width: auto;
        min-width: auto;
        height: $selectHeight;
        padding: 5px 18px 5px 0;
        line-height: 18px;
        font-size: 12px;
        border: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align: top;

        &:before {
          content: '';
          position: absolute;
          top: 8px;
          right: 0;
          width: 16px;
          height: 16px;
          background: url(#{$images}/ic-16-filter.svg) no-repeat 0 0 / 12px auto;
          cursor: pointer;
        }
      }
      .input-value {
        z-index: 3;
        position: relative;
        display: flex;
        align-items: center;
        .form-input {
          .input {
            flex: 1 1 auto;
          }
        }
        .btn-list {
          overflow: hidden;
          display: block;
          width: 16px;
          height: $selectHeight;
          flex: 0 0 16px;
          text-indent: -9999px;
          /*background: url(#{$images}/ic-down-16-bl.svg) no-repeat center / 16px
            auto;*/
          cursor: pointer;
        }
      }
    }
  }
  &.border {
    .wrap {
      .value {
        height: 50px;
        border: 1px solid $gray-40;
        border-radius: 10px;
        line-height: 48px;
        padding: 0 15px;
        font-size: 14px;

        &:before {
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.select-list {
  min-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  li {
    position: relative;
    font-size: 16px;
    line-height: 24px;
    padding: 15px 0;
    box-sizing: border-box;
    button {
      width: 100%;
      text-align: left;
      color: inherit;
    }
    .option-label {
      display: block;
    }
    .option-label-sub {
      display: block;
      color: gray;
      font-size: 13px;
      line-height: 18px;
    }
    &.active {
      padding-right: 30px;
      color: $mint-60;
      font-weight: bold;
      .option-label-sub {
        color: $mint-60;
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 24px;
        height: 24px;
        background: url(#{$images}/ic-checkbox-sub-24-o.svg) no-repeat 0 0 /
          20px auto;
        transform: translateY(-50%);
      }
    }
    &.disabled {
      color: $gray-40;
    }
  }
}
</style>
