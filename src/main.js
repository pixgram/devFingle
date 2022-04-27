import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLodash from 'vue-lodash';
import vueMoment from 'vue-moment';
import lodash from 'lodash';
import Meta from 'vue-meta';
import PortalVue from 'portal-vue';
import modal from '@/plugins/modal';
import sticky from '@/plugins/sticky';
import fadeTitle from '@/plugins/fade-title';
import AppBridge from '@/utils/WebViewNativeBridge.js';

window.AppBridge = AppBridge; // 앱 콜백함수 전역변수 등록

Vue.use(VueLodash, { lodash: lodash });
Vue.use(PortalVue);
Vue.use(Meta);
Vue.use(modal, { store });
Vue.use(sticky, { store });
Vue.use(fadeTitle, { store });
Vue.use(vueMoment);
//mixin
import { commonMixin } from '@/mixin/common';
Vue.mixin(commonMixin);

Vue.config.productionTip = false;

/**
 * component 전역 등록
 */
const requireComponent = require.context(
  '@/components/common',
  true,
  /[\w-]+\.vue$/
);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = lodash.upperFirst(
    lodash.camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

import container from '@/layouts/layout-default-container';
Vue.component('container', container);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
