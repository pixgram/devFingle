<template>
  <modal
    :name="name"
    type="full"
    @open="openCallback"
    @closeEnd="closeEndCallback"
  >
    <template #header>
      <h2 class="modal-title">상담 후기 작성</h2>
    </template>
    <template #content>
      <div class="coach-review">
        <div class="coach-info">
          <img
            :src="require('@/assets/images/logo.png')"
            alt=""
            class="thumb"
          />
          <span class="info">
            <strong class="name">김하나 핑글코치</strong>
            <span class="job">손해사정</span>
          </span>
        </div>
        <hr class="line-gray" />
        <h3 class="sub-title">상담은 어떠셨나요?</h3>
        <star-rating v-model="rating" class="mt20" />
        <p class="desc-text">별점을 선택해주세요.</p>

        <h3 class="sub-title mt50">상담 경험을 자세히 공유해 주세요.</h3>
        <form-textarea
          class="mt15"
          maxlength="500"
          placeholder="핑글코치 상담에 대한 후기를 남겨주세요."
          v-model="value"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex-btn-group">
        <button
          type="button"
          class="btn-primary-lg"
          @click="$_modalClose({ name: name, value: true })"
        >
          완료
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import starRating from '@/components/star-rating';
export default {
  name: 'counseling_review',
  data() {
    return {
      value: '',
      rating: 5,
    };
  },
  props: ['name'],
  components: {
    starRating,
  },
  methods: {
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
.coach-review {
  margin-top: 10px;
}
.coach-info {
  display: flex;
  .thumb {
    height: 60px;
    width: 60px;
    box-sizing: border-box;
    border-radius: 30px;
    border: 1px solid $gray-30;
  }
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 14px;
      line-height: 20px;
      font-weight: bold;
    }
    .job {
      font-size: 13px;
      line-height: 18px;
      color: $gray-60;
    }
  }
}
</style>
