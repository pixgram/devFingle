<template>
  <div>
    <div class="coach-profile-top">
      <div class="coach-profile-inner">
        <div class="photo"></div>
        <span class="category mint">손해사정</span>
        <strong class="name">김하나 핑글코치</strong>

        <div class="review-info">
          <span class="rating-star-icon">
            <i class="icon-star"></i>
            0.0
          </span>
          <span class="num-all">총 상담 <em>000</em>회</span>
          <span class="num-recont">최근 한달 000회 상담</span>
        </div>
      </div>
    </div>
    <hr class="wide-gray" />
    <tab-item :list="tab" name="tab" :active.sync="tab.active" />
    <total-rating :rating="total"></total-rating>
    <hr class="wide-gray" />
    <div class="summary-group mt5">
      <div class="right">
        <form-select
          type="sort"
          v-model="sortData.value"
          :options="sortData.options"
        />
      </div>
    </div>
    <comment-list :list="list" class="mt5"></comment-list>
  </div>
</template>
<script>
import commentList from '@/components/comment-list';
import totalRating from '@/components/total-rating';
export default {
  name: 'review',
  components: {
    commentList,
    totalRating,
  },
  data() {
    return {
      tab: {
        active: '1',
        list: [
          {
            title: '소개',
            id: '1',
          },
          {
            title: '상담후기(000)',
            id: '2',
          },
          {
            title: 'FAQ',
            id: '3',
          },
        ],
      },
      total: {
        ranting: 4.9,
        list: [
          { ranting: 5, numerical: 50 },
          { ranting: 4, numerical: 40 },
          { ranting: 3, numerical: 0 },
          { ranting: 2, numerical: 0 },
          { ranting: 1, numerical: 200 },
        ],
      },
      sortData: {
        options: [
          {
            value: '상담많은순',
            label: '상담많은순',
          },
          {
            value: '인기순',
            label: '인기순',
          },
          {
            value: '평점낮은순',
            label: '평점낮은순',
          },
        ],
        value: '평점낮은순',
      },
      list: [
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: ['종합건강보험', '손해사정사'],
            desc:
              '' +
              '세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: [
              '종합건강보험',
              '손해사정사',
              '손해사정사',
              '손해사정사',
              '손해사정사',
            ],
            desc: '질문이있습니',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: ['종합건강보험', '손해사정사'],
            desc:
              '' +
              '세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: [
              '종합건강보험',
              '손해사정사',
              '손해사정사',
              '손해사정사',
              '손해사정사',
            ],
            desc: '질문이있습니',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: ['종합건강보험', '손해사정사'],
            desc:
              '' +
              '세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: [
              '종합건강보험',
              '손해사정사',
              '손해사정사',
              '손해사정사',
              '손해사정사',
            ],
            desc: '질문이있습니',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: ['종합건강보험', '손해사정사'],
            desc:
              '' +
              '세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: [
              '종합건강보험',
              '손해사정사',
              '손해사정사',
              '손해사정사',
              '손해사정사',
            ],
            desc: '질문이있습니',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: ['종합건강보험', '손해사정사'],
            desc:
              '' +
              '세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: [
              '종합건강보험',
              '손해사정사',
              '손해사정사',
              '손해사정사',
              '손해사정사',
            ],
            desc: '질문이있습니',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: ['종합건강보험', '손해사정사'],
            desc:
              '' +
              '세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 버튼 노출세줄 이상 더보기 버튼 노출 세줄 이상 더보기 버튼 노출',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
        {
          q: {
            name: '김**',
            rating: 4,
            category: '상담받은 분야',
            tag: [
              '종합건강보험',
              '손해사정사',
              '손해사정사',
              '손해사정사',
              '손해사정사',
            ],
            desc: '질문이있습니',
            date: '21.01.01',
          },
          a: {
            name: '김하나 핑글고',
            desc:
              '' +
              '안녕하세요 고객님!<br><br>\n' +
              '\n' +
              '믿고 상담해 주셔서 진심으로 감사합니다. 궁금한 점 있으시면 언제든지 편하게 연락주세요! ',
            date: '21.01.01',
          },
        },
      ],
    };
  },
};
</script>
<style scoped></style>
