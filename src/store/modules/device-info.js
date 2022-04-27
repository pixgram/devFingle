// import router from '@/router';

export default {
  namespaced: true,
  state: {
    DEVICE_INFO: null,
    /*DEVICE_INFO: {
      deviceInfo: {
        appVer: '1.1.1',
        uuid: 'uuid-uuid-uuid-uuid',
        appMrkgUnqNo: 'app marketing unique number',
        appPushKeyVal: 'app push key data',
        mdelNm: 'SM-N981N',
        osCd: 'CUS00601',
        osVer: 11,
        instlDtm: '2021.12.03 12:00:00',
      },
    },*/
  },
  getters: {
    DEVICE_CODE(state) {
      // (웹: CUS00503, 앱: CUS00504)
      return {
        lginDvCd: state.DEVICE_INFO ? 'CUS00504' : 'CUS00503',
      };
    },
    OS_CODE(state) {
      return state.DEVICE_INFO?.osCd || '';
    },
    APP_VERSION(state) {
      return state.DEVICE_INFO?.appVer || '';
    },
  },
  mutations: {
    MU_DEVICE_INFO: (state, payload) => {
      state.DEVICE_INFO = payload;
    },
  },
};
