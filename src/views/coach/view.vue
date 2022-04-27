<template>
  <container>
    aaa<br />
    aaa<br />
    aaa<br />
    aaa<br />
    aaa<br />
    aaa<br />
    aaa<br />
    aaa<br />
    <fade-title> <strong>12</strong>12 </fade-title>
    <sticky-item>
      <tab-item :list="tab.list" type="round" :active.sync="tab.active" />
    </sticky-item>

    <button type="button" @click="$_modalOpen({ name: 'counseling_review' })">
      modal
    </button>
    <div
      style="height: 200px"
      v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
      :key="index"
    >
      <router-link to="/coach" class="btn-primary-lg">44</router-link>
      {{ index }}
    </div>

    <counselingReview name="counseling_review" />
  </container>
</template>
<script>
export default {
  name: 'coach-search-view',
  components: {
    counselingReview: () => import('@/views/coach/modal/counseling-review'),
  },
  data() {
    return {
      sliderValue: 50,

      tab: {
        active: 1,
        list: [
          {
            title: '라우터 링크 탭',
          },
          {
            title: '기본 탭',
          },
          {
            title: '기본 탭2',
          },
          {
            title: '기본 탭3',
          },
          {
            title: '기본 탭4',
          },
          {
            title: '기본 탭5',
          },
          {
            title: '기본 탭6',
          },
          {
            title: 'a link 탭',
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
