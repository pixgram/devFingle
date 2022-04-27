<template>
  <div>
    <h2 class="h2">Tmeplate 작성시</h2>
    <p class="dsc">
      git guide :
      <a href="https://github.com/brockpetrie/vue-moment" target="_blank">
        https://github.com/brockpetrie/vue-moment
      </a>
    </p>
    <h2 class="h2">출력</h2>
    <p>디폴트 (타입으로 'dftDate' *타입 생략 가능)</p>
    <p class="mt10" style="color: red">{{ moment(garaDate) }}</p>
    <br />
    <p>시간 노출 (타입으로 'hasTime')</p>
    <p class="mt10" style="color: red">{{ moment(garaDate, 'hasTime') }}</p>
    <br />
    <p>초까지 노출 (타입으로 'hasSec')</p>
    <p class="mt10" style="color: red">{{ moment(garaDate, 'hasSec') }}</p>

    <highlightjs :code="code1" />
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'date-format',
  mixins: [guideMixin],
  data() {
    return {
      garaDate: '2021-11-22 06:03:12',
      code1:
        ' // {{ moment(data, 타입) }}\n' +
        ' {{ moment(garaDate) }}\n' +
        " {{ moment(garaDate, 'hasTime') }}\n" +
        " {{ moment(garaDate, 'hasSec') }}",
    };
  },
};
</script>
<style scoped lang="scss">
.colors {
  display: flex;
  li {
    height: 50px;
    flex: 0 0 50px;
  }
}
</style>
