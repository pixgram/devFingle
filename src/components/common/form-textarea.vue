<template>
  <span
    :class="{
      'form-textarea': true,
      disabled: disabled,
      focused: focused,
      placeholder: value === '',
      error: error,
    }"
  >
    <span class="textarea">
      <textarea
        ref="textarea"
        :disabled="disabled"
        :placeholder="placeholder"
        v-on="listeners"
        :maxlength="maxlength"
        :value="value"
      />
      <!--   @input="fn_TextAreaInputLimit($event)"   -->
      <span class="count" v-if="maxlength">
        <!--        <em>{{ count }}</em>-->
        <em>{{ value.length }}</em>
        <em class="max">
          / <em>{{ maxlength }}</em></em
        >
      </span>
    </span>
    <p class="error-msg" v-if="error">{{ error }}</p>
  </span>
</template>
<script>
export default {
  name: 'Textarea',
  data() {
    return {
      count: 0,
      focused: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: String,
    error: String,
    label: String,
    disabled: Boolean,
    maxlength: [Number, String],
    //maxlength2: this.value.length === this.maxlength,
  },
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
          if (this.maxlength) {
            this.count = event.target.value.length;
            if (!this.lazy) {
              this.formChange(event);
            }
            this.$emit('input', event);

            let tempChar = '';
            let countChar = 0;
            let maxSize = this.maxlength;

            for (let i = 0; i < event.target.value.length; i++) {
              tempChar = event.target.value.charAt(i);

              // 한글일 경우 2 추가, 영문일 경우 1 추가
              if (escape(tempChar).length > 4) {
                countChar += 2;
              } else {
                countChar++;
              }
            }

            if (countChar > maxSize) {
              console.log(countChar, maxSize);
              event.target.value = this.value;
              event.preventDefault();
            } else {
              this.count = event.target.value.length;
              if (!this.lazy) {
                this.formChange(event);
              }
              this.$emit('input', event);
            }
          }
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
  },
  model: {
    prop: 'value',
    event: 'formChange',
  },
};
</script>
<style scoped lang="scss">
.form-textarea {
  display: block;
  margin-top: 10px;
}
.textarea {
  position: relative;
  display: block;
  padding: 15px 15px 33px;
  border-radius: 10px;
  box-sizing: border-box;
  border: solid 1px $gray-40;
  font-size: 14px;
  textarea {
    width: 100%;
    height: 133px;
    padding: 0;
    border: none;
    outline: none;
    resize: none;
    font-size: 14px;
    line-height: 20px;
    color: $gray-70;
    font-family: 'SpoqaHanSansNeo', sans-serif;
    &::placeholder {
      color: $gray-50 !important;
    }
  }
  .count {
    position: absolute;
    right: 15px;
    bottom: 15px;
    margin-top: 5px;
    text-align: right;
    font-size: 12px;
    color: $gray-70;
    .max {
      color: $gray-50;
    }
  }
}
.focused {
  .textarea {
    border-color: $mint-50;
  }
}
.error {
  .textarea {
    //border-color: red;
  }
}
.error-msg {
  color: $error;
  line-height: 18px;
  text-align: right;
  margin-top: 2px;
  font-size: 12px;
  letter-spacing: -0.5px;
}
</style>
