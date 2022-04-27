/*!
 * vue-range-slider v0.6.0
 * https://github.com/ktsn/vue-range-slider
 *
 * @license
 * Copyright (c) 2016-2018 katashin
 * Released under the MIT license
 * https://github.com/ktsn/vue-range-slider/blob/master/LICENSE
 */
'use strict';

var DocumentEventHelper = {
  created: function created() {
    if (typeof document === 'undefined') return;
    forEachListener(this, function (key, listener) {
      on(document, key, listener);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof document === 'undefined') return;
    forEachListener(this, function (key, listener) {
      off(document, key, listener);
    });
  },
};

var isBrowser = typeof window !== 'undefined';

var hasPassive =
  isBrowser &&
  (function () {
    var supported = false;

    try {
      var desc = {
        get: function get() {
          supported = true;
        },
      };
      var opts = Object.defineProperty({}, 'passive', desc);

      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {
      supported = false;
    }

    return supported;
  })();

function forEachListener(vm, f) {
  var events = vm.$options.events;
  Object.keys(events).forEach(function (key) {
    f(key, function (event) {
      return events[key].call(vm, event);
    });
  });
}

function on(el, name, fn) {
  var options = hasPassive ? { passive: false } : undefined;
  el.addEventListener(name, fn, options);
}

function off(el, name, fn) {
  var options = hasPassive ? { passive: false } : undefined;
  el.removeEventListener(name, fn, options);
}

function relativeMouseOffset(offset, base) {
  var bounds = base.getBoundingClientRect();
  return {
    left: offset.clientX - bounds.left,
    top: offset.clientY - bounds.top,
  };
}

function round(value, min, max, step) {
  if (value <= min) {
    return min;
  }

  var roundedMax = Math.floor((max - min) / step) * step + min;
  if (value >= roundedMax) {
    return roundedMax;
  }

  var normalize = (value - min) / step;
  var decimal = Math.floor(normalize);
  var fraction = normalize - decimal;

  if (fraction === 0) return value;

  return step * decimal + min;
  /* if (fraction < 0.5) {
    return step * decimal + min;
  } else {
    return step * (decimal + 1) + min;
  }*/
}

var DragHelper = {
  mixins: [DocumentEventHelper],

  props: {
    readonly: Boolean,
  },

  data: function data() {
    return {
      isDrag: false,
    };
  },

  events: {
    mousedown: function mousedown(event) {
      return this.dragStart(event, this.offsetByMouse);
    },
    mousemove: function mousemove(event) {
      return this.dragMove(event, this.offsetByMouse);
    },
    mouseup: function mouseup(event) {
      return this.dragEnd(event, this.offsetByMouse);
    },
    touchstart: function touchstart(event) {
      return this.dragStart(event, this.offsetByTouch);
    },
    touchmove: function touchmove(event) {
      return this.dragMove(event, this.offsetByTouch);
    },
    touchend: function touchend(event) {
      return this.dragEnd(event, this.offsetByTouch);
    },
    touchcancel: function touchcancel(event) {
      return this.dragEnd(event, this.offsetByTouch);
    },
  },

  methods: {
    isInTarget: function isInTarget(el) {
      if (!el) return false;

      if (el === this.$el) {
        return true;
      } else {
        return this.isInTarget(el.parentElement);
      }
    },
    offsetByMouse: function offsetByMouse(event) {
      return relativeMouseOffset(event, this.$el);
    },
    offsetByTouch: function offsetByTouch(event) {
      var touch =
        event.touches.length === 0 ? event.changedTouches[0] : event.touches[0];
      return relativeMouseOffset(touch, this.$el);
    },
    dragStart: function dragStart(event, f) {
      if (
        this.readonly ||
        (event.button !== undefined && event.button !== 0) ||
        !this.isInTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();
      this.isDrag = true;
      this.$emit('dragstart', event, f(event), this.$el);
    },
    dragMove: function dragMove(event, f) {
      if (!this.isDrag) return;
      event.preventDefault();
      this.$emit('drag', event, f(event), this.$el);
    },
    dragEnd: function dragEnd(event, f) {
      if (!this.isDrag) return;
      event.preventDefault();
      this.isDrag = false;
      this.$emit('dragend', event, f(event), this.$el);
    },
  },

  render: function render() {
    return this.$slots.default && this.$slots.default[0];
  },
};

export { DragHelper, round };
//module.exports = DragHelper;
