import { pages } from '@/utils/path';

export default [
  {
    path: '/mall',
    name: 'mall',
    component: pages('mall'),
    meta: { title: '보험몰' },
    pageInfo: { menuName: '보험/보험몰' },
  },
  /*{
    path: '/mall/main',
    component: pages('mall/main'),
    meta: { title: '' },
    pageInfo: { menuName: '보험/보험몰 메인' },
  },*/
  /*{
    path: '/mall/list',
    component: pages('mall/list'),
    meta: { title: '핑글헬스 추천상품' },
    pageInfo: { menuName: '보험/핑글헬스 추천상품' },
  },*/
  /*{
    path: '/mall/post-all',
    component: pages('mall/post-all'),
    meta: { title: '보험몰 콘텐츠' },
    pageInfo: { menuName: '보험/포스트' },
  },*/
  {
    path: '/mall/insure-all',
    name: 'insure-all',
    component: pages('mall/insure-all'),
    meta: { title: '보험몰' },
    pageInfo: { menuName: '보험/보험몰' },
  },
];
