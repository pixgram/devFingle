<template>
  <span class="form-input">
    <span class="input">
      <input
        :ref="kbdId"
        :type="inpType"
        :name="kbdId"
        :id="kbdId"
        :kbd-only="kbdOnly"
        maxlength="9"
        :data-tk-kbdType="kbdType"
        data-tk_hkStart_pos="4"
        data-tk_hkEnd_pos="7"
        data-tk_hk_mask="@"
        @click="onKeyboard"
      />
      <span v-if="!kbdOnly" :id="`${kbdId}_tk_btn`"
        ><span style="position: absolute; left: -9999px">마우스클릭</span></span
      >
      <button class="btn-primary-sm" @click="sendEncData(kbdId)">
        ID: {{ kbdId }}
      </button>
    </span>
  </span>
</template>

<script>
import qs from 'qs';
import axios from 'axios';

/* eslint-disable */
//transkey.js의 전역변수를 사용하고 있어서 esline에러가 발생해서 방지함
export default {
  name: 'keypad',
  props: {
    inpType: String, //input태그의 타입: password, text
    kbdType: String, //keyboard의 타입: number, qwerty
    kbdId: String, //keyboard의 id
    kbdOnly: Boolean, //keyboard use only
  },
  methods: {
    onKeyboard(e) {
      tk.onKeyboard(e.target);
    },
    async sendEncData(id) {
      const values = tk.inputFillEncData(document.getElementById(id));
      const name = document.getElementById(id).name;
      const hidden = values.hidden;
      const hmac = values.hmac.toString();
      const frmId = use_form_id
        ? '_' + document.getElementById('hidfrmId').value
        : '';
      const keyboardType = transkey[id].keyboard;
      const keyIndex = transkey[id].keyIndex;
      const fieldType = transkey[id].fieldType;
      const seedKey = document.getElementById('seedKey' + frmId).value;
      const ExE2E = transkey[id].exE2E;
      const suffix = `${id}_${frmId}`;

      const data = {
        id: id,
        [`transkey_${suffix}`]: hidden,
        [`transkey_HM_${suffix}`]: hmac,
        [`keyboardType_${suffix}`]: keyboardType,
        [`keyIndex_${suffix}`]: keyIndex,
        [`fieldType_${suffix}`]: fieldType,
        [`seedKey_${frmId}`]: seedKey,
        [`initTime_${frmId}`]: initTime,
        [`hidfrmId`]: frmId + tk_origin,
      };

      // async await
      // axios
      //   .post('/b2b/demo/ajaxTest.jsp', qs.stringify(data), {
      //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      try {
        const response = await axios.post(
          '/b2c/demo/ajaxTest.jsp',
          qs.stringify(data),
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
          }
        );

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    initTranskey();

    if (this.$props.kbdOnly) {
      let inputs = document.getElementsByTagName('input');
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs.item(i);

        if (input.getAttribute('kbd-only')) {
          transkey[`${input.id}`].useButton = false;
          transkey[`${input.id}`].useTranskey = true;
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
img {
  width: auto;
}
.form-input {
  display: inline-block;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  .label {
    display: block;
    height: 18px;
    span {
      display: inline-block;
      line-height: 18px;
      font-size: 13px;
      color: $gray-50;
    }
  }
  .input {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid $gray-40;
    transition: border-color 0.1s ease-in;
    input {
      outline: none;
      flex: 1 1 auto;
      width: 100%;
      height: 39px;
      padding: 7px 25px 6px 0;
      box-sizing: border-box;
      border: 0;
      caret-color: $mint-50;
    }
    .input-btn {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      padding-right: 15px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: $mint-50;
      > * {
        margin-left: 6px;
      }
    }
    .delete {
      width: 24px;
      height: 24px;
      vertical-align: -6px;
      text-indent: -9999px;
      background: url(../../assets/images/ic-delete-24-gr.svg) center no-repeat;
    }
    .search {
      width: 24px;
      height: 24px;
      vertical-align: -6px;
      text-indent: -9999px;
      background: url(../../assets/images/ic-search-24-bk-n.svg) center
        no-repeat;
    }
    time {
      margin-left: 10px;
      vertical-align: -5px;
      padding-right: 2px;
      line-height: 24px;
    }
  }
  .error-msg {
    margin-top: 2px;
    color: red;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
  }
  &.focused {
    .input {
      border-color: $mint-50;
    }
  }
  &.error {
    .input {
      border-color: red;
    }
  }
  &.input-search {
    .input {
      border-radius: 10px;
      border: 1px solid $gray-40;
      overflow: hidden;
      background-color: $white;
      input {
        height: 46px;
        padding-left: 20px;
        //padding-right: 50px;
        font-size: 14px;
        background: inherit;
        &::placeholder {
        }
      }
    }
    &.focused {
      .input {
        border-color: $mint-30;
      }
    }
  }
}
</style>
