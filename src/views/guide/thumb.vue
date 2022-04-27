<template>
  <div>
    <h2 class="h2">Default</h2>
    <div class="thumb" style="height: 100px">
      <img src="" alt="" class="ttt" @error="noImage" />
    </div>
    <highlightjs :code="code1" />
    <h2 class="h2">X FULL</h2>
    <div class="event-box">
      <div class="thumb">
        <img src="http://placehold.it/320x320" alt="" @error="noImage" />
      </div>
    </div>
    <br />
    <div class="event-box">
      <div class="thumb">
        <img src="http://placehold.it/1000x500" alt="" @error="noImage" />
      </div>
    </div>
    <br />
    <div class="event-box">
      <div class="thumb">
        <img src="" alt="" @error="noImage" />
      </div>
    </div>
    <highlightjs :code="code2" />
    <h2 class="h2">1:1</h2>
    <div class="profile-box">
      <div class="thumb">
        <img src="" alt="" @error="noImage" />
      </div>
    </div>
    <highlightjs :code="code3" />
    <h2 class="h2">1:1 small</h2>
    <div class="profile-box sm">
      <div class="thumb">
        <img src="" alt="" @error="noImage" />
      </div>
    </div>
    <highlightjs :code="code4" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'thumb',
  mixins: [guideMixin],
  data() {
    return {
      code1:
        '<div class="thumb">\n' +
        '   <img src="" alt="" @error="noImage" />\n' +
        '</div>',
      code2:
        '<div class="event-box">\n' +
        '  <div class="thumb">\n' +
        '    <img src="" alt="" @error="noImage" />\n' +
        '  </div>\n' +
        '</div>',
      code3:
        '<div class="profile-box">\n' +
        '  <div class="thumb">\n' +
        '    <img src="" alt="" @error="noImage" />\n' +
        '  </div>\n' +
        '</div>',
      code4:
        '<div class="profile-box sm">\n' +
        '  <div class="thumb">\n' +
        '    <img src="" alt="" @error="noImage" />\n' +
        '  </div>\n' +
        '</div>',
    };
  },
};
</script>
<style scoped lang="scss">
.event-box {
  .thumb {
    position: relative;
    padding-top: 50%;
    img {
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .no-images {
      object-fit: none;
    }
  }
}

.profile-box {
  .thumb {
    width: 100px;
    height: 100px;
  }
  &.sm {
    .thumb {
      width: 45px;
      height: 45px;
    }
  }
}
</style>
