<template>
  <container>
    <div class="event-view">
      <!--  <span class="img">
        <img :src="viewData.img" alt="" @error="noImage" />
      </span>-->
      <div v-if="viewData.htmlCtt" v-html="viewData.htmlCtt" />
    </div>
  </container>
</template>
<script>
import { getEventView } from '@/api/modules/cs';

export default {
  name: 'event-view',
  data() {
    return {
      viewData: {
        delYn: false,
        endYn: false,
        evntBbsSno: 1,
        evntEndDtm: '',
        evntStrtDtm: '',
        htmlCtt: '',
        inqTims: 0,
        listImgPth: '/',
        mdfDtm: '',
        mdfDvCd: '',
        mdfpeCustSno: 1,
        mdfpeIpAdr: '',
        regDtm: '',
        regDvCd: '',
        regpeIpAdr: '',
        regpeSno: 1,
        ttlNm: '',
        useYn: false,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      //이벤트 상세 api 불러오기
      try {
        const response = await getEventView({
          evntBbsSno: this.$route.params.seq,
        });
        if (response.code === 'SUC001') {
          this.viewData = response.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.event-view {
  padding: 20px 0;
  .img {
    display: block;
    img {
      width: 100%;
      vertical-align: top;
    }
  }
}
</style>
