<template>
  <div class="file-upload-wrap">
    <div v-if="fileData.length" class="preview-container">
      <div
        v-for="(file, index) in fileData"
        :key="index"
        class="file-preview-wrapper"
      >
        <button
          type="button"
          @click="openConfirmModal"
          class="delete-btn"
          :name="file.number"
        >
          삭제
        </button>
        <img :src="file.url" @error="noImage" />
      </div>
    </div>
    <div class="input-wrap" v-if="chkShow">
      <button type="button" @click="checkCamera" />
      <label class="file-btn">
        <input
          type="file"
          ref="uploadFile"
          @change="imageUpload"
          :accept="accept"
        />
      </label>
    </div>
  </div>
</template>

<script>
import bridge from '@/utils/WebViewBridgeDefault';
import bridgeBus from '@/utils/bridgeBus';

export default {
  name: 'from-file-list',
  model: {
    prop: 'files',
    event: 'formChange',
  },
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    files: Array,
    maxImgLength: Number,
  },
  data() {
    return {
      fileData: [],
      uploadImageIndex: 0,
      maxImgNum: 0,
      maxFileSize: 10485760, //10메가
    };
  },
  computed: {
    chkShow() {
      return this.fileData.length < this.maxImgNum;
    },
  },
  created() {
    this.fileData = this.files;
    this.maxImgNum = this.maxImgLength;
    bridgeBus.$on('checkCameraPermissionCB', (data) => {
      if (data === 'true') {
        this.$refs.uploadFile.click();
      }
    });
  },
  methods: {
    checkCamera() {
      bridge.callNative.checkCameraPermission();
    },
    imageUpload(e) {
      const inputFiles = e.target.files[0];

      // 이미지 사이즈 체크
      if (inputFiles.size > this.maxFileSize) {
        this.$_alert(
          ' 이미지 파일은 최대 10MB 까지 등록이 가능합니다.\n' +
            '파일크기를 다시 확인해주세요.'
        );
        return;
      }

      // 중복된 이미지 체크
      const someChk = this.fileData.some((a) => {
        return (
          a.file.name === inputFiles.name &&
          a.file.size === inputFiles.size &&
          a.file.lastModified === inputFiles.lastModified
        );
      });
      if (someChk) {
        // this.$_alert('');
        return;
      }
      this.uploadImageIndex = Math.floor(Math.random() * new Date().valueOf());
      this.fileData = [
        ...this.fileData,
        {
          file: inputFiles,
          url: URL.createObjectURL(inputFiles),
          number: this.uploadImageIndex,
        },
      ];
      this.$emit(
        'formChange',
        this.fileData.map((el) => el.file)
      );
    },
    async openConfirmModal(e) {
      const isDelImage = await this.$_confirm('사진을 삭제하시겠습니까?');
      if (isDelImage) {
        this.deleteFile(e);
      }
    },
    deleteFile(e) {
      const name = e.target.getAttribute('name');
      this.fileData = this.fileData.filter(
        (data) => data.number !== Number(name)
      );
      this.$emit('formChange', this.fileData);
      if (this.chkShow) {
        this.$nextTick(() => {
          this.$refs.uploadFile.value = '';
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.file-upload-wrap {
  display: flex;

  .file-btn {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 70px;
    cursor: pointer;
    border-radius: 10px;
    background-color: $gray-20;

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      display: inline-block;
      width: 18px;
      height: 2px;
      background-color: $gray-60;
      transform: translate(-50%, -50%);
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      display: inline-block;
      width: 18px;
      height: 2px;
      background-color: $gray-60;
      transform: translate(-50%, -50%) rotateZ(-90deg);
    }
  }

  .input-wrap {
    position: relative;
    button {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 50;
      opacity: 0;
    }
    input {
      position: absolute;
      left: -9999px;
    }
  }
}
</style>
