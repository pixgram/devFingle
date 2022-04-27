<script>
import formCheckbox from './form-checkbox';
export default {
  name: 'CheckboxAll',
  extends: formCheckbox,
  props: {
    checkboxList: Array,
    checkedArray: Array,
  },
  watch: {
    checkedArray() {
      this.$emit(
        'formChange',
        this.checkboxList.length === this.checkedArray.length
      );
    },
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
          this.$emit(
            'update:checkedArray',
            event.target.checked ? this.checkboxList : []
          );
          this.$emit('formChange', event.target.checked);
          this.$emit('change', event);
        },
      };
    },
  },
};
</script>
