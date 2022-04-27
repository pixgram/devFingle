/* eslint-disable */
//
//   WebBridge.js
//
//    Web Bridge code by Auto Generator//
import bridgeBus from '@/utils/bridgeBus';
const AppBridge = {
  nativeCallback: {
    //네이티브에서 웹 함수를 호출
    // getToken의 웹 콜백 함수
    // token - App에 저장된 토큰값을 불러온다.
    getTokenCB: function (token) {
      bridgeBus.$emit('getToken', token);
    },
    // getDeviceInfo의 웹 콜백 함수
    // appVer - 앱버전
    // uuid - UUID
    // appMrkgUnqNo - 앱마케팅고유번호
    // mdelNm - 모델명
    // osCd - OS코드(iOS-CUS00601,AOS-CUS00602)
    // osVer - OS버전
    // instlDtm - 설치일시
    getDeviceInfoCB: function (
      appVer,
      uuid,
      appMrkgUnqNo,
      mdelNm,
      osCd,
      osVer,
      instlDtm
    ) {
      bridgeBus.$emit('getDeviceInfo', {
        deviceInfo: {
          appVer,
          uuid,
          appMrkgUnqNo,
          mdelNm,
          osCd,
          osVer,
          instlDtm,
        },
      });
    },
    // 하드웨어 BackKey
    backKey: function () {
      bridgeBus.$emit('backKey');
    },
    // kakaoShare의 웹 콜백 함수
    // success - 카카오톡 공유하기 성공유무(true,false)
    kakaoShareCB: function (success) {
      bridgeBus.$emit('kakaoShareCB', {
        success: success,
      });
    },
    checkCameraPermissionCB: function (cameraPermission) {
      bridgeBus.$emit('checkCameraPermissionCB', cameraPermission);
    },
  },
};
export default AppBridge;
