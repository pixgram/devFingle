/* eslint-disable */
//
//   WebBridge.js
//
//    Web Bridge code by Auto Generator//
export default {
  callNative: {
    //네이티브 판별 함수
    getUserAgent: function () {
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.search('android') > -1) {
        return 'android';
      } else if (
        userAgent.search('iphone') > -1 ||
        userAgent.search('ipod') > -1 ||
        userAgent.search('ipad') > -1
      ) {
        return 'ios';
      } else {
        return '';
      }
    },
    //네이티브 앱 함수 선언부
    // 토큰값 요청
    getToken: function () {
      try {
        var currentOs = this.getUserAgent();
        console.log(currentOs);
        if (currentOs === 'android') {
          window.fingle.getToken();
          return true;
        } else if (currentOs === 'ios') {
          var data = {};
          data = { method: 'getToken' };
          webkit.messageHandlers.fingle.postMessage(data);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    // PassInfo 정보 전달
    // result - 인증성공유무(true, false)
    // passInfo - Pass 정보
    // loginId - 로그인용 아이디
    setPassInfo: function (result, passInfo, loginId) {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.setPassInfo(result, passInfo, loginId);
      } else if (currentOs === 'ios') {
        var data = {};
        var body = { result: result, passInfo: passInfo, loginId: loginId };
        data = { method: 'setPassInfo', body: body };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
    // 디바이스 정보 요청
    getDeviceInfo: function () {
      try {
        var currentOs = this.getUserAgent();
        if (currentOs === 'android') {
          window.fingle.getDeviceInfo();
          return true;
        } else if (currentOs === 'ios') {
          webkit.messageHandlers.fingle.postMessage({
            method: 'getDeviceInfo',
          });
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    // 보험청구 화면 종료
    closeInsurance: function () {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.closeInsurance();
      } else if (currentOs === 'ios') {
        var data = {};
        data = { method: 'closeInsurance' };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
    // Web 화면종료
    closeWeb: function () {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.closeWeb();
      } else if (currentOs === 'ios') {
        var data = {};
        data = { method: 'closeWeb' };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
    // 화면이동
    // viewType - 화면유형(native, web, outlink)
    // viewName - 화면이름(화면코드)
    // viewUrl - web or outlink 인경우 url
    moveViewControl: function (viewType, viewName, viewUrl) {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.moveViewControl(viewType, viewName, viewUrl);
      } else if (currentOs === 'ios') {
        var data = {};
        var body = { viewType: viewType, viewName: viewName, viewUrl: viewUrl };
        data = { method: 'moveViewControl', body: body };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
    // 상담신청요청
    // cchSno - 상담코치 일련번호
    moveCoachConsulting: function (cchSno) {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.moveCoachConsulting(cchSno);
      } else if (currentOs === 'ios') {
        var data = {};
        var body = { cchSno: cchSno };
        data = { method: 'moveCoachConsulting', body: body };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
    // 카카오톡 공유하기
    // imagePath - 이미지경로Url
    // title - 제목
    // message - 내용
    // buttonName - 버튼이름
    // buttonLinkUrl - 버튼링크Url
    kakaoShare: function (
      imagePath,
      title,
      message,
      buttonName,
      buttonLinkUrl
    ) {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.kakaoShare(
          imagePath,
          title,
          message,
          buttonName,
          buttonLinkUrl
        );
      } else if (currentOs === 'ios') {
        var data = {};
        var body = {
          imagePath: imagePath,
          title: title,
          message: message,
          buttonName: buttonName,
          buttonLinkUrl: buttonLinkUrl,
        };
        data = { method: 'kakaoShare', body: body };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
    // camera permission check
    checkCameraPermission: function () {
      var currentOs = this.getUserAgent();
      if (currentOs === 'android') {
        window.fingle.checkCameraPermission();
      } else if (currentOs === 'ios') {
        var data = {};
        data = { method: 'checkCameraPermission' };
        webkit.messageHandlers.fingle.postMessage(data);
      } else {
        return false;
      }
    },
  },
};
