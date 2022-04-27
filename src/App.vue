<template>
  <div id="app">
    <component :is="AppLayout" />
    <portal-target name="modal" multiple tag="div" class="modal-wrap" />
    <alert />
    <toast />
    <loading />
  </div>
</template>
<script>
import layoutDefault from '@/layouts/layout-default';
import layoutClean from '@/layouts/layout-clean';
import bridgeBus from '@/utils/bridgeBus';
import bridge from '@/utils/WebViewBridgeDefault';
import { mapMutations, mapState } from 'vuex';
import bus from '@/utils/bus';
export default {
  name: 'App',
  metaInfo() {
    return {
      title: 'hana-insurtech',
      titleTemplate: 'test | %s',
      meta: [
        {
          name: 'title',
          content: 'hana-insurtech',
        },
        {
          name: 'description',
          content: 'home',
        },
        {
          name: 'keywords',
          content: '',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: 'hana-insurtech',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          content: '',
          vmid: 'og:description',
        },
        {
          property: 'og:image',
          // eslint-disable-next-line
          content:
            window.location.protocol +
            '//' +
            window.location.host +
            '/images/share1.png',
          vmid: 'og:image',
        },
        {
          property: 'og:url',
          content: process.env.VUE_APP_URL,
          vmid: 'og:url',
        },
      ],
    };
  },
  components: {
    LayoutDefault: layoutDefault,
    LayoutClean: layoutClean,
  },
  created() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    /*
     * @author 박래섭
     * @des 앱에서 받은 데이터를 스토어에 저장한다.
     * @param {data} 앱이 주는 토큰값
     * */

    // token
    bridgeBus.$on('getToken', (data) => {
      this.$store.commit('userInfo/ADD_TOKEN', data);
    });
    const t = bridge.callNative.getToken();
    if (!t && process.env.NODE_ENV === 'local') {
      const token =
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXN0U25vIjo3MywiY3VzdE5tIjoi7JWI7ZiE7ISgIiwiaXNBY2Nlc3NUb2tlbiI6IlkiLCJ0b2tlblR5cGUiOiJiMmMiLCJleHAiOjE2NTI5NDU3MjB9.eK8yFL0dfhy5rX25jimgxLIBtZxZ-WIyN8onzNKdKLA';
      bridgeBus.$emit('getToken', token);
    }

    // deviceInfo
    bridgeBus.$on('getDeviceInfo', (data) => {
      this.$store.commit('deviceInfo/MU_DEVICE_INFO', data);
    });
    bridge.callNative.getDeviceInfo();

    // backKey
    bridgeBus.$on('backKey', async () => {
      console.log(this.modalList.length);
      if (this.modalList.length) {
        this.$_modalCloseEnd();
        return;
      }
      if (!window.history.state?.pageNum) {
        console.log(1);
        if (!this.canLeaveSite) {
          const t = await new Promise((resolve) => {
            bus.$emit('pageLeave', resolve);
          });
          if (t) {
            bridge.callNative.closeWeb();
          }
        } else {
          console.log(2);
          bridge.callNative.closeWeb();
        }
      } else {
        this.PAGE_DIRECTION(-1);
        this.$router.go(-1);
      }
    });
  },
  computed: {
    ...mapState(['canLeaveSite']),
    ...mapState('modal', ['modalList']),
    AppLayout() {
      const layout =
        this.$route.meta.layout || this.$route.matched[0]?.meta?.layout;
      return layout ? `Layout${layout}` : null;
    },
  },
  methods: {
    ...mapMutations('pageTransition', ['PAGE_DIRECTION']),
  },
};
</script>
<style lang="scss" src="./assets/scss/common.scss" />
