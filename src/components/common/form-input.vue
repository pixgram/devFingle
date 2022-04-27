<template>
  <span
    :class="{
      'form-input': true,
      disabled: disabled,
      focused: focused,
      lang: lang,
      placeholder: value === '',
      error: error,
      'input-search': type === 'search',
    }"
  >
    <div class="label" v-if="label">
      <transition name="label-fade">
        <span v-show="value !== ''">{{ label }}</span>
      </transition>
    </div>
    <span class="input">
      <input
        autocomplete="off"
        :type="type"
        :value="value"
        v-bind="$attrs"
        v-on="listeners"
        ref="input"
        :disabled="disabled"
        :maxlength="maxlength"
      />
      <div class="input-btn">
        <button
          class="delete"
          type="button"
          @click="clickDel"
          v-if="deleteBtn && value !== '' && !disabled"
        >
          삭제
        </button>
        <slot></slot>
      </div>
    </span>
    <p class="error-msg" v-if="error">{{ error }}</p>
  </span>
</template>
<script>
export default {
  name: 'Input',
  data() {
    return {
      focused: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lang: String,
    error: String,
    label: String,
    disabled: Boolean,
    deleteBtn: {
      type: Boolean,
      default: true,
    },
    maxlength: [Number, String],
  },
  inheritAttrs: false,
  computed: {
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
        input: (event) => {
          if (!this.lazy) {
            this.formChange(event);
          }
          if (event.target.type === 'date') {
            //console.log(event.target.value);
          }
          this.$emit('input', event);
        },
        change: (event) => {
          if (this.lazy) {
            this.formChange(event);
          }
          this.$emit('change', event);
        },
      };
    },
  },
  methods: {
    formChange(event) {
      if (event.target.maxLength !== -1) {
        event.target.value = event.target.value.slice(
          0,
          event.target.maxLength
        );
      }
      this.$emit('formChange', event.target.value);
    },
    clickDel() {
      this.$emit('formChange', '');
      this.$refs.input.focus();
    },
  },
  model: {
    prop: 'value',
    event: 'formChange',
  },
};
</script>

<style scoped lang="scss">
.form-input {
  display: inline-block;
  position: relative;
  width: 100%;
  box-sizing: border-box;
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
  .input {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid $gray-40;
    transition: border-color 0.1s ease-in;
    input {
      text-indent: 0;
      outline: none;
      flex: 1 1 auto;
      width: 100%;
      height: 39px;
      padding: 7px 25px 6px 0;
      box-sizing: border-box;
      border: 0;
      caret-color: $mint-50;
    }
    .input-btn {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      padding-right: 15px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: $mint-50;
      > * {
        margin-left: 6px;
      }
    }
    .delete {
      width: 24px;
      height: 24px;
      vertical-align: -6px;
      text-indent: -9999px;
      background: url(../../assets/images/ic-delete-24-gr.svg) center no-repeat;
    }
    .search {
      width: 24px;
      height: 24px;
      vertical-align: -6px;
      text-indent: -9999px;
      background: url(../../assets/images/ic-search-24-bk-n.svg) center
        no-repeat;
    }
    time {
      margin-left: 10px;
      vertical-align: -5px;
      padding-right: 2px;
      line-height: 24px;
    }
  }
  .error-msg {
    margin-top: 2px;
    color: red;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
  }
  &.focused {
    .input {
      border-color: #00d4ac;
    }
  }
  &.error {
    .input {
      //border-color: red;
    }
  }
  &.input-search {
    .input {
      border-radius: 10px;
      border: 1px solid $gray-40;
      overflow: hidden;
      background-color: $white;
      input {
        height: 48px;
        padding-left: 15px;
        //padding-right: 50px;
        font-size: 14px;
        background: inherit;
        &::placeholder {
        }
      }
    }
    &.focused {
      .input {
        border-color: #00d4ac;
      }
    }
  }
}
.input-round {
  margin-top: 20px;
  .label {
    span {
      display: block !important;
    }
  }

  .input {
    margin-top: 10px;
    border: 1px solid $gray-40;
    border-radius: 10px;
    padding: 12px;
    color: $black;
    box-sizing: border-box;
    input {
      height: 24px !important;
      &::placeholder {
      }
    }
    .txt {
      color: $gray-50;
      line-height: 24px;
    }
  }
  &.disabled {
    .input {
      background: $gray-20;
      color: $gray-40;
      input {
        background: transparent;
      }
    }
  }
}
</style>
