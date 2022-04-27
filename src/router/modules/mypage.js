import { pages } from '@/utils/path';

export default [
  {
    path: '/mypage/counseling-review/write/:seq',
    name: 'counseling-review-write',
    component: pages('mypage/counseling-review/write'),
    meta: { title: '상담 후기 작성' },
    pageInfo: { menuName: '마이페이지/상담 후기 작성' },
  },
  {
    path: '/mypage/counseling-review/:seq',
    name: 'counseling-review-view',
    component: pages('mypage/counseling-review/view'),
    meta: { title: '작성한 후기' },
    pageInfo: { menuName: '마이페이지/상담 내역 후기 조회' },
  },
  {
    path: '/mypage/inquiry/:seq',
    name: 'mypage-inquiry',
    component: pages('mypage/inquiry/view'),
    meta: { title: '문의 내역' },
    pageInfo: { menuName: '마이페이지/문의 내역' },
  },
];
