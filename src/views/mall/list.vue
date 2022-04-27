<template>
  <container>
    <fade-title>
      <h2 class="title-2-rgl">
        건강 등급이
        <strong> {{ codetype }} {{ grade.health }} </strong>
        입니다 <br />
        보험료 할인을 받을 수 있어요
      </h2>
    </fade-title>
    <!--    todo : api 수정 되면 type 2가지 입니다. v-if-->
    <fade-title>
      <h2 class="title-2-rgl">
        건강 등급이
        <strong> {{ codetype }} {{ grade.health }} </strong>
        입니다 <br />
        보험료 할인을 받을 수 있어요
      </h2>
    </fade-title>
    <ul v-if="listData && listData.length > 0">
      <li v-for="(item, idx) in listData" :key="idx">
        <insure-item
          @click="linkTo($event)"
          :item="item"
          :img="item.files.urlPth"
          :title="item.insPdNm"
          :category="item.insGurtCtt"
          :desc="item.insPdCtt"
          :type="item.insPdTypNm"
        ></insure-item>
      </li>
    </ul>

    <insure-modal :data="insureModal" :title="insureModal.title" />
  </container>
</template>

<script>
import insureModal from '@/views/mall/modal/insure-modal';
import insureItem from '@/components/common/insure-item';
import { getRecommendProduct } from '@/api/modules/mall';

export default {
  name: 'list',
  components: {
    insureModal,
    insureItem,
  },
  data() {
    return {
      insureModal: {
        title: '',
        description: '',
      },
      grade: {
        myGrade: '',
        health: '',
      },
      listData: [],
      codeType: '',
    };
  },
  // todo api 수정 후 다시 재 작업
  methods: {
    async fatchGrade() {
      const codetype = this.$route.query.insRcmCtgrCd; // route에서 넘어오는 코드 (질환 이름)
      //const gradeType = this.$route.query.
      console.log(this.codeType);
      /*if (codetype.length > 0 || gradeType.length < 0) {
      } else if (codetype.length > 0 || gradeType.length < 0){
      }*/
      try {
        const response = await getRecommendProduct({
          insRcmCtgrCd: codetype, //PRD003, PRD004
        });
        //todo api 등급 관련 부분 수정 사항 반영되면 추후 진행
        /*const responseData = await getRecommendProduct({
          insRcmCtgrCd: codetype,
        });*/
        if (response.code === 'SUC001' && response.data.insPds.length > 0) {
          this.listData = response.data.insPds;
          //this.codetype = response.data.insRcmCtgrCd;
          return this.listData;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async linkTo(insPdsno) {
      //todo: api 수정 후 데이터 확인
      const { data } = await getRecommendProduct({ insPdsno: insPdsno });
      console.log(data);
      this.insureModal.title = data.insPds.insPdNm;
      this.insureModal.description = data.insPds.insPdCtt;
      await this.$_modalOpen({ name: 'insure-detail-modal' });
    },
  },
  mounted() {
    this.fatchGrade();
    //this.$nextTick(() => {});
  },
};
</script>

<style lang="scss" scoped>
ul {
  margin-top: 10px;
}
li + li {
  margin-top: 15px;
}
</style>
