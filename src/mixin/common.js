import bus from '@/utils/bus';
import validate from 'validate.js';

const commonMixin = {
  methods: {
    toast(msg, time) {
      bus.$emit('toast', { msg: msg, time: time });
    },
    loading(state) {
      bus.$emit('loading', state);
    },
    offset(element) {
      return {
        y: window.pageYOffset + element.getBoundingClientRect().top,
        x: window.pageXOffset + element.getBoundingClientRect().left,
        h: element.getBoundingClientRect().height,
        w: element.getBoundingClientRect().width,
      };
    },
    noImage(e) {
      e.target.className += `${e.target.className ? ' ' : ''}no-images`;
      e.target.src = require('@/assets/images/img-logo-fingle-gr-100.svg');
    },
    dayCount(regDay, num) {
      //regDay 날짜가 오늘 날짜에서 num 만큼 작으면 true
      let year = this.$moment(regDay).format('YYYY');
      let month = this.$moment(regDay).format('MM');
      let dd = this.$moment(regDay).format('DD');
      const setDate = new Date(year, month, dd);
      let nowYear = this.$moment(new Date()).format('YYYY');
      let nowMonth = this.$moment(new Date()).format('MM');
      let nowDd = this.$moment(new Date()).format('DD');
      const now = new Date(nowYear, nowMonth, nowDd);
      const distance = now.getTime() - setDate.getTime();
      const day = Math.floor(distance / (1000 * 60 * 60 * 24));
      let state = false;
      if (day <= num) {
        state = true;
      }
      return state;
    },
    getValidateOpt(obj) {
      let tmp = { ...this.formValidation };
      for (let prop in this.formValidation) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          delete tmp[prop];
        }
      }
      return tmp;
    },
    validateForInput(key) {
      const value = this.form[key].value.trim();
      if (value === '') return;
      const obj = { [key]: value };
      const errors = validate(obj, this.getValidateOpt(obj) || {});
      this.form[key].error = errors?.[key][0] || '';
    },
    validateForForm() {
      let tmp = {};
      for (let prop in this.form) {
        console.log(typeof this.form[prop]?.value);
        if (typeof this.form[prop]?.value === 'string') {
          tmp[prop] = this.form[prop].value.trim();
        }
      }
      const errors = validate(tmp, this.getValidateOpt(tmp) || {});
      if (errors) {
        Object.keys(errors).forEach((key) => {
          this.form[key].error = errors[key][0];
        });
      }
      return errors;
    },
    moment(time, type = 'dftDate') {
      let result = '';
      switch (type) {
        case 'hasTime':
          result = 'YYYY.MM.DD hh:mm';
          break;
        case 'hasSec':
          result = 'YYYY.MM.DD hh:mm:ss';
          break;
        default:
          result = 'YYYY.MM.DD';
      }
      const regex = RegExp(
        /^\d{4}\.(0[1-9]|1[012])\.(0[1-9]|[12][0-9]|3[01])$/
      );
      if (regex.test(time)) {
        return time;
      } else {
        return time ? this.$moment(time).format(result) : '-';
      }
    },
    priceUnit(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
export { commonMixin };
