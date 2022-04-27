import bus from '@/utils/bus';
import bridge from '@/utils/WebViewBridgeDefault';
import store from '@/store';
import router from '@/router';

function setInterceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = store.state.userInfo.apchTknVal;
      config.headers.app_os_code = store.getters['deviceInfo/OS_CODE'];
      config.headers.app_version = store.getters['deviceInfo/APP_VERSION'];
      bus.$emit('loading', true);
      return config;
    },
    (error) => {
      bus.$emit('loading', false);
      bus.$emit('toast', { msg: error.response.data.message, time: 3000 });
      console.error(error);
      return Promise.reject(error.response);
    }
  );
  instance.interceptors.response.use(
    (config) => {
      bus.$emit('loading', false);
      return config.data;
    },
    async (error) => {
      bus.$emit('loading', false);
      //bus.$emit('toast', { msg: error.response.data.message, time: 3000 });

      // 	토큰 만료
      if (error.response.data.code === 'ERR104') {
        bridge.callNative.getToken();
        bus.$emit('toast', {
          msg: '토큰 만료',
        });
      }

      if (process.env.NODE_ENV !== 'production') {
        // Server Unchecked Exception (서버 에러) -> 백엔드팀에 문의
        if (error.response.data.code === 'ERR001') {
          bus.$emit('toast', {
            msg: '서버 에러',
          });
        }

        // Bxm Unchecked Exception (BXM 에러) -> 백엔드팀에 문의
        if (error.response.data.code === 'ERR002') {
          bus.$emit('toast', {
            msg: 'BXM 에러',
          });
        }

        // 시스템점검
        if (error.response.data.code === 'ERR003') {
          bus.$emit('toast', {
            msg: '시스템점검',
          });
        }

        // 	강제 앱 업데이트
        if (error.response.data.code === 'ERR004') {
          bus.$emit('toast', {
            msg: '강제 앱 업데이트',
          });
        }

        // 	접근 권한 에러
        if (error.response.data.code === 'ERR102') {
          bus.$emit('toast', {
            msg: '접근 권한 에러',
          });
        }

        // 	토큰 위변조
        if (error.response.data.code === 'ERR105') {
          bus.$emit('toast', {
            msg: '토큰 위변조',
          });
        }

        // 	토큰이 없습니다.
        if (error.response.data.code === 'ERR106') {
          bus.$emit('toast', {
            msg: '토큰이 없습니다.',
          });
        }

        // 	비밀번호가 변경되었습니다. 재 로그인해주세요.
        if (error.response.data.code === 'ERR110') {
          bus.$emit('toast', {
            msg: '비밀번호가 변경되었습니다. 재 로그인해주세요.',
          });
        }
        // 	파라메터 유효성 검사 에러
        if (error.response.data.code === 'ERR301') {
          bus.$emit('toast', {
            msg: '파라메터 유효성 검사 에러',
          });
        }

        // 	등록, 수정 처리 실패
        if (error.response.data.code === 'ERR302') {
          bus.$emit('toast', {
            msg: '등록, 수정 처리 실패',
          });
        }

        if (error.response?.status === 400) {
          bus.$emit('toast', { msg: '클라이언트 에러' });
        }
      }

      // 	삭제된 데이터 요청
      if (error.response.data.code === 'ERR303') {
        if (process.env.NODE_ENV === 'production') {
          store.commit('MU_CAN_LEAVE_SITE', true, { root: true });
          await router.push('/404');
        } else {
          bus.$emit('toast', {
            msg: '삭제된 데이터 요청',
          });
        }
      }

      if (error.response?.status === 500) {
        if (process.env.NODE_ENV === 'production') {
          store.commit('MU_CAN_LEAVE_SITE', true, { root: true });
          await router.push('/500');
        } else {
          bus.$emit('toast', {
            msg: '500에러',
          });
        }
      }
      return Promise.reject(error.response);
    }
  );
  return instance;
}

export { setInterceptors };
