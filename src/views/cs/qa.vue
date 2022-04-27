<template>
  <container>
    <fade-title />
    <form @submit.prevent="submitData">
      <form-select
        class="mt10"
        border="border"
        :options="form.category.options"
        v-model="form.category.value"
        :error="form.category.error"
        :placeholder="form.category.placeholder"
        @change="validateForInput('category')"
      />
      <form-textarea
        class="mt20"
        :maxlength="form.text.maxlength"
        v-model="form.text.value"
        :error="form.text.error"
        :placeholder="placeholder"
        @focusout="validateForInput('text')"
      />
      <h2 class="item-title gray-70 mt20">
        파일첨부<span class="opt-text">(선택)</span>
      </h2>
      <form-file-list v-model="form.files" :maxImgLength="3" accept="image/*" />
      <p class="desc-text">
        이미지 파일 (PNG, JPG) 1장 당 10MB 이하로 최대 3까지 등록 가능합니다.
      </p>
      <div class="flex-btn-group mt30">
        <button :disabled="submitDisabled" type="submit" class="btn-primary-md">
          문의하기
        </button>
      </div>
    </form>
  </container>
</template>

<script>
import { postQa, getQaCategory } from '@/api/modules/cs';
import bridge from '@/utils/WebViewBridgeDefault';
import bus from '@/utils/bus';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'qa',
  data() {
    return {
      /*message: {
        select: {
          alert: '문의 유형을 선택해주세요',
        },
        textarea: {
          alert: '문의 내용을 입력하세요',
          error: '최소 30글자 이상 내용을 입력해주세요.',
        },
      },*/
      form: {
        category: {
          require: true,
          value: '',
          error: '',
          options: [],
          placeholder: '문의 유형을 선택해주세요',
        },
        text: {
          require: true,
          value: '',
          error: '',
          maxlength: 500,
          minLength: 30,
          placeholder: '문의 내용을 입력해주세요.',
        },
        files: [],
      },
      formValidation: {
        category: {
          presence: { allowEmpty: false, message: '^필수입력' },
        },
        text: {
          presence: { allowEmpty: false, message: '^필수입력' },
          length: {
            minimum: 30,
            maximum: 500,
            message: '^최소 30글자 이상 내용을 입력해주세요.',
          },
        },
      },
    };
  },
  computed: {
    ...mapState(['canLeaveSite']),
    submitDisabled() {
      let state = true;
      if (
        this.form.category.value.length > 0 &&
        this.form.text.value.length >= this.form.text.minLength
      ) {
        state = false;
      } else {
        state = true;
      }
      return state;
    },
    placeholder() {
      let placeholder = '문의 내용을 입력해주세요.';
      for (let i = 0; i < this.form.category.options.length; i += 1) {
        switch (this.form.category.value) {
          case 'BOD00401': //보험조회
            placeholder =
              '조회하신 보험 정보가 일치하지 않거나 신용정보원 연동에 실패하셨나요? 문제가 발생한 화면을 함께 전달해 주시면 보다 빠른 처리가 가능합니다.';
            break;
          case 'BOD00402': //보험금청구
            placeholder =
              '보험금 청구 진행 중 어려운 부분이 있으신가요? 문제가 발생한 화면을 함께 전달해 주시면 보다 빠른 처리가 가능합니다.';
            break;
          case 'BOD00403': //보험몰
            placeholder =
              '보험몰 이용 중 문제가 발생하셨나요? 문제가 발생한 화면을 함께 전달해 주시면 보다 빠른 처리가 가능합니다.';
            break;
          case 'BOD00404': //스타일링
            placeholder =
              '스타일링 서비스 및 진단 관련하여 궁금하신 사항이 있으시면 말씀해 주세요.';
            break;
          case 'BOD00405': //핑글코치
            placeholder =
              '핑글코치와의 상담 관련하여 궁금하신 사항이 있으시면 말씀해 주세요.';
            break;
          case 'BOD00406': //핑글라운지
            placeholder =
              '핑글라운지 서비스 및 상담 관련하여 궁금하신 사항이 있으시면 말씀해 주세요.';
            break;
          case 'BOD00407': //핑글헬스
            placeholder =
              '건강등급이나 질환예측 정보가 일치하지 않거나 건강보험공단 연동에 실패하셨나요? 문제가 발생한 화면을 함께 전달해 주시면 보다 빠른 처리가 가능합니다.';
            break;
          case 'BOD00408': //인증서관련
            placeholder =
              '인증서 사용 중 문제가 발생하셨나요? 인증서 발급 기관 및 인증서 목록이 보이는 화면을 함께 전달해 주시면 보다 빠른 처리가 가능합니다';
            break;
          case 'BOD00409': //서비스 문의/불편/제안
            placeholder =
              '서비스 이용 중 불편하신 사항이나 개선해야 할 사항이 있으시면 말씀해 주세요.';
            break;
          default:
            placeholder = '문의 내용을 입력해주세요.';
        }
      }
      return placeholder;
    },
  },
  mounted() {
    //window.addEventListener('beforeunload', this.unLoadEvent);
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.unLoadEvent);
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
  async created() {
    this.MU_CAN_LEAVE_SITE(false);
    await this.categoryData();
    bus.$on('pageLeave', async (resolve) => {
      if (!this.canLeaveSite) {
        const t = await this.$_confirm(
          '작성 중인 문의 내용은 저장되지 않습니다. \n문의를 취소 하시겠습니까?'
        );
        resolve(t);
      }
    });
  },
  methods: {
    ...mapMutations(['MU_CAN_LEAVE_SITE']),
    unLoadEvent: function (event) {
      if (this.canLeaveSite) return;
      event.preventDefault();
      event.returnValue = '';
    },
    // qa문의유형 코드 조회 api
    async categoryData() {
      try {
        const { data: response } = await getQaCategory();
        console.log(response);
        response.list.forEach((el) => {
          this.form.category.options.push({ value: el.cd, label: el.cdNm });
        });
        console.log(this.form.category.options);
      } catch (e) {
        console.log(e);
      }
    },
    async submitData() {
      try {
        if (this.validateForForm()) return;
        const formData = new FormData();
        this.form.files.forEach((file) => {
          formData.append('fileList', file);
        });
        formData.append('quryQustCtgrCd', this.form.category.value);
        formData.append('qustCtt', this.form.text.value);
        const response = await postQa(formData);
        console.log(response);
        if (response.code === 'SUC001') {
          await this.openAlertModal();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async openAlertModal() {
      this.MU_CAN_LEAVE_SITE(true);
      await this.$_alert('문의 글 \n' + '작성이 완료되었습니다.\n');
      this.form.files = []; //todo 초기화가 체
      this.form.category.value = this.form.category.options[0].value;
      this.form.value = '';
      console.log(this.form);

      console.log('브릿지 이동'); // - 브릿지로 마이페이지 1:1문의 내역 목록 화면으로 이동
      //bridge.callNative.moveViewControl('native', 'CMYP0601B001', '');
      bridge.callNative.closeWeb();
    },
  },
};
</script>

<style lang="scss" scoped>
.file-upload-wrap {
  margin-top: 10px;
}
</style>
