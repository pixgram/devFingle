<template>
  <container>
    <div class="inquiry-wrap" v-if="viewData">
      <div class="state-wrap">
        <span class="flag-sub-md" v-if="viewData.fldtpQustTrmNm === '보험'">
          보험
        </span>
        <span class="flag-orange-md" v-if="viewData.fldtpQustTrmNm === '건강'">
          건강
        </span>
        <span class="flag-purple-md" v-if="viewData.fldtpQustTrmNm === '금융'">
          금융
        </span>
      </div>
      <h2 class="title question">
        [{{ viewData.fldtpQustDtlCtgrNm }}] 관련 문의
      </h2>
      <div class="board">
        <p>
          {{ viewData.qustCtt }}
        </p>
        <div v-if="viewData.fileList.length" class="preview-container">
          <div
            v-for="(file, index) in viewData.fileList"
            :key="index"
            class="file-preview-wrapper"
          >
            <button type="button" @click="imgZoom">
              <img :src="file.filePth" :alt="file.fileNm" @error="noImage" />
            </button>
          </div>
        </div>
        <div class="date">
          <span class="day">{{ moment(viewData.quryDtm) }}</span>
          <span class="name">{{ viewData.qusrNm }}님의 질문</span>
        </div>

        <div class="flex-flag-group mt15" v-if="viewData.tagCtt">
          <span
            class="flag-gray-sm"
            v-for="(tag, index) in viewData.tagCtt"
            :key="index"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <hr class="wide-gray" />

      <div class="answer-wrap" v-if="viewData.answCtt">
        <h2 class="title answer">핑글코치의 답변입니다.</h2>
        <div class="board">
          <p>{{ viewData.answCtt }}</p>
          <div class="date">
            <span class="day">{{ moment(viewData.answDtm) }}</span>
          </div>
        </div>
      </div>

      <no-data v-else>
        <template #icon>
          <i class="icon-ellipsis" />
        </template>
        <template #text>
          보다 나은 답변을 드리고자<br />핑글에서 문제점을 알아보고 있습니다.
        </template>
      </no-data>

      <router-link to="/" class="profile mt20" v-if="viewData.cchDvNm">
        <span class="info">
          <span class="img">
            <img
              :src="viewData.profPotoPth"
              alt="profile image"
              @error="noImage"
            />
          </span>
          <span class="tit-area">
            <span class="name">
              {{ viewData.cchNm }} {{ viewData.cchDvNm }}
            </span>
            <span class="desc">{{ viewData.cchItrdCtt }}</span>
          </span>
        </span>
      </router-link>
    </div>
    <imageGallery name="imageGallery" type="full" />
  </container>
</template>

<script>
import { getCoachQA } from '@/api/modules/coach';

export default {
  name: 'coach-qa-view',
  components: {
    imageGallery: () => import('@/views/guide/modal/image-gallery.vue'),
  },
  data() {
    return {
      viewData: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async imgZoom() {
      await this.$_modalOpen({ name: 'imageGallery' });
    },
    async fetchData() {
      try {
        const response = await getCoachQA({
          fldtpQnaSno: this.$route.params.seq,
        });
        console.log(response);
        if (response.code === 'SUC001') {
          this.viewData = response.data;
          console.log(this.viewData.tagCtt);
          if (this.viewData.tagCtt) {
            this.viewData.tagCtt = this.viewData.tagCtt.split(',');
          }
        } else {
          // todo 데이터 없음 케이스
          this.viewData = null;
          await this.$router.push('/404');
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
