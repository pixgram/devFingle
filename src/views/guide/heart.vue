<template>
  <div>
    <h2 class="h2">Default</h2>
    <heart v-model="like" />
    <highlightjs :code="code1" />

    <h2 class="h2">White</h2>
    <div class="bg-black">
      <heart color="white" v-model="like2" />
    </div>
    <highlightjs :code="code2" />
    <h2 class="h2">Count</h2>
    <div class="bg-black">
      <heart color="white" v-model="like3" :num.sync="num" />
    </div>
    <highlightjs :code="code3" />
    <h2 class="h2">Count</h2>
    <div class="bg-black">
      <heart
        color="white"
        v-model="like4"
        :num.sync="num2"
        msg="나의 찜 목록에 저장했습니다."
      />
    </div>
    <highlightjs :code="code4" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
import heart from '@/components/heart.vue';
export default {
  name: 'color',
  mixins: [guideMixin],
  components: { heart },
  data() {
    return {
      like: false,
      like2: false,
      like3: false,
      like4: false,
      num: 123,
      num2: 10000,
      code1: '<heart v-model="like"/>',
      code2: '<heart color="white" v-model="like"/>',
      code3: '<heart color="white" v-model="like" :num.sync="num"/>',
      code4:
        '<heart color="white" v-model="like" :num.sync="num"   msg="나의 찜 목록에 저장했습니다."/>',
    };
  },
};
</script>
<style scoped lang="scss">
.bg-black {
  padding: 15px;
  background-color: #00d4ac;
}
</style>
