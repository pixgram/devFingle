<template>
  <container>
    <template v-if="viewData">
      <div class="state-wrap">
        <!-- 추후에 답변 존재 체크 형식이 바뀔 수 있음 -->
        <span
          class="flag-primary-sm"
          v-if="viewData.fldtpQnaQuryStNm === '답변완료'"
        >
          {{ viewData.fldtpQnaQuryStNm }}
        </span>
        <span class="flag-gray-sm" v-else>
          {{ viewData.fldtpQnaQuryStNm }}
        </span>
      </div>
      <h2 class="title question">
        <template v-if="viewData.quryQustCtgrNm">
          [{{ viewData.quryQustCtgrNm }}] 관련 문의22
        </template>
      </h2>
      <div class="board">
        <p>{{ viewData.qustCtt }}</p>
        <div v-if="viewData.fileList.length" class="preview-container">
          <button
            v-for="(file, index) in viewData.fileList"
            :key="index"
            class="file-preview-wrapper"
            @click="imageGalleryOpen(index)"
          >
            {{ file.urlPth }}
            <img
              :src="file.urlPth"
              :alt="`${file.orgFileNm}`"
              @error="noImage"
            />
          </button>
        </div>
        <div class="date">
          <span class="day">
            {{ moment(viewData.qustDtm, 'hasTime') }}
          </span>
        </div>
      </div>

      <hr class="wide-gray" />

      <div class="answer-wrap" v-if="viewData.answCtt">
        <h2 class="title answer">핑글코치의 답변입니다.</h2>
        <div class="board">
          <p>{{ viewData.answCtt }}</p>
          <div class="date">
            <span class="day">{{ viewData.answDtm }}</span>
          </div>
        </div>
      </div>

      <no-data v-else>
        <template #icon>
          <i class="icon-ellipsis" />
        </template>
        <template #text>
          보다 나은 답변을 드리고자 <br />핑글에서 확인 중입니다.
        </template>
      </no-data>

      <imageGallery :imageList="viewData.fileList" :idx="galleryIdx" />
    </template>
  </container>
</template>

<script>
import { getQaView } from '@/api/modules/cs';
import imageGallery from '@/mixin/imageGallery';

export default {
  name: 'qa-view',
  data() {
    return {
      viewData: {
        fldtpQnaSno: '',
        qustCtt: '',
        fldtpTpCd: '',
        qusrSno: '',
        qustDtm: '',
        aspeSno: '',
        fldtpQnaQuryStCd: '',
        fldtpQnaQuryStNm: '',
        fileList: [],
      },
    };
  },
  mixins: [imageGallery],
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await getQaView({
          fldtpQnaSno: this.$route.params.seq,
        });
        if (response.code === 'SUC001') {
          this.viewData = response.data;
        } else {
          // todo 데이터 없음 케이스
          this.viewData = null;
          await this.$router.push('/404');
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.state-wrap {
  margin-top: 10px;
}

.title {
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.5px;
  position: relative;
  padding-left: 28px;

  &.question {
    margin-top: 10px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(#{$images}/ic-question-24.svg) no-repeat;
    }
  }

  &.answer {
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(#{$images}/ic-answer-24.svg) no-repeat;
    }
  }
}

.answer-wrap {
  margin-top: 30px;
}

.board {
  margin-top: 10px;
  line-height: 20px;
  color: #000000;
  font-size: 14px;
  p {
    white-space: pre-line;
    word-break: break-all;
  }
  .date {
    font-size: 12px;
    line-height: 18px;
    color: $gray-60;
    margin-top: 15px;

    .time {
      padding-left: 13px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: $gray-50;
      }
    }
  }
}

.preview-container {
  margin-top: 15px;
}
</style>
