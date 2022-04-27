<template>
  <container headerType="modal">
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
        :placeholder="form.text.placeholder"
        @focusout="validateForInput('text')"
      />
      <h2 class="item-title gray-70 mt20">
        파일첨부<span class="opt-text">(선택)</span>
      </h2>
      <form-file-list v-model="form.files" :maxImgLength="3" />
      <p class="desc-text">
        이미지 파일 (PNG,JPG) 1장 당 10MB 이하로 최대 3개까지 등록 가능합니다.
      </p>

      <hr class="wide-gray" />
      <form-checkbox-all
        v-model="agree.all"
        :checkboxList="
          agree.list.filter((el) => !el.disabled).map((el) => el.value)
        "
        :checkedArray.sync="agree.checked"
        class="allChk"
      >
        <strong class="sub-title mt0">모든 약관에 동의합니다</strong>
      </form-checkbox-all>

      <hr class="line-gray" />

      <ul class="check-list">
        <li class="check-item" v-for="(item, index) in agree.list" :key="index">
          <form-checkbox
            :val="item.value"
            v-model="agree.checked"
            :disabled="false"
            :required="true"
            :subType="true"
          >
            {{ item.label }}
          </form-checkbox>
          <button
            v-if="item.value"
            type="button"
            class="btn-open-modal"
            title="약관 팝업 열기"
            @click="openAgreeModal(item)"
          >
            보기
          </button>
        </li>
      </ul>

      <div class="flex-btn-group mt30">
        <button type="submit" :disabled="submitDisabled" class="btn-primary-md">
          질문하기
        </button>
      </div>
    </form>

    <!-- TODO 김소연 : api 약관 내용 TBD -->
    <agreeModal
      name="agreeModal"
      :agreeModalSeq="agree.agreeModalSeq"
      type="full"
    />
  </container>
</template>

<script>
import { postCoachQA, getCoachQACode } from '@/api/modules/coach';
import bridge from '@/utils/WebViewBridgeDefault';
import bus from '@/utils/bus';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'coach-qa-write',
  data() {
    return {
      form: {
        category: {
          require: true,
          value: '',
          error: '',
          options: [],
          placeholder: '질문 항목을 선택해주세요.',
        },
        text: {
          require: true,
          value: '',
          error: '',
          maxlength: 500,
          minLength: 30,
          placeholder:
            '궁금하신 내용을 입력해주세요.(질문 등록 시 주민등록번호, 휴대폰번호 등 개인정보가 포함되지 않도록 유의해주세요. 질문은 비공개로 등록된 후 검토를 통해 핑글코치의 답변과 함께 공개로 전환됩니다.)',
        },
        files: [],
      },
      formValidation: {
        category: {
          presence: { allowEmpty: false, message: '^필수입력' },
        },
        text: {
          presence: { allowEmpty: false, message: '^내용을 입력해주세요.' },
          length: {
            minimum: 30,
            maximum: 500,
            message: '^최소 30글자 이상 내용을 입력해주세요.',
          },
        },
      },
      agree: {
        all: false,
        checked: [],
        list: [
          {
            value: 'COM00642',
            label: '개인정보 이용 동의 (필수)',
          },
          {
            value: 'COM00643',
            label: '개인정보 제 3자 제공 동의 (필수)',
          },
        ],
        agreeModalSeq: '',
      },
    };
  },
  computed: {
    ...mapState(['canLeaveSite']),
    submitDisabled() {
      let state = true;
      if (
        this.form.category.value.length > 0 &&
        this.form.text.value.length >= this.form.text.minLength &&
        this.agree.checked.length === 2
      ) {
        state = false;
      } else {
        state = true;
      }
      return state;
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
    openAgreeModal(item) {
      console.log(item);
      this.agree.agreeModalSeq = item.value;
      this.$_modalOpen({ name: 'agreeModal' });
      this.$router.replace({
        query: {
          modal: 'agreeModal',
          id: item.value,
        },
      });
    },
    unLoadEvent: function (event) {
      if (this.canLeaveSite) return;
      event.preventDefault();
      event.returnValue = '';
    },
    //  핑글코치 > 분야별QNA 유형 코드
    async categoryData() {
      try {
        const { data: response } = await getCoachQACode();
        console.log(response);
        response.list.forEach((el) => {
          this.form.category.options.push({ value: el.cd, label: el.cdNm });
        });
        //console.log(response);
      } catch (e) {
        console.log(e);
      }
    },
    async submitData() {
      try {
        if (this.validateForForm()) return;
        const formData = new FormData();
        //파일 목록
        this.form.files.forEach((file) => {
          formData.append('fileList', file);
        });
        //분야별질문항목코드
        formData.append('fldtpQustTrmCd', this.form.category.value);
        //질문내용
        formData.append('qustCtt', this.form.text.value);
        //개인정보이용동의여부

        formData.append(
          'psnlInfoUtlAgrYn',
          this.agree.checked.some((el) => el === 'checkList-1')
        );
        //개인정보3자제공동의여부
        formData.append(
          'psnlInfoTptyOfrAgrYn',
          this.agree.checked.some((el) => el === 'checkList-2')
        );
        const response = await postCoachQA(formData);
        console.log(response);
        if (response.code === 'SUC001') {
          await this.openAlertModal();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async openAlertModal() {
      await this.$_alert('질문 내용 작성이 완료되었습니다.');
      console.log('브릿지 이동'); //- 브릿지로 마이페이지 문의 내역 화면으로 이동
      this.MU_CAN_LEAVE_SITE(true);
      bridge.callNative.moveViewControl('native', 'CCOA0301B001', '');
    },
  },
  components: {
    agreeModal: () => import('@/views/coach/qa/modal/index'),
  },
};
</script>

<style lang="scss" scoped>
.file-upload-wrap {
  margin-top: 10px;
}
.allChk {
  margin-top: 30px;
  ::v-deep .icon-checkbox {
    top: 8px;
  }
}

.check-list {
  margin-top: 20px;
  li {
    display: flex;
    ::v-deep .form-checkbox {
      padding: 0 0 0 30px;
      [class^='icon-checkbox'] {
        top: 0;
      }
    }
    justify-content: space-between;
    & + li {
      margin-top: 16px;
    }
    ::v-deep [class^='btn'] {
      font-size: 13px;
      line-height: 18px;
      color: $gray-60;
      font-weight: normal;
      text-decoration: underline;
    }
  }
}
</style>
