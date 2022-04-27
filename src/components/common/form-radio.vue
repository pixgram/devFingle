<template>
  <label
    :class="{
      'form-radio': true,
      disabled: this.disabled,
      checked: this.checked,
      focused: this.focused,
    }"
  >
    <input
      ref="radio"
      type="radio"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :value="val"
      v-bind="$attrs"
      v-on="listeners"
    />
    <i></i>
    <span>
      <slot></slot>
    </span>
  </label>
</template>
<script>
export default {
  name: 'Radio',
  data() {
    return {
      focused: false,
    };
  },
  inheritAttrs: false,
  computed: {
    checked() {
      return this.val === this.value;
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
          this.$emit('formChange', this.val);
          this.$emit('change', event);
        },
      };
    },
  },
  model: {
    event: 'formChange',
  },
  props: {
    value: String,
    val: String,
    name: String,
    disabled: Boolean,
  },
};
</script>
<style lang="scss" scoped>
label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  input {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }

  i {
    height: 20px;
    width: 20px;
    background: url(../../assets/images/ic-radio-20-n.svg) no-repeat 0 0 / 20px
      auto;
    box-sizing: border-box;
  }
  span {
  }
  &.form-radio-btn {
    position: relative;
    display: flex;
    height: 50px;
    padding: 15px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    border: solid 1px $gray-30;
    justify-content: flex-start;
    i {
      display: none;
    }
    span {
      font-size: 14px;
      font-weight: 500;
      color: $black;
      white-space: nowrap;
    }
    &.checked {
      border-color: $mint-50;
      span {
        font-weight: 700;
        color: $mint-60;
      }
    }
  }
}

label.checked {
  i {
    border: none;
    background: url(../../assets/images/ic-radio-20-o.svg) no-repeat 0 0 / 20px
      auto;
  }
  span {
    font-weight: bold;
  }
}

label.focused {
  i {
  }
}

label.disabled {
  i {
    border-radius: 50%;
    border-color: $gray-40;
    background: $gray-40;
  }
  span {
    color: $gray-40;
  }
}
</style>
