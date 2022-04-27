<template>
  <div v-if="viewData.htmlCtt">
    <div class="view-head">
      <span class="flex-flag-group">
        <span :class="categoryType(viewData)">{{ viewData.postCtgr }}</span>
        <span v-if="viewData.postLvCd" class="flag-line-md">
          {{ viewData.postLvCd }}
        </span>
      </span>
      <strong class="view--title">{{ viewData.ttlNm }}</strong>
      <ul class="viewer">
        <li class="date" v-if="viewData.regDtm">{{ viewData.regDtm }}</li>
        <li class="hit">{{ viewData.inqTims }}</li>
        <li class="share">{{ viewData.cmmnTims }}</li>
        <li class="bookmark">{{ viewData.bkmkTims }}</li>
      </ul>
    </div>
    <div class="view-body">
      <div class="edit-area" v-html="viewData.htmlCtt" />
      <div v-if="viewData.dlbCtt" class="passed-number">
        {{ viewData.dlbCtt }}
      </div>
    </div>
    <div class="view-foot">
      <div class="flex-btn-group" v-if="viewData.appMenuCd">
        <button @click="moveInsure" class="btn-line-gray-md">
          {{ viewData.btnNm }}
        </button>
      </div>
      <div class="tag-group">
        <button
          type="button"
          class="flag-gray-sm"
          v-for="(tag, key) in viewData.hashtagList"
          :key="key"
          @click="tagSearch($event, tag)"
        >
          {{ tag }}
        </button>
      </div>
      <div class="full-btn-group">
        <button type="button" class="btn-ico-share" @click="shareSns">
          공유
        </button>
        <button
          type="button"
          :class="{ 'btn-ico-save': true, bookmarked: isBookmarked }"
          @click="postBookmark"
        >
          저장
        </button>
      </div>
    </div>
    <div v-if="viewData.insInfo.insPdSno !== 0" class="view-section">
      <h3 class="sub-title">핑글이 추천드려요!</h3>
      <insure-item
        :img="viewData.insInfo.logoFile.urlPth"
        :title="viewData.insInfo.insPdNm"
        :category="viewData.insInfo.insPdCtgr"
        :desc="viewData.insInfo.insPdCtt"
        :guide="viewData.insInfo.dlbCtt"
      />
    </div>
    <div v-if="viewData.quizInclYn" class="view-section">
      <div class="quiz-guide">
        <span v-if="quiz.rightYn" class="txt">
          퀴즈 정답을 맞혔어요! 베리 획득!
        </span>
        <span v-else class="txt">
          핑글 퀴즈를 풀고
          <strong class="mint-60">
            {{ viewData.quizInfo.acqsScr }} 베리
          </strong>
          를 획득하세요!
        </span>
      </div>
      <h3 class="sub-title">핑글 퀴즈</h3>
      <div class="quiz-tit">{{ viewData.quizInfo.quizQuesCtt }}</div>
      <div v-if="viewData.quizCompYn || quiz.rightYn" class="quiz-answer">
        <div class="tit">정답: {{ viewData.quizRightInfo.postCaswVal }}</div>
        <p class="desc">
          {{ viewData.quizRightInfo.postCaswCtt }}
        </p>
      </div>
      <template v-else>
        <ul
          v-if="viewData.quizInfo.postQustTypCd === 'CTS00301'"
          class="quiz-list"
        >
          <!-- 객관식 -->
          <li v-for="(item, key) in viewData.quizInfo.quizElemets" :key="key">
            <form-radio
              class="form-radio-btn"
              :disabled="item.disabled"
              :val="item.postAnswVal"
              name="quiz-radio"
              v-model="chosenAnswer.postAnswVal"
            >
              {{ item.postAnswCtt }}
            </form-radio>
          </li>
        </ul>
        <ul v-else class="quiz-wrap">
          <!-- O, X -->
          <li>
            <form-radio
              class="form-radio-ox-o"
              val="O"
              name="quiz-ox"
              v-model="chosenAnswer.postAnswVal"
            >
              <span class="blind">O</span>
            </form-radio>
          </li>
          <li>
            <form-radio
              class="form-radio-ox-x"
              val="X"
              name="quiz-ox"
              v-model="chosenAnswer.postAnswVal"
            >
              <span class="blind">X</span>
            </form-radio>
          </li>
        </ul>
      </template>
      <div
        class="flex-btn-group"
        v-if="quiz.rightYn ? !quiz.rightYn : !viewData.quizCompYn"
      >
        <button type="button" class="btn-primary-md" @click="fetchQuizAnswer">
          정답 확인
        </button>
      </div>
    </div>
    <div class="view-section">
      <h3 class="sub-title">인기 콘텐츠</h3>
      <ul class="popular-contents">
        <li v-for="(item, key) in viewData.contentsList" :key="key">
          <button type="button" class="cont-item" @click="moveTo(item)">
            <span class="img">
              <img
                :src="item.listFile.urlPth"
                :alt="item.ttlNm"
                @error="noImage"
              />
            </span>
            <span class="info">
              <span class="flex-flag-group">
                <span :class="categoryType(item)">{{ item.postCtgr }}</span>
                <template v-if="item.quizInclYn">
                  <span v-if="item.quizCompYn" class="flag-gray-md">
                    퀴즈 완료
                  </span>
                  <span v-else class="flag-darkgray-md">퀴즈</span>
                </template>
              </span>
              <span class="tit">
                {{ item.ttlNm }}
              </span>
            </span>
          </button>
        </li>
      </ul>
    </div>
    <modalQuizRight
      name="quiz-right"
      :point="viewData.quizInfo.acqsScr"
      @quize-right="fetchData('quiz')"
    />
    <modalQuizWrong name="quiz-wrong" />
    <modalShare />
  </div>
