const infiniteMixin = {
  data() {
    return {
      page: 1,
      size: 10,
      listData: [
        /*  {
          endYn: false,
          evntBbsSno: 6,
          evntEndDtm: '2022-11-06 00:00:00',
          evntStrtDtm: '2021-10-06 00:00:00',
          inqTims: 13,
          regDtm: '2021-11-29 16:01:07',
          ttlNm: 'TITLE 006',
          listFile: {
            fileCpc: 9851,
            fileGrpSno: 29,
            fileSno: 26,
            fileTypNm: 'image/png',
            orgFileNm: '001.png',
            urlPth: 'http://placeimg.com/640/200/any',
          },
        },
        {
          endYn: false,
          evntBbsSno: 6,
          evntEndDtm: '2022-11-06 00:00:00',
          evntStrtDtm: '2021-10-06 00:00:00',
          inqTims: 13,
          regDtm: '2021-11-29 16:01:07',
          ttlNm: 'TITLE 006',
          listFile: {
            fileCpc: 9851,
            fileGrpSno: 29,
            fileSno: 26,
            fileTypNm: 'image/png',
            orgFileNm: '001.png',
            urlPth: 'http://placeimg.com/200/400/any',
          },
        },*/
      ],
      infiniteId: +new Date(),
    };
  },
  methods: {
    /**
     * 무한 스크롤 리스트
     * @author 이정민
     * @param {object} $state vue-infinite-lading 내장함수 : loaded(), complete(), reset(), error()
     * @param {object} resDataList 요청데이터 중에서 리스트만 추출하여 받아옴
     * @param {object} :identifier  이 속성이 변경되면 새 구성요소로 다시 재설정(필터)
     */
    async infiniteHandler($state, resDataList) {
      try {
        const resList = await resDataList;
        if (resList?.length) {
          this.page += 1;
          this.listData = this.listData.concat(resList);
          $state.loaded();
          console.log(this.listData);
        } else {
          $state.complete();
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 필터(sort)
     * @author 이정민
     * 이 속성이 변경되면 새 구성요소로 다시 재설정
     */
    changeSort(t) {
      console.log(t);
      this.page = 1;
      this.listData = [];
      this.infiniteId += 1;
    },
  },
};
export { infiniteMixin };
