<template>
  <div>
    <h2 class="h2">모달 리스트</h2>
    <table class="table">
      <thead>
        <tr>
          <th>name</th>
          <th>category</th>
          <th>modal Name</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modalList" :key="index">
          <td class="agc">
            <button
              type="button"
              class="btn-primary-sm"
              @click="$_modalOpen({ name: `${item.modalName}` })"
            >
              {{ item.label }}
            </button>
          </td>
          <td class="agc">
            {{ item.category }}
          </td>
          <td class="agc">{{ item.modalName }}</td>
          <td>{{ item.path }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 모달 컴포넌트 -->
    <image-gallery />
    <sns-share />
    <badge-box :badgeList.sync="profileData.badgeList" />
    <counselingReview name="counseling-review" />
    <direct-inquiry />
    <run-app />
    <modalQuizRight name="quiz-right" :point="viewData.quizInfo.acqsScr" />
    <modalQuizWrong name="quiz-wrong" />
    <!--    <postView />-->
  </div>
</template>
<script>
import guideMixin from '@/views/guide/layout/guide-mixin';
export default {
  name: 'button',
  mixins: [guideMixin],
  components: {
    imageGallery: () => import('@/views/modal/image-gallery.vue'),
    snsShare: () => import('@/views/modal/sns'),
    badgeBox: () => import('@/views/coach/modal/badge-box'),
    counselingReview: () => import('@/views/coach/modal/counseling-review'),
    directInquiry: () => import('@/views/coach/modal/direct-inquiry'),
    runApp: () => import('@/views/coach/modal/run-app'),
    modalQuizRight: () => import('@/views/post/modal/quiz-right.vue'),
    modalQuizWrong: () => import('@/views/post/modal/quiz-wrong.vue'),
    //postView: () => import('@/views/post/modal/view.vue'),
  },
  data() {
    return {
      modalList: [
        {
          modalName: 'sns-share',
          category: '공통',
          path: '/views/modal/sns.vue',
          label: '공유하기',
        },
        {
          modalName: 'imageGallery',
          category: '공통',
          path: '/views/modal/image-gallery.vue',
          label: '이미지 갤러리',
        },
        {
          modalName: 'badgeBox',
          category: '핑글코치',
          path: '/views/coach/modal/badge-box.vue',
          label: '뱃지 현황',
        },
        {
          modalName: 'counseling-review',
          category: '핑글코치',
          path: '/views/coach/modal/counseling-review.vue',
          label: '상담 후기 작성',
        },
        {
          modalName: 'directInquiry',
          category: '핑글코치',
          path: '/views/coach/modal/direct-inquiry.vue',
          label: '1:1 문의',
        },
        {
          modalName: 'runApp',
          category: '핑글코치',
          path: '/views/coach/modal/run-app.vue',
          label: '핑글 앱 실행하기',
        },
        {
          modalName: '사용시 지정',
          category: '포스트',
          path: '/views/post/modal/view.vue',
          label: '포스트 상세',
        },
        {
          modalName: 'quiz-right',
          category: '포스트',
          path: '/views/post/modal/quiz-right.vue',
          label: '퀴즈 정답',
        },
        {
          modalName: 'quiz-wrong',
          category: '포스트',
          path: '/views/post/modal/quiz-wrong.vue',
          label: '퀴즈 오답',
        },
      ],
      profileData: {
        badgeList: [],
      },
      viewData: {
        quizInfo: {
          acqsScr: 3,
        },
      },
    };
  },
};
</script>
<style scoped lang="scss">
.table {
  font-size: 13px;
  th {
    background-color: #f5f5f5;
  }
  th,
  td {
    padding: 10px 12px;
    border: 1px solid #eee;
  }
}
</style>
