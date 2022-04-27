import { pages } from '@/utils/path';

export default [
  {
    path: '/cs/notice',
    name: 'notice-list',
    component: pages('cs/notice'),
    meta: { title: '공지사항' },
    pageInfo: { menuName: '고객센터/공지사항 리스트' },
  },
  {
    path: '/cs/notice/:seq',
    name: 'notice-view',
    component: pages('cs/notice-view'),
    pageInfo: { menuName: '고객센터/공지사항 상세' },
  },
  {
    path: '/cs/faq',
    name: 'faq-cs',
    component: pages('cs/faq'),
    meta: { title: '자주 묻는 질문' },
    pageInfo: { menuName: '고객센터/자주 묻는 질문' },
  },
  {
    path: '/cs/qa',
    name: 'qa-list',
    component: pages('cs/qa'),
    meta: { title: '1:1 문의 작성' },
    pageInfo: { menuName: '고객센터/1:1 문의 작성' },
  },
  {
    path: '/cs/qa/:seq',
    name: 'qa-view',
    component: pages('cs/qa-view'),
    pageInfo: { menuName: '고객센터/1:1 문의 상세' },
  },
  {
    path: '/cs/event',
    name: 'event-list',
    component: pages('cs/event'),
    meta: { title: '이벤트' },
    pageInfo: { menuName: '고객센터/이벤트 리스트' },
  },
  {
    path: '/cs/event/:seq',
    name: 'event-view',
    component: pages('cs/event-view'),
    pageInfo: { menuName: '고객센터/이벤트 상세' },
  },
];
