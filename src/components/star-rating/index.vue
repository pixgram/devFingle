<template>
  <span class="range-slider" :class="{ readonly, sm: size === 'sm' }">
    <drag-helper
      v-bind:readonly="readonly"
      @dragstart="dragStart"
      @drag="drag"
      @dragend="dragEnd"
    >
      <span ref="inner" class="range-slider-inner">
        <input
          class="range-slider-hidden"
          type="text"
          :name="name"
          :value="actualValue"
          :readonly="readonly"
        />
        <span class="range-slider-rail"></span>
        <span
          class="range-slider-fill"
          :style="{ width: valuePercent + '%' }"
        ></span>
        <span
          class="range-slider-knob"
          ref="knob"
          :style="{ left: valuePercent + '%' }"
        >
          <slot name="knob"></slot>
        </span>
      </span>
    </drag-helper>
  </span>
</template>

<script>
import { DragHelper, round } from './drag-helper.js';
export default {
  name: 'star-rating',
  staticRenderFns: [],
  props: {
    size: String,
    name: String,
    value: [String, Number],
    readonly: {
      type: Boolean,
      default: false,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    max: {
      type: [String, Number],
      default: 5,
    },
    step: {
      type: [String, Number],
      default: 1,
    },
  },

  data: function data() {
    return {
      actualValue: null,
      dragStartValue: null,
    };
  },
  created: function created() {
    var min = this._min,
      max = this._max;

    var defaultValue = Number(this.value);

    if (this.value == null || isNaN(defaultValue)) {
      if (min > max) {
        defaultValue = min;
      } else {
        defaultValue = (min + max) / 2;
      }
    }

    this.actualValue = this.round(defaultValue);
  },

  computed: {
    _min: function _min() {
      return Number(this.min);
    },
    _max: function _max() {
      return Number(this.max);
    },
    _step: function _step() {
      return Number(this.step);
    },
    valuePercent: function valuePercent() {
      return (
        ((this.minChange(this.actualValue) - this._min) /
          (this._max - this._min)) *
        100
      );
    },
  },

  watch: {
    value: function value(newValue) {
      var value = Number(newValue);
      if (newValue != null && !isNaN(value)) {
        this.actualValue = this.round(value);
      }
    },
    min: function min() {
      this.actualValue = this.round(this.actualValue);
    },
    max: function max() {
      this.actualValue = this.round(this.actualValue);
    },
  },

  methods: {
    dragStart: function dragStart(event, offset) {
      this.dragStartValue = this.actualValue;
      if (event.target === this.$refs.knob) {
        return;
      }
      // If the click is out of knob, move it to mouse position
      this.drag(event, offset);
    },
    drag: function drag(event, offset) {
      var offsetWidth = this.$refs.inner.offsetWidth;

      this.actualValue = this.round(
        this.valueFromBounds(offset.left, offsetWidth)
      );
      this.emitInput(this.actualValue);
    },
    dragEnd: function dragEnd(event, offset) {
      var offsetWidth = this.$refs.inner.offsetWidth;

      this.actualValue = this.round(
        this.valueFromBounds(offset.left, offsetWidth)
      );

      if (this.dragStartValue !== this.actualValue) {
        this.emitChange(this.actualValue);
      }
    },
    emitInput: function emitInput(value) {
      this.$emit('input', this.minChange(value));
    },
    emitChange: function emitChange(value) {
      this.$emit('change', this.minChange(value));
    },
    valueFromBounds: function valueFromBounds(point, width) {
      return (point / width) * (this._max - this._min) + this._min;
    },
    round: function round$$1(value) {
      return round(value, this._min, this._max, this._step);
    },
    minChange(value) {
      if (value === 0) {
        return 1;
      } else {
        return value;
      }
    },
  },

  components: {
    DragHelper: DragHelper,
  },
};
</script>

<style scoped lang="scss">
.range-slider {
  display: block;
  width: 144px;
  height: 25px;
  background: url('../../assets/images/star-drag-off.png') no-repeat 0 0/144px
    25px;
  .range-slider-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .range-slider-rail,
  .range-slider-fill {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .range-slider-rail {
    width: 100%;
  }

  .range-slider-fill {
    background: url('../../assets/images/star-drag-on.png') no-repeat 0 0/144px
      25px;
  }

  .range-slider-knob {
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    box-sizing: border-box;
    height: 100%;
    width: 20px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    opacity: 0;
  }

  .range-slider-hidden {
    display: none;
  }
  &.sm {
    width: 75px;
    height: 14px;
    //TODO 이정민 : 변경된 이미지 받으면 적용하기
    background: url('../../assets/images/ic-star-group-14-n.svg') no-repeat 0 0/75px
      14px;
    .range-slider-fill {
      background: url('../../assets/images/ic-star-group-14-o.svg') no-repeat 0
        0/75px 14px;
    }
  }
}
</style>
