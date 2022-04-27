<template>
  <container>
    <div class="container-bg">
      <h1 class="title-2">
        인터넷 자동차 보험
        <p class="mint-60">비교 가입</p>
      </h1>
    </div>

    <ul class="flex-list">
      <li v-for="item in mallList" :key="item.id">
        <img :src="item.src" alt="" />
        <p>{{ item.title }}</p>
        <span>{{ item.desc }}</span>
      </li>
    </ul>
    <div class="box-list">
      <strong class="item-title">확인하세요!</strong>
      <ul class="bullet-list-sm">
        <li class="bullet-text">보험 만기 30일 전부터 가능.<br /></li>
        <li class="bullet-text">중고차 구입 시 언제나 가입.</li>
        <li class="bullet-text mint-60">
          현재 가입보험사에 재가입하실 경우 주유권이 제공되지 않습니다.
        </li>
      </ul>
    </div>
    <div class="btm-btn-group">
      <div class="flex-btn-group">
        <router-link to="/" class="btn-primary-lg">비교하러 가기</router-link>
      </div>
    </div>
  </container>
</template>

<script>
export default {
  name: 'main',
  data() {
    return {
      mallList: [
        {
          id: 1,
          src: 'http://www.dummyimage.com/320x180',
          title: '주유권 2만원 증정',
          desc: '(이지세이브 통해 가입 시)',
        },
        {
          id: 2,
          src: 'http://www.dummyimage.com/320x180',
          title: '주유권 2만원 증정',
          desc: '(이지세이브 통해 가입 시)',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.container-bg {
  position: relative;
  height: 0;
  padding-top: 65%;
  margin: 0 -20px;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background: url('http://www.dummyimage.com/360x235') no-repeat 0 0/100%;
  }
  .title-2 {
    z-index: 1;
    position: absolute;
    top: 10px;
    left: 20px;
  }
}

.flex-list {
  display: flex;
  justify-content: space-between;
  padding: 25px 20px;
  border: 1px solid $gray-30;
  border-radius: 10px;
  li {
    position: relative;
    flex: 1 0;
    padding-right: 20px;
    &:last-child {
      padding-right: 0;
    }
    & + li {
      padding-left: 20px;
      box-sizing: border-box;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 100%;
        background: $gray-30;
      }
    }

    img {
      width: 32px;
      height: 20px;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: $black;
      font-weight: 700;
    }
    span {
      display: block;
      margin-top: 4px;
      font-size: 12px;
      line-height: 18px;
      color: $gray-60;
    }
  }
}
.box-list {
  margin-top: 15px;
}
</style>
