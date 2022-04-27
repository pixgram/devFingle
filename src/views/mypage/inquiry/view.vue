<template>
  <container>
    <div class="inquiry-wrap" v-if="viewData">
      <div class="state-wrap">
        <!-- 추후에 답변 존재 체크 형식이 바뀔 수 있음 -->
        <span
          class="flag-primary-sm"
          v-if="viewData.fldtpQnaQuryStNm === '답변완료'"
        >
          {{ viewData.fldtpQnaQuryStNm }}
        </span>
        <span class="flag-gray-sm" v-else>
          {{ viewData.fldtpQnaQuryStNm }}
        </span>
      </div>
      <h2 class="title question">직접 문의한 질문입니다.</h2>
      <div class="board">
        <p>
          {{ viewData.qustCtt }}
        </p>
        <div class="date">
          <span class="day">{{ moment(viewData.qustDtm) }}</span>
          <span class="name">{{ viewData.qusrNm }}님의 질문</span>
        </div>
      </div>

      <hr class="wide-gray" />

      <template>
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
            보다 나은 답변을 드리고자 <br />
            핑글에서 확인 중입니다.
          </template>
        </no-data>
      </template>
      <router-link to="/" class="profile mt20" v-if="viewData.cchDvNm">
        <span class="info">
          <span class="img">
            <img
              :src="viewData.profImgFile.urlPth"
              alt="profile image"
              @error="noImage"
            />
          </span>
          <span class="tit-area">
            <span class="name">
              {{ viewData.cchDvNm }}{{ viewData.aspeNm }}
            </span>
            <span class="desc">{{ viewData.cchDvCd }}</span>
            <!-- api 추가 필요 -->
          </span>
        </span>
      </router-link>
    </div>
  </container>
</template>

<script>
import { getInquiry } from '@/api/modules/mypage';

export default {
  name: 'mypage-inquiry',
  data() {
    return {
      viewData: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await getInquiry({
          fldtpQnaSno: this.$route.params.seq,
        });
        console.log(response);
        if (response.code === 'SUC001') {
          this.viewData = response.data;
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
