<template>
  <modal
    name="directInquiry"
    type="full"
    @open="openCallback"
    @closeEnd="closeEndCallback"
  >
    <template #header> </template>
    <template #content>
      <h2 class="title-2">무엇이 궁금하신가요?</h2>
      <p class="desc-text">핑글코치에게 직접 질문해보세요!</p>
      <form action="#" @submit.prevent="submitData">
        <div class="inquery-form">
          <form-textarea
            class="mt20"
            :maxlength="form.text.maxlength"
            v-model="form.text.value"
            :error="form.text.error"
            :placeholder="form.text.placeholder"
            @focusout="validateForInput('text')"
          />
        </div>
        <div class="flex-btn-group">
          <button type="submit" class="btn-primary-lg">등록</button>
        </div>
      </form>
    </template>
  </modal>
</template>

<script>
import { postCoachInquiry } from '@/api/modules/coach';

export default {
  name: 'direct-inquiry',
  data() {
    return {
      form: {
        text: {
          value: '',
          maxlength: '500',
          placeholder: '내용을 입력해주세요.',
          error: '',
        },
      },
      formValidation: {
        text: {
          presence: { allowEmpty: false, message: '^문의 내용을 입력하세요' },
          length: {
            minimum: 30,
            maximum: 500,
            message: '^최소 30글자 이상 내용을 입력해주세요',
          },
        },
      },
    };
  },
  methods: {
    async submitData() {
      try {
        if (this.validateForForm()) return;
        const { data: response } = await postCoachInquiry({
          aspeSno: 0,
          qustCtt: this.form.text.value,
        });
        console.log(response);
        await this.$_alert('문의 글 \n' + '작성이 완료되었습니다.\n');
        await this.$_modalClose({ name: 'directInquiry' });
        await this.resetData();
      } catch (error) {
        console.log(error);
      }
    },
    resetData() {
      this.form.text.value = '';
      this.form.text.error = '';
    },
    openCallback() {
      console.log('openCallback');
    },
    closeEndCallback() {
      console.log('closeEndCallback');
    },
  },
};
</script>

<style scoped lang="scss">
.title-2 {
  margin-top: 10px;
}
.desc-text {
  font-size: 13px;
  color: #888;
}
.flex-btn-group {
  margin-top: 30px;
}
</style>
