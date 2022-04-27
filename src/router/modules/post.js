import { pages } from '@/utils/path';

export default [
  {
    path: '/post',
    name: 'post-list',
    component: pages('post/list'),
    meta: { title: '포스트' },
    pageInfo: { menuName: '포스트/포스트 리스트' },
  },
  {
    path: '/post-view',
    name: 'post-view',
    component: pages('post/view'),
    meta: { title: '\u00a0' },
    pageInfo: { menuName: '포스트/포스트 상세' },
  },
];
