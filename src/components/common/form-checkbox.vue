<template>
  <label
    v-if="checkedType"
    :class="{
      'form-checkbox': true,
      disabled: disabled,
      checked: checked,
      focused: focused,
      'form-checkbox-sub': subType,
    }"
  >
    <input
      ref="checkbox"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="listeners"
    />

    <template v-if="subType">
      <i class="icon-checkbox-sub"></i>
    </template>
    <template v-else>
      <!-- 체크박스 on -->
      <i class="icon-checkbox"></i>
    </template>

    <slot></slot>
  </label>
  <label
    v-else
    :class="{
      'form-checkbox': true,
      disabled: disabled,
      checked: checked.some((el) => el === val),
      focused: focused,
      'form-checkbox-sub': subType,
    }"
  >
    <input
      ref="checkbox"
      type="checkbox"
      :checked="checked.some((el) => el === val)"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="listeners"
    />

    <template v-if="subType">
      <i class="icon-checkbox-sub"></i>
    </template>
    <template v-else>
      <i class="icon-checkbox"></i>
    </template>

    <slot></slot>
  </label>
</template>
<script>
export default {
  name: 'Checkbox',
  data() {
    return {
      focused: false,
    };
  },
  props: {
    checked: {
      type: [Boolean, Array],
      required: true,
    },
    disabled: Boolean,
    subType: Boolean,
    val: String,
  },
  inheritAttrs: false,
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
};
</script>
<style scoped lang="scss">
.form-checkbox {
  position: relative;
  display: inline-block;
  padding: 5px 0 5px 30px;
  align-items: center;
  cursor: pointer;
  input {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    /*visibility: hidden;*/
  }
  [class^='icon-checkbox'] {
    position: absolute;
    top: 4px;
    left: 0;
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
  .icon-checkbox {
    height: 20px;
    width: 20px;
    background: url(../../assets/images/ic-checkbox-main-20-n.svg) no-repeat 0 0 /
      20px auto;
    box-sizing: border-box;
  }
  .icon-checkbox-sub {
    background: yellow;
  }
  span {
  }
  fieldset:disabled &,
  &.disabled {
    cursor: default;
    color: $gray-50;
    /*svg {
      background: $gray-30;
      border-radius: 50%;
    }*/
    .icon-checkbox {
      background: $gray-30;
    }
    span {
    }
  }
  &.checked {
    .icon-checkbox {
      background: url(../../assets/images/ic-checkbox-main-20-o.svg) no-repeat 0
        0 / 20px auto;
    }
    span {
    }
    &.disabled {
    }
  }
  &.focused {
    /*color: $mint;*/
  }
  &.depth-2 {
    /*top: 10px;*/
  }
}
.form-checkbox-sub {
  font-size: 14px;
  line-height: 20px;
  .icon-checkbox-sub {
    border: none;
    background: url(../../assets/images/ic-checkbox-sub-20-n.svg) no-repeat 0 0/20px
      auto;
  }
  &.checked {
    .icon-checkbox-sub {
      background: url(../../assets/images/ic-checkbox-sub-20-o.svg) no-repeat 0
        0/20px auto;
    }
  }
}
.no-accordion {
  svg {
    top: 13px;
  }
}
</style>
