import Vue from 'vue';
import VueRouter from 'vue-router';

import cs from './modules/cs';
import coach from './modules/coach';
import etc from './modules/etc';
import mypage from './modules/mypage';
/*import inquiry from '@/router/modules/inquiry';*/
import post from '@/router/modules/post';
import mall from '@/router/modules/mall';
import guide from './modules/guide';
import styling from './modules/styling';
import { pages } from '@/utils/path';

Vue.use(VueRouter);

let routes = [
  /*{
    path: '/',
    name: 'home',
    component: pages('home'),
    meta: { title: 'home' },
    pageInfo: { menuName: '메인' },
  },*/
  {
    path: '/page-list',
    component: pages('page-list'),
    meta: { layout: 'Clean' },
  },
  ...cs,
  ...coach,

  /*  ...inquiry,*/
  ...post,
  ...mall,
  ...etc,
  ...styling,
  ...mypage,
  {
    path: '*',
    component: pages('etc/404'),
    pageInfo: { menuName: 'ECT/etc' },
  },
];

routes.forEach((el) => {
  if (el.meta === undefined) el.meta = {};
  if (el.meta.layout === undefined) el.meta.layout = 'Default';
});

if (process.env.VUE_APP_DEBUG === 'Y') {
  routes = [...routes, ...guide];
}

const scrollBehavior = (to, from, savedPosition) => {
  //return savedPosition || { x: 0, y: 0 };
  router.app.$emit('page-leave', savedPosition || { x: 0, y: 0 });
  // setTimeout(() => {
  //   router.app.$emit('page-leave', position);
  // }, 50);
};

const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.query.modal) {
    router.app.$_modalOpen({ name: to.query.modal, speed: 0 });
  }
  next();
});
export default router;
