import { pages } from '@/utils/path';

export default [
  {
    path: '/coach/',
    name: 'coach-list',
    component: pages('coach/list'),
    meta: { title: '핑글코치 찾기' },
    pageInfo: { menuName: '핑글코치/핑글코치 찾기 메인' },
  },
  {
    path: '/coach-detail/',
    name: 'coach-profile',
    component: pages('coach/profile/index'),
    meta: { title: '핑글코치 프로필' },
    pageInfo: { menuName: '핑글코치/핑글코치 프로필 상세' },
    props: (route) => ({ query: route.query.seq }),
  },
  {
    path: '/coach-qa/',
    name: 'coach-qa-write',
    component: pages('coach/qa/write'),
    meta: { title: '질문을 작성해주세요.' },
    pageInfo: { menuName: '핑글코치/핑글코치 질문 작성' },
  },
  {
    path: '/coach-qa/:seq',
    name: 'coach-qa-view',
    component: pages('coach/qa/view'),
    pageInfo: { menuName: '핑글코치/핑글코치 질문 상세' },
  },
];
