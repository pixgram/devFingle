<template>
  <container headerType="modal">
    <fade-title />
    <div class="coach-review" v-if="coachData">
      <div class="coach-info">
        <img
          :src="coachData.profImgFile.urlPth"
          :alt="coachData.profImgFile.orgFileNm"
          class="thumb"
        />
        <div class="info">
          <strong class="name">{{ coachData.cchNm }} 핑글코치</strong>
          <div class="desc">
            <span>{{ coachData.cchCtgCdNm }} </span>
            <span>{{ coachData.cchCnslDvCdNm }} </span>
            <span>{{ coachData.cnslDtm }}</span>
          </div>
        </div>
      </div>
      <h3 class="sub-title">별점을 선택해주세요.</h3>
      <star-rating v-model="rating" class="mt15" />
      <h3 class="sub-title mt40">상담 경험을 자세히 공유해 주세요.</h3>
      <form-textarea
        class="mt15"
        :maxlength="form.text.maxlength"
        v-model="form.text.value"
        :error="form.text.error"
        :placeholder="form.text.placeholder"
        @focusout="validateForInput('text')"
      />
    </div>
    <div class="flex-btn-group">
      <button type="button" @click="submitData" class="btn-primary-md mt30">
        등록
      </button>
    </div>
  </container>
</template>

<script>
import { postCounselingData, postCounselingReview } from '@/api/modules/mypage';
import starRating from '@/components/star-rating';
import bridge from '@/utils/WebViewBridgeDefault';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'counseling-review-write',
  data() {
    return {
      coachData: null,
      value: '',
      rating: 5,
      form: {
        /*category: {
          require: true,
          value: '',
          error: '',
          options: [],
          placeholder: '질문 항목을 선택해주세요.',
        },*/
        text: {
          require: true,
          value: '',
          error: '',
          maxlength: 500,
          minLength: 20,
          placeholder:
            '핑글코치 상담에 대한 후기를 최소 20자 이상 남겨주세요.\n' +
            '상담과 관련 없는 내용이나 욕설 및 허위 사실을 작성하실 경우에는 사전 동의없이 삭제될 수 있습니다.',
        },
      },
      formValidation: {
        /*category: {
          presence: { allowEmpty: false, message: '^필수입력' },
        },*/
        text: {
          presence: { allowEmpty: false, message: '^내용을 입력해주세요.' },
          length: {
            minimum: 20,
            maximum: 500,
            message: '^최소 20글자 이상 내용을 입력해주세요.',
          },
        },
      },
    };
  },
  props: ['name'],
  components: {
    starRating,
  },
  created() {
    this.MU_CAN_LEAVE_SITE(false);
    this.fetchData();
  },
  computed: {
    ...mapState(['canLeaveSite']),
  },
  async beforeRouteLeave(to, from, next) {
    if (this.canLeaveSite) {
      next();
    } else {
      const t = await this.$_confirm(
        '작성 중인 문의 내용은 저장되지 않습니다. \n문의를 취소 하시겠습니까?'
      );
      if (t) {
        next();
      }
    }
  },
  methods: {
    ...mapMutations(['MU_CAN_LEAVE_SITE']),
    async fetchData() {
      try {
        const { data: response } = await postCounselingData({
          cnslSno: this.$route.params.seq,
        });
        this.coachData = response;
      } catch (e) {
        console.log(e);
      }
    },
    async submitData() {
      console.log(this.validateForForm());
      try {
        if (this.validateForForm()) return;
        const { data: response } = await postCounselingReview({
          cnslCtt: this.form.text.value,
          cnslSno: this.$route.params.seq,
          hrspScr: this.rating,
        });
        console.log(response);
        await this.$_alert('후기를 남겨주셔서 감사합니다.');
        await this.MU_CAN_LEAVE_SITE(true);
        await this.resetData();
        bridge.callNative.closeWeb();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.coach-review {
  margin-top: 20px;
}
.sub-title {
  font-size: 14px;
  line-height: 20px;
  color: #444;
}
.coach-info {
  display: flex;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid $gray-30;
  box-sizing: border-box;
  .thumb {
    overflow: hidden;
    height: 50px;
    width: 50px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid $gray-30;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    .name {
      font-size: 14px;
      line-height: 20px;
      font-weight: bold;
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
      span + span {
        position: relative;
        margin-left: 21px;
        &:before {
          content: '';
          position: absolute;
          width: 1px;
          height: 12px;
          top: 3px;
          left: -10px;
          background-color: $gray-30;
        }
      }
    }
  }
}
</style>
