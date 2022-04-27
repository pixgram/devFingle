<template>
  <div class="contents-box">
    <form-select
      border="border"
      :options="selectModalList.options"
      v-model="selectModalList.value"
      @change="agreeDetail"
      v-if="selectModalList && $route.query.version === 'true'"
    />
    <div
      :class="{
        'agree-content ': true,
        mt20: selectModalList && $route.query.version === 'true',
      }"
      v-html="agreeContent.html"
    />
  </div>
</template>

<script>
import { getAgreeDetail } from '@/api/modules/agree';

export default {
  name: 'agree-contents',
  data() {
    return {
      selectModalList: {
        value: '',
        options: [],
      },
      agreeContent: {
        html: '',
      },
    };
  },
  mounted() {
    this.agreeDetail(true);
  },
  activated() {
    this.selectModalList = {
      value: '',
      options: [],
    };
    this.agreeContent = {
      html: '',
    };
    this.agreeDetail(true);
  },
  methods: {
    async agreeDetail(init) {
      try {
        const { data: response } = await getAgreeDetail({
          clusKdCd: this.$route.params.id
            ? this.$route.params.id
            : this.$route.query.id,
          clusSno: this.selectModalList.value
            ? Number(this.selectModalList.value)
            : '',
        });
        console.log(response);
        this.$emit('update', response.clusKdNm);
        this.agreeContent.html = response.clusHtmlCtt;
        if (!init) return;
        if (response.list.length > 0) {
          this.selectModalList.options = response.list.map((el) => {
            return {
              value: `${el.clusSno}`,
              label: el.clusKdNm + ' ' + el.clusVer,
            };
          });
          this.selectModalList.value = this.selectModalList.options[0].value;
        } else {
          this.selectModalList = null;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-select {
  margin-top: 15px;
}
::v-deep .agree-content {
  margin-top: 30px;
  font-size: 14px;
  line-height: 20px;
  color: $black;
  h1 {
    font-size: 24px;
    line-height: 30px;
    & + p {
      margin-top: 30px;
    }
  }

  p {
    margin-top: 30px;
    word-break: keep-all;
    & + p {
      margin-top: 10px;
    }
  }
  strong {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    line-height: 24px;
    & + p {
      margin-top: 15px;
    }
  }
  em {
    display: block;
    margin-top: 30px;
    font-size: 14px;
    line-height: 20px;
    color: $black;
    word-break: keep-all;
  }
  table {
    margin-top: 15px;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    th {
      font-size: 12px;
      line-height: 18px;
      vertical-align: middle;
      font-weight: bold;
      color: $gray-70;
      background: $gray-20;
      box-sizing: border-box;
      word-wrap: break-word;
    }
    tr {
      border: 1px solid $gray-30;
      border-width: 1px 0 1px 0;
      th {
        width: 31.5%;
        padding: 0 10px;
      }
      td {
        width: 100px;
        font-size: 12px;
        line-height: 18px;
        color: $black;
        padding: 13px 15px;
        word-break: keep-all;
        word-wrap: break-word;
        p {
          margin: 0;
          font-size: 12px;
        }

        // bullet case
        ul {
          margin-left: 0;
          > li {
            padding-left: 8px;
            font-size: 12px;
            line-height: 18px;
            & + li {
              margin-top: 8px;
            }
          }
        }
      }
    }
    thead {
      th {
        padding: 13px 0;
        text-align: center;
        & + th {
          border-left: 1px solid $gray-30;
        }
      }
    }
    tbody {
      td {
        padding: 13px 15px;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: left;
        word-break: keep-all;
        word-wrap: break-word;
        &:first-child {
          padding: 13px 10px;
          text-align: center;
        }
        & + td {
          border-left: 1px solid $gray-30;
        }
      }
    }
    & + p {
      margin-top: 15px;
    }
    & + ol,
    & + ul {
      margin-top: 15px;
    }
  }
  ul {
    margin-top: 15px;
    > li {
      position: relative;
      padding-left: 8px;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      word-break: keep-all;
      table {
        margin-left: -15px;
        width: calc(100% + 15px);
      }
      &:before {
        content: '';
        position: absolute;
        top: 6.5px;
        left: 0;
        width: 3px;
        height: 3px;
        background: $gray-50;
        border-radius: 50%;
      }
      & + li {
        margin-top: 10px;
      }
      ol,
      ul {
        counter-reset: none;
        margin-top: 10px;
        &.dash {
          li {
            text-indent: 8px;
          }
        }
        li {
          text-indent: 17px;
          padding-left: 0 !important;
          &:before {
            text-indent: 0;
          }
        }
      }
      p {
        margin-top: 0px;
      }
    }
    &.dash {
      > li {
        & + li {
          margin-top: 0;
        }
        &:before {
          content: '-';
          display: inline-block;
          top: 0;
          left: 0;
          font-size: 14px;
          background: transparent;
        }
        table {
          margin-bottom: 15px;
        }
      }
    }
    &.square {
      padding: 0;
      > li {
        &:before {
          background: $black;
          border-radius: 0;
        }
      }
    }
    strong {
      margin-left: 15px;
    }
  }
  //number case
  ol {
    margin-top: 15px;
    list-style: none;
    counter-reset: number;
    > li {
      position: relative;
      font-size: 14px;
      line-height: 20px;
      padding-left: 15px;
      word-break: keep-all;
      &:before {
        content: counter(number) '. ';
        counter-increment: number;
        position: absolute;
        top: 3px;
        left: 0;
        line-height: 100%;
      }
      & + li {
        margin-top: 10px;
      }
      p {
        margin-top: 0;
        text-indent: 0;
      }
      ol,
      ul {
        margin-top: 10px;
        li {
          text-indent: 17px;
          padding-left: 0 !important;
          &:before {
            text-indent: 0;
          }
        }
      }
      ul {
        counter-reset: none;
        li {
          text-indent: 8px;
        }
        &.dash {
          margin-top: 0;
          li {
            text-indent: 8px;
          }
        }
      }
    }
    &.circle {
      counter-reset: list;
      padding: 0;
      > li {
        padding-left: 17px;
        box-sizing: border-box;
        &:before {
          counter-increment: list;
          content: counter(list);
          position: absolute;
          top: 3px;
          left: 0;
          width: 14px;
          height: 14px;
          padding-right: 2px;
          border: 1px solid $black;
          border-radius: 50%;
          box-sizing: border-box;
          font-size: 10px;
          text-align: center;
          line-height: 12px;
        }
        &:after {
          content: '';
          width: 14px;
          height: 100%;
        }
      }
    }
    &[class^='bracket'] {
      counter-reset: list-bracket;
      > li {
        list-style: none;
        padding-left: 17px;
        &:before {
          counter-increment: list-bracket;
          content: '(' counter(list-bracket) ')';
          position: absolute;
          top: 3px;
          left: 0;
          margin-right: 2px;
          font-size: 13px;
          line-height: 12px;
        }
      }
    }
    &.bracket-right {
      > li {
        &:before {
          content: counter(list-bracket) ' )';
        }
      }
    }
    &.hangul {
      counter-reset: li;
      > li {
        &:before {
          counter-increment: li;
          content: counter(li, hangul) '.';
        }
      }
    }

    strong {
      margin-left: 15px;
    }
  }

  //section (사이 마진값이 없는 경우)
  section {
    margin-top: 10px;
    p {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      word-break: keep-all;
    }
    ol,
    ul {
      margin: 0;
      li {
        margin: 0;
      }
    }
    span {
      display: block;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      word-break: keep-all;
      &:before {
        content: '- ';
        display: inline-block;
        margin-right: 2px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .red {
    color: #f53b32;
  }
  .underline {
    text-decoration: underline;
  }
  .bold {
    font-weight: bold;
  }
}
</style>
