/* eslint-disable */
import bridge from '@/utils/WebViewBridgeDefault';
import bus from '@/utils/bus';

const share = {
  checkAlreadyLoaded(src) {
    const loadedScripts = [...document.getElementsByTagName('script')];
    const result = loadedScripts.filter((script) => {
      return script.src === src;
    });

    return !!result.length;
  },
  checkMobile() {
    const userAgent = navigator.userAgent.toLocaleLowerCase();

    if (userAgent.search('android') > -1) {
      return 'aos';
    } else if (
      userAgent.search('iphone') > -1 ||
      userAgent.search('ipad') > -1
    ) {
      return 'ios';
    }
  },
  loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (share.checkAlreadyLoaded(src)) {
        return resolve(true);
      }

      const s = document.createElement('script');
      let r = false;
      s.type = 'text/javascript';
      s.src = src;
      s.async = true;
      s.onerror = function (err) {
        reject(err, s);
      };
      s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete')) {
          r = true;
          resolve(true);
        }
      };
      const t = document.getElementsByTagName('script')[0];
      t.parentElement.insertBefore(s, t);
    });
  },
  //공유할 종류 체크해서 해당 공유기능 콜백
  sendTo(snsName, shareData) {
    switch (snsName) {
      case 'kakao':
        share.kakao.sendLink(shareData);
        break;
      case 'sms':
        share.sms.sendLink(shareData);
        break;
      case 'link':
        return share.link.sendLink(shareData);
        break;
      default:
        throw new Error(`${snsName}은 잘못된 공유하기 요청입니다.`);
    }
  },
  kakao: {
    init() {
      Kakao.init('d0cf8857430fcd9e853d3e7ebc8e1e7a');
    },
    sendLink(shareData) {
      const imagePath = shareData.imgUrl;
      const title = shareData.title;
      const message = shareData.description;
      const buttonName = shareData.buttonName;
      const buttonLinkUrl = shareData.linkUrl;

      if(navigator.userAgent.toLowerCase().search('fingle') > -1 ) {
        // 카카오톡 공유하기 네이티브 호출
        // imagePath - 이미지경로Url
        // title - 제목
        // message - 내용
        // buttonName - 버튼이름
        // buttonLinkUrl - 버튼링크Url
        bridge.callNative.kakaoShare(imagePath, title, message, buttonName, buttonLinkUrl);
        bus.$emit('doneShare', 'kakao');
      } else {
        Kakao.Link.sendDefault({
          objectType: 'feed',
          content: {
            title: title,
            description: message,
            imageUrl: imagePath,
            imageWidth: 264,
            imageHeight: 130,
            link: {
              mobileWebUrl: buttonLinkUrl,
              webUrl: buttonLinkUrl,
            },
          },
          buttons: [
            {
              title: buttonName,
              link: {
                mobileWebUrl: buttonLinkUrl,
                webUrl: buttonLinkUrl,
              },
            },
          ],
        });

        bus.$emit('doneShare', 'kakao');
      }
    }
  },
  sms: {
    sendLink(shareData) {
      const phoneNumber = '';
      // 아래 데이터는 시작줄을 맞추지 않습니다. 시작줄을 맞출 경우 공백이 포함되어 메시지가 전달됩니다.
      const message = `
[${shareData.title}]
${shareData.description}
${shareData.linkUrl}`;
      location.href = `sms:${phoneNumber}${
        share.checkMobile() === 'ios' ? '&' : '?'
      }body=${encodeURIComponent(message)}`;
      bus.$emit('doneShare', 'sms');
    },
  },
  link: {
    sendLink(shareData) {
      return new Promise((resolve, reject) => {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = shareData.linkUrl;
        dummy.select();
        document.execCommand('copy');//익스를 위해 clipboard api를 사용하지 않았음
        document.body.removeChild(dummy);
        resolve(true);
        bus.$emit('doneShare', 'link');
      });
    },
  },
};

export { share };
