import { pages } from '@/utils/path';

export default [
  {
    path: '/guide',
    name: 'guide',

    component: pages('guide'),
    meta: { layout: 'Clean' },
    redirect: '/guide/modal',

    children: [
      {
        path: 'moment',
        component: pages('guide/moment'),
        meta: {
          name: 'vue-moment | Date Format',
        },
      },
      {
        path: 'modal',
        component: pages('guide/modal/index'),
        meta: {
          name: 'modal',
        },
      },
      {
        path: 'modal-list',
        component: pages('guide/modal-list'),
        meta: {
          name: '모달 리스트',
        },
      },
      {
        path: 'button',
        component: pages('guide/button'),
        meta: {
          name: 'button',
        },
      },
      {
        path: 'color',
        component: pages('guide/color'),
        meta: {
          name: 'color',
        },
      },
      {
        path: 'form-select',
        component: pages('guide/form-select'),
        meta: {
          name: 'form-select',
        },
      },
      {
        path: 'heart',
        component: pages('guide/heart'),
        meta: {
          name: 'heart  ',
        },
      },
      {
        path: 'alert',
        component: pages('guide/alert'),
        meta: {
          name: 'alert  ',
        },
      },
      {
        path: 'sticky',
        component: pages('guide/sticky/index'),
        meta: {
          name: 'sticky',
        },
      },
      {
        path: 'no-data',
        component: pages('guide/no-data'),
        meta: {
          name: 'no-data',
        },
      },
      {
        path: 'form-radio',
        component: pages('guide/form-radio'),
        meta: {
          name: 'form-radio',
        },
      },
      {
        path: 'form-checkbox',
        component: pages('guide/form-checkbox'),
        meta: {
          name: 'form-checkbox',
        },
      },
      {
        path: 'form-textarea',
        component: pages('guide/form-textarea'),
        meta: {
          name: 'form-textarea',
        },
      },
      {
        path: 'form-input',
        component: pages('guide/form-input'),
        meta: {
          name: 'form-input',
        },
      },
      {
        path: 'form-file-list',
        component: pages('guide/form-file-list'),
        meta: {
          name: 'form-file-list',
        },
      },
      {
        path: 'accordion',
        component: pages('guide/accordion'),
        meta: {
          name: 'accordion',
        },
      },
      {
        path: 'tree',
        component: pages('guide/tree'),
        meta: {
          name: 'tree',
        },
      },
      {
        path: 'lottie',
        component: pages('guide/lottie'),
        meta: {
          name: 'lottie',
        },
      },
      {
        path: 'tab',
        component: pages('guide/tab'),
        meta: {
          name: 'tab',
        },
      },
      {
        path: 'textarea',
        component: pages('guide/form-textarea'),
        meta: {
          name: 'textarea',
        },
      },
      {
        path: 'font',
        component: pages('guide/font'),
        meta: {
          name: 'font',
        },
      },
      {
        path: 'toast',
        component: pages('guide/toast'),
        meta: {
          name: 'toast',
        },
      },
      {
        path: 'star',
        component: pages('guide/star'),
        meta: {
          name: 'star',
        },
      },
      {
        path: 'coach',
        component: pages('guide/coach'),
        meta: {
          name: 'coach',
        },
      },
      {
        path: 'review',
        component: pages('guide/review'),
        meta: {
          name: 'review',
        },
      },
      {
        path: 'hr',
        component: pages('guide/hr'),
        meta: {
          name: 'hr',
        },
      },
      {
        path: 'form-search',
        component: pages('guide/form-search'),
        meta: {
          name: 'search',
        },
      },
      {
        path: 'table',
        component: pages('guide/table'),
        meta: {
          name: 'table',
        },
      },
      {
        path: 'thumb',
        component: pages('guide/thumb'),
        meta: {
          name: 'thumb',
        },
      },
      {
        path: 'infinity-loading',
        component: pages('guide/infinity-loading'),
        meta: {
          name: 'infinity loading',
        },
      },
      {
        path: 'loading',
        component: pages('guide/loading'),
        meta: {
          name: 'loading',
        },
      },
      {
        path: 'swiper',
        component: pages('guide/swiper'),
      },
      {
        path: 'flag',
        component: pages('guide/flag'),
        meta: {
          name: 'flag',
        },
      },
      {
        path: 'image-gallery',
        component: pages('guide/image-gallery'),
        meta: {
          name: 'IMAGE GALLERY',
        },
      },
    ],
  },
  {
    path: '/guide/grid',
    component: pages('guide/grid'),
    meta: { layout: 'Clean' },
  },
  {
    path: '/guide/grid2',
    component: pages('guide/grid2'),
    meta: { layout: 'Clean' },
  },
  {
    path: '/calculator',
    component: pages('guide/calculator'),
    meta: { layout: 'Clean' },
  },
  {
    path: '/test',
    component: pages('test'),
  },
  {
    path: '/test2',
    component: pages('test2'),
  },
  {
    path: '/soyeon',
    component: pages('soyeon'),
  },
];