</template>

<script>
import {
  getPostDetail,
  getPostQuizAnswer,
  postBookmark,
  postShare,
} from '@/api/modules/post';
import bus from '@/utils/bus';
import bridge from '@/utils/WebViewBridgeDefault';

export default {
  name: 'view-detail',
  model: {
    /*    prop: 'thisItem',*/
  },
  props: {
    /*  thisItem: {
      type: Object,
      required: true,
    },*/
    modal: {
      type: Boolean,
    },
  },
  data() {
    return {
      isBookmarked: false,
      isShared: false,
      chosenAnswer: {
        postSno: '',
        postAnswVal: '',
      },
      quiz: {
        code: '',
        message: '',
        data: {
          addPoint: {
            addYn: false,
            actiNm: '',
            acqsScr: 0,
          },
          rightYn: false,
        },
      },
      viewData: {
        postSno: 0,
        postCtgr: '',
        postCtgrCd: '',
        ttlNm: '',
        htmlCtt: '',
        inqTims: 0,
        cmmnTims: 0,
        bkmkTims: 0,
        postLvCd: '',
        cmmnTtlNm: '',
        quizInclYn: false,
        quizCompYn: false,
        dlbCtt: '',
        postBkmkYn: false,
        regDtm: '',
        expoDyPutupYn: false,
        btnNm: '',
        btnLink: '',
        appMenuCd: '',
        linkVal: '',
        quizInfo: {
          postQuizQuesSno: 1,
          postQustTypCd: '',
          acqsScr: 3,
          quizQuesCtt: '',
          quizElemets: [
            {
              postQuizAnswSno: 0,
              postAnswCtt: '',
              postAnswVal: '',
              postAnswOrd: 0,
            },
          ],
        },
        quizRightInfo: {
          postCaswVal: '',
          postCaswCtt: '',
        },
        insInfo: {
          insPdSno: 0,
          insPdNm: '',
          insPdCtt: '',
          dlbCtt: '',
          insPdCtgr: '',
          logoFile: {
            fileGrpSno: 0,
            fileSno: 0,
            orgFileNm: '',
            fileCpc: 0,
            fileTypNm: '',
            urlPth: '',
          },
        },
        hashtagList: [],
        contentsList: [
          {
            postSno: 0,
            postCtgrCd: '',
            ttlNm: '',
            postLvCd: '',
            quizInclYn: false,
            quizCompYn: false,
            listFile: {
              fileGrpSno: 0,
              fileSno: 0,
              orgFileNm: '',
              fileCpc: 0,
              fileTypNm: '',
              urlPth: '',
            },
          },
        ],
        shareCdList: [
          {
            cdNm: '',
            cd: '',
            grpCd: '',
            lwrkGrpCd: '',
          },
        ],
        listFile: {
          fileGrpSno: 0,
          fileSno: 0,
          orgFileNm: '',
          fileCpc: 0,
          fileTypNm: '',
          urlPth: '',
        },
        kkoFile: {
          fileGrpSno: 0,
          fileSno: 0,
          orgFileNm: '',
          fileCpc: 0,
          fileTypNm: '',
          urlPth: '',
        },
        cmmnFile: {
          fileGrpSno: 0,
          fileSno: 0,
          orgFileNm: '',
          fileCpc: 0,
          fileTypNm: '',
          urlPth: '',
        },
      },
    };
  },
  components: {
    modalShare: () => import('@/views/modal/sns.vue'),
    modalQuizRight: () => import('@/views/post/modal/quiz-right.vue'),
    modalQuizWrong: () => import('@/views/post/modal/quiz-wrong.vue'),
  },
  created() {
    this.fetchData();
  },
  mounted() {
    bus.$once('doneShare', this.postShare);
  },
  methods: {
    categoryType(item) {
      switch (item.postCtgrCd) {
        case 'CTS00103': // 건강
          return 'flag-orange-md';
        case 'CTS00104': // 금웅 : 보라색
          return 'flag-purple-md';
        case 'CTS00105': // 핑글팁
          return 'flag-sub-md';
        default:
          // 보험
          return 'flag-sub-md';
      }
    },
    async moveTo(item) {
      this.isShared = false;
      this.$router
        .replace({
          query: { seq: item.postSno, category: item.postCtgrCd },
        })
        .catch(() => {});
      await this.fetchData();
    },
    moveInsure() {
      bridge.callNative.moveViewControl(
        '',
        this.viewData.appMenuCd,
        this.viewData.linkVal
      );
    },
    async fetchData(state) {
      this.loading(true);
      if (!state) this.viewData.htmlCtt = '';
      this.chosenAnswer.postAnswVal = '';
      try {
        const { data: response } = await getPostDetail({
          postCtgrCd: this.$route.query.category,
          postSno: this.$route.query.seq,
        });
        if (!state) {
          console.log(response);
          this.viewData = response;
          this.isBookmarked = response.postBkmkYn;
          if (this.modal) {
            this.$_modalScroll({
              name: 'post-view',
              position: { x: 0, y: 0 },
            });
          } else {
            window.scrollTo(0, 0);
          }
        } else if (state === 'quiz') {
          this.viewData.quizRightInfo = response.quizRightInfo;
        } else if (state === 'bookmark') {
          this.viewData.bkmkTims = response.bkmkTims;
        } else if (state === 'share') {
          this.viewData.cmmnTims = response.cmmnTims;
        }
      } catch (e) {
        console.log(e);
        if (this.modal) {
          await this.$_modalClose({ name: 'post-view' });
          /*  await this.$router.replace({
            query: { category: this.$route.query.category },
          });*/
        } else {
          //await this.$router.push('/404');
        }
      } finally {
        this.loading(false);
      }
    },
    async postShare() {
      try {
        const { data: response } = await postShare({
          cmmnMdiaDvCd: this.$route.query.category,
          postSno: this.$route.query.seq,
        });
        console.log(response.result);
        this.isShared = true;
        // if (response.postCmmnYn) {
        //   bus.$emit('update-share', this.$route.query.seq);
        // }
        await this.fetchData('share');
      } catch (e) {
        console.log(e);
      }
    },
    async postBookmark() {
      try {
        const { data: response } = await postBookmark({
          postCtgrCd: this.$route.query.category,
          postSno: this.$route.query.seq,
        });
        this.isBookmarked = response.postBkmkYn;
        if (this.isBookmarked) {
          this.toast('나의 포스트에 저장되었어요.');
        } else {
          this.toast('저장이 취소되었어요.');
        }
        await this.fetchData('bookmark'); //api 북마크 카운팅 만되고 다운은 안됨
      } catch (e) {
        console.log(e);
      }
    },
    async fetchQuizAnswer() {
      this.chosenAnswer.postSno = this.$route.query.seq;
      if (this.chosenAnswer.postAnswVal !== '') {
        try {
          const { data: response } = await getPostQuizAnswer(this.chosenAnswer);
          this.quiz = response;
          if (this.quiz.rightYn) {
            this.$_modalOpen({ name: 'quiz-right' });
          } else {
            this.$_modalOpen({ name: 'quiz-wrong' });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        return false;
      }
    },
    shareSns() {
      this.$_modalOpen({ name: 'sns-share' });
    },
    tagSearch($event, tag) {
      console.log($event, tag);
      if (this.modal) {
        this.$_modalClose({ name: 'post-view' });
        this.$route.query.keyword = tag;
      } else {
        this.$router.push({ name: 'post-list', query: { keyword: tag } });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.view-head {
  padding: 10px 0 20px;
  .view--title {
    display: block;
    margin: 10px 0 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
  }
  .viewer {
    display: flex;
    margin-top: 10px;
    li {
      position: relative;
      padding-left: 19px;
      background-position: left center;
      background-repeat: no-repeat;
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
      & + li {
        position: relative;
        margin-left: 17px;
        &::before {
          display: block;
          content: '';
          position: absolute;
          top: 3px;
          left: -8px;
          width: 1px;
          height: 12px;
          background: $gray-30;
        }
      }
      &.date {
        padding-left: 0;
      }
      &.hit {
        background-image: url(../../assets/images/ic-lookup-14.svg);
      }
      &.share {
        background-image: url(../../assets/images/ic-share-14.svg);
      }
      &.bookmark {
        background-image: url(../../assets/images/ic-bookmark-14.svg);
      }
    }
  }
}
.view-body {
  border-top: 1px solid $gray-30;
  padding: 20px 0 40px;
  font-size: 14px;
  line-height: 20px;
  .passed-number {
    margin: 20px 0 0;
    font-size: 12px;
    line-height: 18px;
    color: $gray-60;
  }
}
.view-foot {
  .tag-group {
    margin: -10px 0 0 -5px;
    [class^='flag'] {
      margin: 10px 0 0 5px;
    }
  }
  .flex-btn-group {
    & ~ .tag-group {
      margin-top: 30px;
    }
  }
  .full-btn-group {
    display: flex;
    margin: 40px -20px 0;
    border-top: 1px solid $gray-30;
    [class^='btn-ico'] {
      flex: 1;
      overflow: visible;
      position: relative;
      padding: 15px 0;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-indent: 20px;
      & + [class^='btn-ico'] {
        margin-left: 1px;
        &::after {
          display: block;
          content: '';
          position: absolute;
          top: 50%;
          left: -1px;
          transform: translateY(-50%);
          width: 1px;
          height: 12px;
          background: $gray-30;
        }
      }
      &::before {
        display: block;
        content: '';
        width: 16px;
        height: 16px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-20px, -50%);
      }
      &[class*='share']::before {
        background-image: url(../../assets/images/ic-16-share-gr-n.svg);
      }
      &[class*='save'] {
        &::before {
          background-image: url(../../assets/images/ic-bookmark-16-gr-n.svg);
        }
        &.bookmarked::before {
          background-image: url(../../assets/images/ic-bookmark-16-o.svg);
        }
      }
    }
  }
}
.view-section {
  margin: 0 -20px;
  border-top: 8px solid $gray-20;
  padding: 30px 20px;
  .sub-title {
    margin-top: 0;
    margin-bottom: 20px;
  }
  .flex-btn-group {
    margin-top: 30px;
  }
  .quiz-guide {
    position: relative;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 10px;
    background: $mint-10;
    text-align: center;
    .txt {
      display: inline-block;
      position: relative;
      padding-left: 21px;
      font-size: 12px;
      line-height: 18px;
      color: $black;
      &::before {
        display: block;
        content: '';
        position: absolute;
        top: 1px;
        left: 0;
        z-index: 1;
        width: 16px;
        height: 16px;
        background: url(../../assets/images/ic-point-16.svg) center center
          no-repeat;
      }
    }
  }
  .quiz-tit {
    position: relative;
    margin-bottom: 20px;
    padding: 0 0 0 29px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: $black;
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: -2px;
      left: 0;
      width: 24px;
      height: 24px;
      background: url(../../assets/images/ic-question-24-mint.svg) center center
        no-repeat;
    }
  }
  .quiz-list {
    & > li {
      & + li {
        margin-top: 10px;
      }
    }
  }
  .quiz-wrap {
    display: flex;
    & > li {
      flex: 1;
      & + li {
        margin-left: 10px;
      }
    }
  }
  .quiz-answer {
    box-sizing: border-box;
    border: 1px solid $mint-50;
    border-radius: 10px;
    padding: 50px 20px;
    text-align: center;
    .tit {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: $mint-60;
    }
    .desc {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: $gray-70;
      word-break: keep-all;
    }
  }
  .popular-contents {
    & > li {
      &:first-child {
        .cont-item {
          padding-top: 0;
        }
      }
      & + li {
        margin-top: 1px;
        .cont-item {
          &::before {
            display: block;
            content: '';
            position: absolute;
            top: -1px;
            right: 0;
            width: calc(100% - 97px);
            height: 1px;
            background: $gray-30;
          }
        }
      }
      .cont-item {
        display: flex;
        position: relative;
        width: 100%;
        padding: 15px 0;
        text-align: left;
        .img {
          overflow: hidden;
          display: block;
          flex: 0 0 82px;
          height: 82px;
          border-radius: 10px;
          font-size: 0;
        }
        .info {
          flex: 1;
          display: block;
          margin-left: 15px;
          padding: 5px 0;
          .tit {
            @include ellipsis(2);
            margin: 10px 0 0;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
          }
        }
      }
    }
  }
}

::v-deep [class*='form-radio-ox'] {
  display: flex;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 155px;
  border: 1px solid $gray-30;
  border-radius: 10px;
  text-align: center;
  i {
    display: none;
  }
  &.checked {
    border-color: $mint-50;
  }
  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  &[class*='ox-o']::before {
    background-image: url(../../assets/images/ic-o-60-n.svg);
  }
  &[class*='ox-x']::before {
    background-image: url(../../assets/images/ic-x-60-n.svg);
  }
}
</style>
