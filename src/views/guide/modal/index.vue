<template>
  <div>
    <h2 class="h2">Callback</h2>
    <form-input
      v-model="data"
      ref="input"
      type="tel"
      label="example1"
      placeholder="입력하세요"
      :deleteBtn="true"
    />
    <button type="button" class="btn-sub-sm" @click="open1">Modal Open1</button>
    <button type="button" class="btn-sub-sm" @click="open2">Modal Open2</button>
    <button type="button" class="btn-sub-sm" @click="open3">
      Modal Button Open3
    </button>
    <button type="button" class="btn-sub-sm" @click="open4">
      image pinch zoom
    </button>
    <button type="button" class="btn-sub-sm" @click="open5">
      SNS 공유하기
    </button>
    <highlightjs :code="code1" />
    <highlightjs :code="code2" />
    <hr />
    <h2 class="h2">Modal 관련 Directory 구조</h2>
    <p class="dsc">Modal 설명을 위해 관련된 Directory만 추출하였습니다.</p>
    <highlightjs :code="code3" />

    <h2 class="h2">Modal 컴포넌트</h2>
    <p class="dsc">components/common/modal.vue 참고</p>

    <h2 class="h2">Modal 페이지 만들기</h2>
    <highlightjs :code="code4" />

    <h2 class="h2">Modal 불러오기</h2>
    <highlightjs :code="code5" />

    <modalExample
      name="example1"
      type="bottom"
      :testData.sync="data"
      :classes="['class1', 'class2']"
    />
    <modalExample2 name="example2" />
    <modalExample3 name="example3" type="full" />

    <modalSns name="sns" />
    <imageGallery name="imageGallery" type="full" />
  </div>
</template>

<script>
import guideMixin from '@/views/guide/layout/guide-mixin';

export default {
  name: 'modal-guide',
  mixins: [guideMixin],
  components: {
    modalExample: () => import('@/views/guide/modal/example.vue'),
    modalExample2: () => import('@/views/guide/modal/example2.vue'),
    modalExample3: () => import('@/views/guide/modal/example3.vue'),
    modalSns: () => import('@/views/modal/sns.vue'),
    imageGallery: () => import('@/views/guide/modal/image-gallery.vue'),
  },
  data() {
    return {
      data: '',
      code1:
        '<form-input\n' +
        '  v-model="data"\n' +
        '  ref="input"\n' +
        '  type="tel"\n' +
        '  label="example1"\n' +
        '  placeholder="입력하세요"\n' +
        '  :deleteBtn="true"\n' +
        '/>\n\n' +
        '<button type="button" class="btn-sub-sm" @click="open1">Modal Open1</button>\n' +
        '<button type="buutton" class="btn-sub-sm" @click="open2">Modal Open2</button>\n' +
        '<button type="buutton" class="btn-sub-sm" @click="open3">Modal Button Open3</button>\n\n' +
        '<modalExample\n' +
        'name="example1"\n' +
        'type="bottom"\n' +
        ':testData.sync="data"\n' +
        "  :classes=\"['class1', 'class2']\"\n" +
        '/>\n' +
        '<modalExample2 name="example2" />\n' +
        '<modalExample3 name="example3" />',

      code2:
        'async open1() {\n' +
        'const t = await this.$_modalOpen({ name: "example1" });\n' +
        '  console.log(t);\n' +
        '},\n' +
        'open2() {\n' +
        'this.$_modalOpen({ name: "example2" });\n' +
        '},\n' +
        'open3() {\n' +
        'this.$_modalOpen({ name: "example3" });\n' +
        '},',
      code3:
        '├── dist            \n' +
        '├── node_modules    \n' +
        '├── public\n' +
        '├── src                \n' +
        '│   ├── api            \n' +
        '│   ├── assets                  \n' +
        '│   └── components               → Components 작업위치\n' +
        '│   │   ├── global                → 전역으로 사용하는 Components\n' +
        '│   │   │   ├── modal.vue       → Modal Components\n' +
        '│   └── plugins                    \n' +
        '│   │   ├── modal.js              → Modal 관련 전역 함수 (store에 들어감)\n' +
        '│   └── store                    \n' +
        '│   │   ├── modules              → store\n' +
        '│   └── view                      \n' +
        '│   │   ├── guide                \n' +
        '│   │   │   ├── modal.vue       → Modal 가이드 및 예제 페이지 폴더\n' +
        '│   └── App.vue\t\t\t       → <portal-target/> 모달 불러들일 위치 컴포넌트.\n' +
        '│   └── main.js                    → Modal 플러그인, Portal-vue 라이브러리 호출\n' +
        '├── babel.config.js  \n' +
        '├── package.json\n' +
        '├── README.md\n' +
        '├── vue.config.js',
      code4:
        '<template>\n' +
        '  <modal :name="name" :type="type">\n' +
        '    <template #header>\n' +
        '      <h2 class="modal-title">\n' +
        '        모달 타이틀 글자 수 제한 없이 노출\n' +
        '      </h2>\n' +
        '    </template>\n' +
        '    <template #content>\n' +
        '      모달 컨텐츠 영역\n' +
        '    </template>\n' +
        '    <template #footer>\n' +
        '      <div class="flex-btn-group">\n' +
        '        <button\n' +
        '          type="button"\n' +
        '          class="btn-line-gray-md"\n' +
        '          @click="$_modalClose({ name: name })"\n' +
        '        >\n' +
        '          취소\n' +
        '        </button>\n' +
        '        <button type="button" class="btn-primary-md">\n' +
        '          확인\n' +
        '        </button>\n' +
        '      </div>\n' +
        '    </template>\n' +
        '  </modal>\n' +
        '</template>',
      code5:
        '<button \n' +
        '      type="button" \n' +
        '      @click="modalOpen({ name: \'example3\' })"\n' +
        '> \n' +
        '      Modal Open \n' +
        '</button>\n' +
        '<modal name="example3" type="full">',
    };
  },
  methods: {
    async open1() {
      const t = await this.$_modalOpen({ name: 'example1' });
      console.log(t);
    },
    open2() {
      this.$_modalOpen({ name: 'example2' });
    },
    open3() {
      this.$_modalOpen({ name: 'example3' });
    },
    open4() {
      this.$_modalOpen({ name: 'imageGallery' });
    },
    open5() {
      this.$_modalOpen({ name: 'sns' });
    },
  },
};
</script>
<style scoped lang="scss">
hr {
  margin: 50px 0;
}
.code {
  min-height: 200px;
}
.data-list {
  margin-top: 10px;
  margin-left: 20px;
  list-style: circle;
  li {
    line-height: 1.5;
    font-size: 14px;
  }
}
.bank-modal-list {
  li {
    display: inline-block;
    margin-right: 3px;
    margin-bottom: 3px;
  }
}
</style>
