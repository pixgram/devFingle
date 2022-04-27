import { pages } from '@/utils/path';

export default [
  {
    path: '/agree/:id',
    name: 'agree',
    component: pages('etc/agree'),
    pageInfo: { menuName: 'ECT/약관' },
  },
  {
    path: '/inspection',
    name: 'inspection',
    component: pages('etc/inspection'),
    pageInfo: { menuName: 'ECT/시스템 점검안내' },
  },
  {
    path: '/404',
    name: 'error-404',
    component: pages('etc/404'),
    meta: { layout: 'Clean' },
    pageInfo: { menuName: 'ECT/error' },
  },
  {
    path: '/500',
    name: 'error-500',
    component: pages('etc/500'),
    meta: { layout: 'Clean' },
    pageInfo: { menuName: 'ECT/error' },
  },
];
