<template>
  <portal to="modal" tag="div" :name="name">
    <transition @enter="modalEnter" @leave="modalLeave" :name="name">
      <div
        :class="classList"
        v-if="visibility"
        :key="visibility"
        :style="{ zIndex: order }"
      >
        <div class="modal" ref="modal" :data-name="name">
          <div
            class="close-drag"
            ref="drag"
            title="닫기"
            v-if="type === 'bottom'"
          />
          <div class="modal-header" v-if="$scopedSlots.header">
            <slot name="header" />
          </div>
          <div class="modal-content" v-if="$scopedSlots.content">
            <slot name="content" />
          </div>
          <div class="modal-footer" v-if="$scopedSlots.footer">
            <slot name="footer" />
          </div>
          <button
            type="button"
            class="modal-close"
            v-if="closeBtn || (type === 'full' && !dontClose)"
            @click="closeEvent"
          >
            닫기
          </button>
        </div>
        <div
          class="dim"
          ref="dim"
          @click="closeEvent"
          v-show="type !== 'full'"
        />
      </div>
    </transition>
  </portal>
</template>
<script>
import { Cubic, gsap } from 'gsap/all';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { mapState } from 'vuex';

export default {
  name: 'Modal',
  inheritAttrs: false,
  data() {
    return {
      dragData: {
        active: false,
        currentY: null,
        initialY: null,
        yOffset: 0,
      },
      //isMobile: /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),
    };
  },
  props: {
    name: String,
    type: {
      type: String,
      default: 'default',
      require: true,
      validator: function (value) {
        return ['default', 'full', 'bottom'].indexOf(value) !== -1;
      },
    },
    classes: Array,
    closeBtn: {
      type: Boolean,
      default: false,
    },
    dontClose: Boolean,
  },
  watch: {
    visibility(open) {
      if (!open) {
        this.$emit('close');
        setTimeout(() => {
          this.$emit('closeEnd');
        }, this.modalSpeed * 1000);
      } else {
        this.$nextTick(() => {
          this.$emit('open');
          setTimeout(() => {
            this.$emit('openEnd');
          }, this.modalSpeed * 1000);
        });
      }
      setTimeout(() => {
        if (this.type === 'bottom') {
          if (open) {
            window.addEventListener('touchstart', this.dragStart, {
              passive: false,
            });
            window.addEventListener('touchend', this.dragEnd, {
              passive: false,
            });
            window.addEventListener('touchmove', this.drag, { passive: false });
            window.addEventListener('mousedown', this.dragStart, {
              passive: false,
            });
            window.addEventListener('mouseup', this.dragEnd, {
              passive: false,
            });
            window.addEventListener('mousemove', this.drag, { passive: false });
          } else {
            window.removeEventListener('touchstart', this.dragStart, false);
            window.removeEventListener('touchend', this.dragEnd, false);
            window.removeEventListener('touchmove', this.drag, false);
            window.removeEventListener('mousedown', this.dragStart, false);
            window.removeEventListener('mouseup', this.dragEnd, false);
            window.removeEventListener('mousemove', this.drag, false);
          }
        }
      }, 1);
    },
  },
  computed: {
    ...mapState('modal', ['modalList', 'modalSpeed']),
    classList() {
      return [...(this.classes || ''), this.type || 'default', 'modal-item'];
    },
    visibility() {
      return this.modalList.some((el) => el.name === this.name);
    },
    order() {
      return 9999 + this.modalIndex;
    },
    modalIndex() {
      return this.modalList.findIndex((el) => el.name === this.name);
    },
  },
  methods: {
    closeEvent() {
      if (this.dontClose) return;
      this.$_modalClose({ name: this.name });
    },
    dragStart(e) {
      if (e.target !== this.$refs.drag) return;
      if (e.type === 'touchstart') {
        this.dragData.initialY = e.touches[0].clientY - this.dragData.yOffset;
      } else {
        this.dragData.initialY = e.clientY - this.dragData.yOffset;
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.dragData.active = true;
    },
    dragEnd(e) {
      if (!this.dragData.active) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.dragData.initialY = this.dragData.currentY;
      this.dragData.active = false;
      if (
        this.$refs.modal.clientHeight / 2 > this.dragData.currentY ||
        this.dontClose
      ) {
        const style = window.getComputedStyle(this.$refs.modal);
        // eslint-disable-next-line
        const matrix = new WebKitCSSMatrix(style.webkitTransform);
        gsap.fromTo(
          this.$refs.modal,
          this.modalSpeed,
          {
            y: `${(matrix.m42 / this.$refs.modal.clientHeight) * 100}%`,
          },
          {
            y: '0%',
            ease: Cubic.easeInOut,
            onComplete: () => {
              this.dragData = {
                active: false,
                currentY: null,
                initialY: null,
                yOffset: 0,
              };
            },
          }
        );
      } else {
        this.$_modalClose({ name: this.name });
      }
    },
    drag(e) {
      if (this.dragData.active) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.type === 'touchmove') {
          this.dragData.currentY =
            e.touches[0].clientY - this.dragData.initialY;
        } else {
          this.dragData.currentY = e.clientY - this.dragData.initialY;
        }
        this.dragData.currentY = Math.max(this.dragData.currentY, 0);
        this.dragData.yOffset = this.dragData.currentY;
        this.setTranslate(this.dragData.currentY);
      }
    },
    setTranslate(yPos) {
      this.$refs.modal.style.transform = `translate(0px, ${
        (yPos / this.$refs.modal.clientHeight) * 100
      }%)`;
    },
    modalEnter(el, done) {
      if (this.name === 'alert') {
        el.classList.add('alert');
      }
      disableBodyScroll(el.querySelector('.modal-content'));
      if (this.type === 'full') {
        document.querySelector('#wrap').style.opacity = '0';
      }
      //console.log(el.querySelector('[data-autofocus]'));
      /*if (!el.querySelector('[data-autofocus]')) {
        document.activeElement.blur();
      } else {
        el.querySelector('[data-autofocus]').focus();
        document.querySelector('#fakeInput')?.remove();
      }*/

      if (this.type === 'bottom') {
        gsap.from(this.$refs.modal, {
          duration: this.modalSpeed,
          y: '100%',
          ease: Cubic.easeInOut,
        });
      } else {
        gsap.from(this.$refs.modal, {
          duration: this.modalSpeed,
          opacity: 0,
          ease: Cubic.easeInOut,
        });
      }
      gsap.from(this.$refs.dim, {
        duration: this.modalSpeed,
        opacity: 0,
        ease: Cubic.easeInOut,
        onComplete: () => {
          done();
        },
      });
    },
    modalLeave(el, done) {
      enableBodyScroll(el.querySelector('.modal-content'));
      if (this.type === 'full') {
        document.querySelector('#wrap').style.opacity = '1';
      }
      if (this.type === 'bottom') {
        const style = window.getComputedStyle(this.$refs.modal);
        // eslint-disable-next-line
        const matrix = new WebKitCSSMatrix(style.webkitTransform);
        gsap.fromTo(
          this.$refs.modal,
          {
            y: `${(matrix.m42 / this.$refs.modal.clientHeight) * 100}%`,
          },
          {
            duration: this.modalSpeed,
            y: `100%`,
            ease: Cubic.easeInOut,
            onComplete: () => {
              this.dragData = {
                active: false,
                currentY: null,
                initialY: null,
                yOffset: 0,
              };
            },
          }
        );
      } else {
        gsap.to(this.$refs.modal, {
          duration: this.modalSpeed,
          opacity: 0,
          ease: Cubic.easeInOut,
        });
      }
      gsap.to(this.$refs.dim, {
        duration: this.modalSpeed,
        opacity: 0,
        ease: Cubic.easeInOut,
        onComplete: () => {
          done();
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.modal-item {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .modal {
    will-change: transform;
    z-index: 300;
    position: absolute;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    background-color: $white;
    .modal-header {
      flex: 0 0 auto;
      padding: 0 20px;
    }
    .modal-content {
      flex: 1 1 auto;
      padding: 0 20px;
      font-size: 14px;
      line-height: 20px;
      max-height: calc(100vh - 200px);
      overflow: auto;
      color: #000;
    }
    .modal-footer {
      flex: 0 0 auto;
      box-sizing: border-box;
      ::v-deep .flex-btn-txt-group {
        justify-content: flex-end;
        padding: 17px 20px 19px;
      }
      ::v-deep .flex-btn-group {
        padding: 20px;
      }
    }
    ::v-deep .modal-close {
      z-index: 10;
      position: absolute;
      top: 11px;
      right: 15px;
      width: 34px;
      height: 34px;
      padding: 0;
      overflow: hidden;
      text-indent: -9999px;
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -12px 0 0 -12px;
        width: 24px;
        height: 24px;
        background: url('../../assets/images/ic-close-24-bk-n.svg') no-repeat;
      }
    }
    .close-drag {
      height: 30px;
      text-align: center;
      &:after {
        content: '';
        display: inline-block;
        width: 40px;
        height: 4px;
        border-radius: 2px;
        background-color: $gray-20;
      }
    }
  }
  .dim {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 290;
    background-color: rgba(0, 0, 0, 0.4);
  }
  &.default {
    .modal {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 40px);
      padding-top: 30px;
      border-radius: 20px;
      .modal-header {
        margin-bottom: 20px;
        ::v-deep .modal-title {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
        }
      }
      .modal-content {
        font-size: 14px;
        line-height: 20px;
        color: #000;
        ::v-deep > *:first-child {
          margin-top: 0;
        }
      }
    }
  }
  &.bottom {
    .modal {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: calc(100% - 86px);
      border-radius: 20px 20px 0 0;
    }
    .modal-header {
      padding: 10px 20px 20px;
      ::v-deep .modal-title {
        font-size: 18px;
        line-height: 26px;
        font-weight: bold;
      }
    }
    .modal-content {
    }
  }
  &.select {
    .modal {
      padding-bottom: calc($safeBottom + 20px);
    }
  }
  &.info {
    .modal {
      padding-bottom: calc($safeBottom + 50px);
    }
  }
  &.full {
    .modal {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: none;
      transform: translate(0, 0);
    }
    .modal-header {
      height: 56px;
      padding: 15px 60px 15px 20px;
      box-sizing: border-box;
      ::v-deep .modal-title {
        font-size: 18px;
        font-weight: bold;
        line-height: 26px;
      }
    }
    .modal-content {
      max-height: none;
      overflow-x: hidden;
      padding-bottom: 40px;
    }
    .modal-footer {
    }
  }
  &.alert {
    z-index: 1000000 !important;
  }
  &.image-gallery {
    background-color: $gray-70;
    .modal-content {
      padding: 0 !important;
    }
  }
  ::v-deep .btm-btn-group {
    width: 100%;
    transform: none;
  }
}
</style>
